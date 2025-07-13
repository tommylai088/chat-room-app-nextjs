'use client';
import { useUsers } from "@/libs/hooks/useUsers";
import { IUserChat } from "@/libs/interfaces";
import { Box, Divider } from "@chakra-ui/react";
import { memo, useState } from "react";
import ChatList from "./ChatList/ChatList";
import UserList from "./UserList";
import UserSearchInput from "./UserSearchInput";

interface IChatPanelProps {
    userChats: IUserChat[];
    isLoadingUserChats: boolean;
}

const ChatPanel = memo(function ChatPanel({ userChats, isLoadingUserChats }: IChatPanelProps) {
    const [searchValue, setSearchValue] = useState<string>('');
    const { users, loading: isLoadingUsers } = useUsers(searchValue);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            w={{
                base: 'calc(100% - 60px)',
                md: '350px'
            }}
        >
            <UserSearchInput
                callback={(searchValue: string) => setSearchValue(searchValue)}
                searchValue={searchValue}
                resetValue={() => setSearchValue('')}
            />
            <Divider />
            {searchValue
                ? !isLoadingUsers &&
                <UserList
                    userList={users}
                />
                : !isLoadingUserChats &&
                <ChatList
                    userChats={userChats}
                />
            }
        </Box>
    );
});

export default ChatPanel;