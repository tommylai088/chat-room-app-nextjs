'use client';
import { useMessagesContext } from "@/contexts/messages/MessagesContext";
import { IUser } from "@/libs/interfaces";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface IMessageHeaderProps {
    selectedUser: IUser;
}

function MessageHeader({ selectedUser }: IMessageHeaderProps) {
    const { state } = useMessagesContext();
    const isUserTyping = (userId: string) => state.typingUsers[userId];
    return (
        <Box
            p="2"
            display="flex"
            gap="10px"
            alignItems="center"
            height="60px"
        >
            <Avatar name={selectedUser?.username} src={selectedUser?.avatar?.url} />
            <Flex flexDirection="column" justifyContent="space-between">
                <Text
                    fontSize="14px"
                    color="gray.800"
                    fontWeight="600"
                >
                    {selectedUser?.username}
                </Text>
                <Text
                    fontSize="14px"
                    color="orange.500"
                    fontStyle="italic"
                >
                    {isUserTyping(selectedUser.id) ? "typing..." : ''}
                </Text>
            </Flex>
        </Box >
    );
}

export default MessageHeader;