'use client';
import { useMessagesContext } from "@/contexts/messages/MessagesContext";
import { useAuth } from "@/libs/hooks/useAuth";
import { IUserChat } from "@/libs/interfaces";
import { Box, List } from "@chakra-ui/react";
import Chat from "./Chat";

interface IChatListProps {
    userChats: IUserChat[];
}

export default function ChatList({ userChats }: IChatListProps) {
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
            {userChats?.map((userChat: IUserChat) =>
                <Chat
                    key={userChat?.latestMessage?.id}
                    userChat={userChat}
                    user={userChat?.latestMessage?.receiver?.id !== session?.user?.userId ? userChat?.latestMessage?.receiver : userChat?.latestMessage?.sender}
                    typingUsers={typingUsers}
                    unreadCounts={unreadCounts}
                />
            )}
        </List>
    );
}
