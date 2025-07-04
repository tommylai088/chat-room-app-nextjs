'use client';
import { useAuth } from "@/libs/hooks/useAuth";
import { useMarkAsRead } from "@/libs/hooks/useMarkAsRead";
import { useMessages } from "@/libs/hooks/useMessages";
import { IUser } from "@/libs/interfaces";
import { Box, Divider } from "@chakra-ui/react";
import { useEffect } from "react";
import MessageHeader from "./MessageHeader";
import MessageHistory from "./MessageHistory/MessageHistory";
import MessageInput from "./MessageInput";

interface IUserChatRoomProps {
    selectedUser?: IUser;
}

function UserChatRoom({ selectedUser }: IUserChatRoomProps) {
    const { session } = useAuth();

    const { handleMarkAsRead } = useMarkAsRead({
        senderId: selectedUser?.id,
        receiverId: session?.user?.userId
    });

    const { messages, loadMore, hasMore, isLoadingMore } = useMessages(selectedUser?.id)

    useEffect(() => {
        if (!selectedUser?.id || !session?.user?.userId) return;
        handleMarkAsRead();
    }, [selectedUser?.id, session?.user?.userId, handleMarkAsRead]);

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
                    />
                    <MessageInput selectedUser={selectedUser} />
                </>
            )}
        </Box>
    );
}

export default UserChatRoom;