'use client';
import { useAuth } from "@/libs/hooks/useAuth";
import { useMarkAsRead } from "@/libs/hooks/useMarkAsRead";
import { IMessage, IUser } from "@/libs/interfaces";
import { Box, Divider } from "@chakra-ui/react";
import { useCallback, useEffect, useRef } from "react";
import MessageHeader from "./MessageHeader";
import MessageHistory from "./MessageHistory/MessageHistory";
import MessageInput from "./MessageInput";

interface IUserChatRoomProps {
    selectedUser?: IUser;
    messages: IMessage[];
}

function UserChatRoom({ selectedUser, messages }: IUserChatRoomProps) {
    const { session } = useAuth();
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { handleMarkAsRead } = useMarkAsRead({
        senderId: selectedUser?.id,
        receiverId: session?.user?.userId
    });


    useEffect(() => {
        if (!selectedUser?.id || !session?.user?.userId) return;
        handleMarkAsRead();
    }, [selectedUser?.id, session?.user?.userId, handleMarkAsRead]);

    // Function to scroll to the bottom of the chat
    const scrollToBottom = () => {
        if (chatContainerRef?.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages])


    // Handle scroll event to check if user is at the top of the chat
    const handleScroll = useCallback(() => {
        if (!chatContainerRef.current) return;
        const { scrollTop } = chatContainerRef.current;
        if (scrollTop === 0) {
            // fetch
            console.log('fetch')
        }
    }, []);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (!chatContainer) return;

        // Attach scroll event listener
        chatContainer.addEventListener('scroll', handleScroll);

        // Clean up event listener on unmount
        return () => {
            chatContainer.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <Box
            overflow="hidden"
            maxW="880px"
            minW="500px"
            w="100%"
        >
            {selectedUser && (
                <>
                    <MessageHeader selectedUser={selectedUser} />
                    <Divider />
                    <MessageHistory
                        data={messages}
                        chatContainerRef={chatContainerRef}
                        messagesEndRef={messagesEndRef}
                    />
                    <MessageInput selectedUser={selectedUser} />
                </>
            )}
        </Box>
    );
}

export default UserChatRoom;