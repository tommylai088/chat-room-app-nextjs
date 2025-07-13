'use client';
import { useAuth } from "@/libs/hooks/useAuth";
import { useMarkAsRead } from "@/libs/hooks/useMarkAsRead";
import { useMessages } from "@/libs/hooks/useMessages";
import { IUser } from "@/libs/interfaces";
import { Box, Divider } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import MessageHeader from "./MessageHeader";
import MessageHistory from "./MessageHistory/MessageHistory";
import MessageInput from "./MessageInput";

interface IUserChatRoomProps {
    selectedUser?: IUser;
}

function UserChatRoom({ selectedUser }: IUserChatRoomProps) {
    const { session } = useAuth();
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
    const currentUserId = session?.user?.userId;
    const prevMessagesLengthRef = useRef(0);

    const { handleMarkAsRead } = useMarkAsRead({
        senderId: selectedUser?.id,
        receiverId: currentUserId
    });

    const { messages, loadMore, hasMore, isLoadingMore } = useMessages(selectedUser?.id)

    useEffect(() => {
        if (!selectedUser?.id || !currentUserId) return;
        handleMarkAsRead();
    }, [selectedUser?.id, currentUserId, handleMarkAsRead]);

    // Reset scroll trigger when user changes
    useEffect(() => {
        setShouldScrollToBottom(false);
        prevMessagesLengthRef.current = 0;
    }, [selectedUser?.id]);

    // Track when new messages are added
    useEffect(() => {
        if (messages.length > 0) {
            const hasNewMessages = messages.length > prevMessagesLengthRef.current;
            
            if (hasNewMessages) {
                const lastMessage = messages[messages.length - 1];
                const isOwnMessage = lastMessage?.sender?.id === currentUserId;
                
                // Set scroll trigger if it's our own message
                if (isOwnMessage) {
                    setShouldScrollToBottom(true);
                }
            }
            
            prevMessagesLengthRef.current = messages.length;
        }
    }, [messages, currentUserId]);

    // Reset scroll trigger after it's been used
    useEffect(() => {
        if (shouldScrollToBottom) {
            // Reset after a short delay to allow the scroll to happen
            const timer = setTimeout(() => {
                setShouldScrollToBottom(false);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [shouldScrollToBottom]);

    return (
        <Box
            overflow="hidden"
            maxW={{
                base: 'unset',
                md: '869px'
            }}
            minW={{
                base: 'unset',
                md: '358px'
            }}
            w="100%"
            bg="white"
            pos={{
                base: 'absolute',
                md: 'relative'
            }}
        >
            {selectedUser && (
                <>
                    <MessageHeader selectedUser={selectedUser} />
                    <Divider />
                    <MessageHistory
                        hasMore={hasMore}
                        isLoadingMore={isLoadingMore}
                        data={messages}
                        loadMore={loadMore}
                        shouldScrollToBottom={shouldScrollToBottom}
                        currentUserId={currentUserId}
                    />
                    <MessageInput 
                        selectedUser={selectedUser} 
                        onMessageSent={() => setShouldScrollToBottom(true)}
                    />
                </>
            )}
        </Box>
    );
}

export default UserChatRoom;