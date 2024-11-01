import { IMessage } from "@/libs/interfaces";
import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { RefObject } from "react";
import Message from "./Message";

interface IMessageHistoryProps {
    data: IMessage[];
    chatContainerRef: RefObject<HTMLDivElement>;
    messagesEndRef: RefObject<HTMLDivElement>;
}

function MessageHistory({ data, chatContainerRef, messagesEndRef }: IMessageHistoryProps) {
    const convert = (createdAt: string) => {
        return dayjs(createdAt).format('DD MMMM YYYY')
    }

    return (
        <Box
            h={{
                base: 'calc(100vh - 60px - 64px)',
                md: '580px'
            }}
            overflow="auto"
            ref={chatContainerRef}
        >
            {data?.map((item: IMessage, index: number) => {
                const currentDate = convert(item?.createdAt);
                const previousDate = index > 0 ? convert(data[index - 1].createdAt) : null;

                return (
                    <Box key={item?.id}>
                        {/* Display the date separator if it's the first message of the day */}
                        {(index === 0 || currentDate !== previousDate) && (
                            <Box
                                p="2"
                                w="100%"
                                textAlign="center"
                                mb={2}
                                color="gray.500"
                                fontSize="sm"
                            >
                                {currentDate}
                            </Box>
                        )}
                        <Message item={item} />
                    </Box>
                );
            })}
            <Box ref={messagesEndRef}></Box>
        </Box>
    )
}

export default MessageHistory;