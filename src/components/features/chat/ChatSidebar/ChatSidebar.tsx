import {
    Box,
    Divider,
    Flex,
    IconButton
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { HiOutlineChat, HiOutlineLogout } from "react-icons/hi";
import { RiSettings2Line } from "react-icons/ri";

function ChatSidebar() {

    return (
        <Box
            bg="white"
            flexDir="column"
            background="orange.500"
        >
            <Flex
                flexDir="column"
                alignItems="center"
                as="nav"
            >
                <IconButton
                    w="60px"
                    height="60px"
                    borderRadius="unset"
                    fontSize="24px"
                    background="orange.500"
                    aria-label='chats'
                    icon={<HiOutlineChat />}
                    borderBottom="solid 1px #E0E0E0"
                    color="white"
                />
                <IconButton
                    w="60px"
                    height="60px"
                    borderRadius="unset"
                    fontSize="24px"
                    background="orange.500"
                    aria-label='settings'
                    icon={<RiSettings2Line />}
                    borderBottom="solid 1px #E0E0E0"
                    color="white"
                />
                <IconButton
                    w="60px"
                    height="60px"
                    borderRadius="unset"
                    fontSize="24px"
                    background="orange.500"
                    aria-label='logout'
                    icon={<HiOutlineLogout />}
                    borderBottom="solid 1px #E0E0E0"
                    color="white"
                    onClick={() => signOut()}
                />
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems="center"
                mb={4}
            >
                <Divider display="none" />
            </Flex>
        </Box>
    )
}

export default ChatSidebar;