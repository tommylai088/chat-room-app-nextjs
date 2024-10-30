import { useAuth } from "@/libs/hooks/useAuth";
import { IMessage } from "@/libs/interfaces";
import { Box, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

interface IMessageProps {
    item: IMessage;
}

function Message({ item }: IMessageProps) {
    const { session } = useAuth();
    const isSender = item?.sender?.id == session?.user?.userId;
    const creationTime = dayjs(item?.createdAt).format('HH:mm');

    return (
        <Box m="2">
            <Flex
                justifyContent={isSender ? 'flex-end' : 'flex-start'}
            >
                <Flex
                    flexDirection="column"
                    gap="2px"
                >
                    <Box
                        bg={isSender ? 'orange.500' : 'gray.800'}
                        color="white"
                        py="2.5"
                        px="4"
                        borderRadius="10px"
                    >
                        <Text
                            maxW="400px"
                            w="100%"
                        >
                            {item.message}
                        </Text>
                    </Box>
                    <Text
                        textAlign={isSender ? 'right' : 'left'}
                        fontSize="10px"
                    >
                        {creationTime}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}
export default Message;