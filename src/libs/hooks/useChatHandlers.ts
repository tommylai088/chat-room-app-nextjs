import { useMessagesContext } from '@/contexts/messages/MessagesContext';
import { useMessages } from '@/libs/hooks/useMessages';
import { useUserChats } from '@/libs/hooks/useUserChats';
import { IMarkMessageAsReadRes, IMessage, ITypingRes, IUnreadCounts, IUserChat } from '@/libs/interfaces';
import { useCallback } from 'react';
import { socket, SocketEvent } from '../utils/socket.util';
import { useJoinRoom } from './useJoinRoom';

interface IUseChatHandlersParams {
    selectedUserId?: string;
    currentUserId?: string;
    unreadCounts: IUnreadCounts;
}

const useChatHandlers = ({
    selectedUserId,
    currentUserId,
    unreadCounts
}: IUseChatHandlersParams) => {
    const { dispatch } = useMessagesContext();
    const { messages, appendMessage } = useMessages(selectedUserId);
    const { userChats, mutate: userChatsMutate } = useUserChats();
    const { joinRoom } = useJoinRoom();

    // Updates the message list for the selected user
    const handleUpdateMessages = useCallback(async (receiverId: string, senderId: string, message: IMessage) => {
        // Selected user sent message to me or I sent message to selected user
        if (receiverId == selectedUserId || senderId == selectedUserId) {
            appendMessage(message)
        }
    }, [selectedUserId, messages, appendMessage])

    // Marks a message as read
    const handleMarkAsRead = useCallback((senderId: string, receiverId: string) => {
        socket?.emit(SocketEvent.MarkMessageAsRead, {
            senderId,
            receiverId
        });
    }, []);

    // Updates the user chats list with the latest message and unread counts
    const handleUpdateUserChats = useCallback(
        async (receiverId: string, senderId: string, message: IMessage, unreadCount: number, shouldMarkAsRead: boolean) => {
            const chatExists = userChats.some(item => item.latestMessage.roomId === message.roomId);

            // If chat does not exist, add a new entry to the chat list
            const newList = chatExists
                ? userChats.map((item: IUserChat) =>
                    item.latestMessage.roomId === message.roomId
                        ? { latestMessage: { ...message }, unreadCount }
                        : item
                )
                : [...userChats, { latestMessage: { ...message }, unreadCount: 1 }];

            await userChatsMutate(newList, false);

            // Mark the message as read if required
            if (shouldMarkAsRead) handleMarkAsRead(senderId, receiverId);
        },
        [userChats, userChatsMutate, handleMarkAsRead]
    );

    // Determines the unread count and whether a message should be marked as read
    const calculateUnreadCount = useCallback(
        (receiverId: string, senderId: string, roomId: string) => {
            let unreadCount = 0;
            let shouldMarkAsRead = false;

            if (receiverId === currentUserId) {
                if (selectedUserId !== senderId) {
                    unreadCount = (unreadCounts[roomId] || 0) + 1;
                } else {
                    shouldMarkAsRead = true;
                }
            }
            return { unreadCount, shouldMarkAsRead };
        },
        [currentUserId, selectedUserId, unreadCounts]
    );

    const handleIncomingMessage = useCallback(async (message: IMessage) => {
        // console.log('Received message:', message);
        const receiverId = message?.receiver?.id;
        const senderId = message?.sender?.id;

        // Update existing messages
        await handleUpdateMessages(receiverId, senderId, message)
        // Update unread counts
        const { unreadCount, shouldMarkAsRead } = calculateUnreadCount(receiverId, senderId, message.roomId);
        // // Update existing user chats
        await handleUpdateUserChats(receiverId, senderId, message, unreadCount, shouldMarkAsRead)
        // handleUpdateUnreadCount(receiverId, senderId, message);
    }, [handleUpdateMessages, handleUpdateUserChats, calculateUnreadCount]);

    const handleRoomNotification = useCallback(async (message: IMessage) => {
        // console.log(`New notification from ${message.receiver} in room ${message.roomId}: ${message.message}`);
        joinRoom(message.roomId);
        await handleIncomingMessage(message);
    }, [handleIncomingMessage, joinRoom])

    const handleUserTyping = useCallback(({ senderId, isTyping }: ITypingRes) => {
        dispatch({
            type: 'UPDATE_TYPING_USERS', payload: {
                senderId,
                isTyping
            }
        });
    }, [dispatch]);

    const handleUnreadCountUpdated = useCallback(async ({ roomId, unreadCount }: IMarkMessageAsReadRes) => {
        // console.log('Unread count has updated:', {
        //     roomId,
        //     unreadCount
        // });
        await userChatsMutate(userChats.map((item: IUserChat) =>
            item?.latestMessage?.roomId == roomId
                ? {
                    unreadCount,
                    latestMessage: { ...item.latestMessage }
                }
                : item
        ), false);
    }, [userChats, userChatsMutate])

    return {
        handleIncomingMessage,
        handleRoomNotification,
        handleUnreadCountUpdated,
        handleUserTyping
    };
};

export default useChatHandlers;
