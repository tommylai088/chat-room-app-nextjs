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
    const { mutate, messages } = useMessages(selectedUserId);
    const { userChats, mutate: userChatsMutate } = useUserChats();
    const { joinRoom } = useJoinRoom();

    // Updates the message list for the selected user
    const handleUpdateMessages = useCallback(async (receiverId: string, senderId: string, message: IMessage) => {
        // Selected user sent message to me or I sent message to selected user
        if (receiverId == selectedUserId || senderId == selectedUserId) {
            await mutate([...(messages || []), message], false);
        }
    }, [selectedUserId, messages, mutate])

    // Updates the user chats list with the latest message
    const handleUpdateUserChats = useCallback(async (message: IMessage) => {
        let newList: IUserChat[];
        if (!userChats.find(item => item.latestMessage.roomId == message.roomId)) {
            newList = [...userChats, {
                latestMessage: { ...message },
                unreadCount: 1
            }];
        } else {
            newList = userChats.map((item: IUserChat) =>
                item?.latestMessage?.roomId == message.roomId
                    ? {
                        ...item,
                        latestMessage: { ...message }
                    }
                    : item
            )
        }
        await userChatsMutate(newList, false);
    }, [userChats, userChatsMutate])

    // Marks a message as read
    const handleMarkAsRead = useCallback((senderId: string, receiverId: string) => {
        socket?.emit(SocketEvent.MarkMessageAsRead, {
            senderId,
            receiverId
        });
    }, []);

    const handleUpdateUnreadCount = useCallback((receiverId: string, senderId: string, message: IMessage) => {
        // When I receive anybody messages
        if (receiverId === currentUserId) {
            // if selcted user sent message to me, initialize the count to 0
            let unreadCount = 0;
            if (selectedUserId != senderId) {
                // Increment the unread count for the receiver
                unreadCount = (unreadCounts[message.roomId] || 0) + 1;
                dispatch({ type: 'SET_MESSAGE_COUNT', payload: { roomId: message.roomId, unreadCount } });
            } else {
                handleMarkAsRead(senderId, receiverId);
                dispatch({ type: 'SET_MESSAGE_COUNT', payload: { roomId: message.roomId, unreadCount: 0 } });
            }
        }
    }, [currentUserId, selectedUserId, handleMarkAsRead, dispatch, unreadCounts])

    const handleIncomingMessage = useCallback(async (message: IMessage) => {
        console.log('Received message:', message);
        const receiverId = message?.receiver?.id;
        const senderId = message?.sender?.id;

        // Update existing messages
        await handleUpdateMessages(receiverId, senderId, message)
        // // Update existing user chats
        await handleUpdateUserChats(message)
        // Update unread counts
        handleUpdateUnreadCount(receiverId, senderId, message);
    }, [handleUpdateUnreadCount]);

    const handleRoomNotification = useCallback(async (message: IMessage) => {
        console.log(`New notification from ${message.receiver} in room ${message.roomId}: ${message.message}`);
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

    const handleUnreadCountUpdated = useCallback(({ roomId, unreadCount }: IMarkMessageAsReadRes) => {
        console.log('Unread count has updated:', {
            roomId,
            unreadCount
        });
        dispatch({ type: 'SET_MESSAGE_COUNT', payload: { roomId, unreadCount } });
    }, [dispatch])

    return {
        handleIncomingMessage,
        handleRoomNotification,
        handleUnreadCountUpdated,
        handleUserTyping
    };
};

export default useChatHandlers;