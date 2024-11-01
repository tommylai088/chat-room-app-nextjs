'use client';
import { useMessagesContext } from "@/contexts/messages/MessagesContext";
import { IUser } from "@/libs/interfaces";
import { Avatar, Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { useCallback } from "react";

interface IUserItemProps {
    user: IUser;
}
function UserItem({ user }: IUserItemProps) {
    const { dispatch } = useMessagesContext();

    const handleSelectUser = useCallback(() => {
        dispatch({ type: 'SELECT_USER', payload: user })
    }, [dispatch, user])

    return (
        <ListItem
            p="2"
            borderRadius="10px"
            cursor="pointer"
            onClick={() => handleSelectUser()}
        >
            <Flex gap="10" justifyContent="center">
                <Avatar
                    name={user?.username}
                    src={user?.avatar?.url}
                />
                <Flex
                    gap="5px"
                    flexDirection="column"
                    w={{
                        base: '100%',
                        md: '250px'
                    }}
                >
                    <Flex justifyContent="space-between">
                        <Text
                            fontSize="14px"
                            fontWeight="600"
                            color="gray.800"
                        >
                            {user?.username}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </ListItem >
    )
}

interface IUserListProps {
    userList: IUser[];
}

export default function UserList({ userList }: IUserListProps) {
    if (userList?.length == 0) {
        return <Box>No user found</Box>
    }
    return (
        <List
            width="100%"
            overflowY="auto"
            spacing={3}
            p="3"
        >
            {userList?.map((user: IUser) =>
                <UserItem
                    key={user?.id}
                    user={user}
                />
            )}
        </List>
    );
}
