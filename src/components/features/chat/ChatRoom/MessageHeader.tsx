'use client';
import { useMessagesContext } from "@/contexts/messages/MessagesContext";
import { IUser } from "@/libs/interfaces";
import { Avatar, Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";

interface IMessageHeaderProps {
    selectedUser: IUser;
}

function MessageHeader({ selectedUser }: IMessageHeaderProps) {
    const { state, dispatch } = useMessagesContext();
    const isUserTyping = (userId: string) => state.typingUsers[userId];

    const handleBackAction = () => {
        dispatch({ type: 'SELECT_USER', payload: undefined });
    }

    return (
        <Box
            p="2"
            display="flex"
            gap="10px"
            alignItems="center"
            height="60px"
        >
            <IconButton
                display={{
                    base: 'flex',
                    md: 'none'
                }}
                justifyContent="center"
                alignItems="center"
                aria-label="back button"
                variant="unstyled"
                onClick={() => handleBackAction()}
                icon={<IoIosArrowBack />}
            >
            </IconButton>
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