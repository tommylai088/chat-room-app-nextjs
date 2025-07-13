'use client';
import { useMessagesContext } from "@/contexts/messages/MessagesContext";
import { useAuth } from "@/libs/hooks/useAuth";
import { IUserChat } from "@/libs/interfaces";
import { Box, List } from "@chakra-ui/react";
import { memo } from "react";
import Chat from "./Chat";

interface IChatListProps {
    userChats: IUserChat[];
}

const ChatList = memo(function ChatList({ userChats }: IChatListProps) {
    const { session } = useAuth();
    const { state } = useMessagesContext();
    const { typingUsers, unreadCounts } = state;
    
    if (userChats?.length == 0) {
        return <Box>No Chats found</Box>
    }
    
    return (
        <List
            width="100%"
            overflowY="auto"
            spacing={3}
            p="3"
        >
            {userChats?.map((userChat: IUserChat) => {
                // Use a stable key based on roomId instead of message id
                const roomId = userChat?.latestMessage?.roomId;
                const user = userChat?.latestMessage?.receiver?.id !== session?.user?.userId 
                    ? userChat?.latestMessage?.receiver 
                    : userChat?.latestMessage?.sender;
                
                return (
                    <Chat
                        key={roomId}
                        userChat={userChat}
                        user={user}
                        typingUsers={typingUsers}
                        unreadCounts={unreadCounts}
                    />
                );
            })}
        </List>
    );
});

export default ChatList;
