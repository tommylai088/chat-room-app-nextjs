'use client';
import ChatSidebar from "@/components/features/chat/ChatSidebar/ChatSidebar";
import { useMessagesContext } from "@/contexts/messages/MessagesContext";
import { useAuth } from "@/libs/hooks/useAuth";
import useChatHandlers from "@/libs/hooks/useChatHandlers";
import { useListenSocketEvents } from "@/libs/hooks/useListenSocketEvents";
import { useMessages } from "@/libs/hooks/useMessages";
import { useSocket } from "@/libs/hooks/useSocket";
import { useUserChats } from "@/libs/hooks/useUserChats";
import { Box, Divider, Flex } from "@chakra-ui/react";
import ChatPanel from "./ChatPanel/ChatPanel";
import UserChatRoom from "./ChatRoom/UserChatRoom";

function ChatContainer() {
    const { session } = useAuth();
    const { state } = useMessagesContext();
    const { unreadCounts } = state;
    const currentUserId = session?.user?.userId;
    const selectedUser = state?.selectedUser;
    const selectedUserId = selectedUser?.id
    useSocket(currentUserId);
    const { messages } = useMessages(selectedUserId)
    const { userChats, loading: isLoadingUserChats } = useUserChats();
    const { handleIncomingMessage, handleUnreadCountUpdated, handleRoomNotification, handleUserTyping } = useChatHandlers(
        {
            selectedUserId,
            currentUserId,
            unreadCounts
        });

    useListenSocketEvents(
        handleIncomingMessage,
        handleRoomNotification,
        handleUserTyping,
        handleUnreadCountUpdated
    );

    return (
        <Box
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            background="white"
            w="100%"
            h={{
                base: '100dvh',
                md: '700px'
            }}
            pos="relative"
        >
            <Flex
                h="100%"
            >
                <ChatSidebar />
                <ChatPanel
                    userChats={userChats}
                    isLoadingUserChats={isLoadingUserChats}
                />
                <Divider orientation='vertical' />
                
                <UserChatRoom
                    messages={messages}
                    key={selectedUser?.id}
                    selectedUser={selectedUser}
                />
            </Flex>
        </Box >
    );
}

export default ChatContainer;