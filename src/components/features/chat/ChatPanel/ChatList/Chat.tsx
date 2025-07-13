'use client';
import { useMessagesContext } from "@/contexts/messages/MessagesContext";
import { ITypingUsers, IUnreadCounts, IUser, IUserChat } from "@/libs/interfaces";
import { Avatar, Flex, ListItem, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useCallback } from "react";
import UnreadBadge from "./UnreadBadge";

interface IChatProps {
    user: IUser;
    userChat: IUserChat;
    typingUsers: ITypingUsers;
    unreadCounts: IUnreadCounts;
}
function Chat({ user, userChat, typingUsers, unreadCounts }: IChatProps) {
    const creationTime = userChat?.latestMessage?.createdAt ? dayjs(userChat?.latestMessage?.createdAt).format('HH:mm') : '';
    const { dispatch } = useMessagesContext();

    const handleSelectUser = useCallback(() => {
        dispatch({ type: 'SELECT_USER', payload: user });
    }, [dispatch, user])

    const isUserTyping = (userId: string) => typingUsers[userId];
    const unreadCount = (roomId: string) => unreadCounts[roomId];

    return (
        <ListItem
            // _hover={{
            //     bg: "gray.500",
            //     'p': { color: 'white' }
            // }}
            p="2"
            borderRadius="10px"
            cursor="pointer"
            onClick={() => handleSelectUser()}
        >
            <Flex gap="10" justifyContent="center">
                <Avatar
                    name={user?.username}
                    src={user?.avatar?.url}
                    mr={{
                        base: 'unset',
                        md: 'auto'
                    }}
                />
                <Flex
                    gap="5px"
                    flexDirection="column"
                    w={{
                        base: '100%',
                        md: '250px'
                    }}
                >
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Text
                            fontSize="14px"
                            fontWeight="600"
                            color="gray.800"
                        >
                            {user?.username}
                        </Text>
                        <Text
                            fontSize="14px"
                            color="gray.800"
                        >
                            {creationTime}
                        </Text>
                    </Flex>
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        gap="10"
                    >
                        {isUserTyping(user?.id) ?
                            <Text
                                fontSize="14px"
                                color="orange.500"
                                fontStyle="italic"
                            >
                                typing...
                            </Text>
                            :
                            <Text
                                fontSize="14px"
                                color="gray.800"
                                maxW="120px"
                                w="100%"
                                minW="80px"
                                overflow="hidden"
                                noOfLines={2}
                            >
                                {userChat?.latestMessage?.message}
                            </Text>
                        }
                        <UnreadBadge count={unreadCount(userChat?.latestMessage?.roomId)} />
                    </Flex>
                </Flex>
            </Flex>
        </ListItem >
    )
}
export default Chat;
