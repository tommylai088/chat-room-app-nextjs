import { IMessage } from "@/libs/interfaces";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useLayoutEffect, useRef } from "react";
import Message from "./Message";

interface IMessageHistoryProps {
    data: IMessage[];
    loadMore: () => void;
    isLoadingMore: boolean;
    hasMore: boolean;

}

function MessageHistory({ data, isLoadingMore, loadMore, hasMore }: IMessageHistoryProps) {
    const convert = (createdAt: string) => {
        return dayjs(createdAt).format('DD MMMM YYYY')
    }
    const containerRef = useRef<HTMLDivElement>(null);
    const prevHeightRef = useRef<number | null>(null);
    const firstLoadRef = useRef(true);

 useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        if (firstLoadRef.current && data.length > 0) {
            el.scrollTop = el.scrollHeight;
            firstLoadRef.current = false;
        }
    }, [data.length]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        if (el.scrollTop === 0 && !isLoadingMore && hasMore) {
            prevHeightRef.current = el.scrollHeight
            loadMore();
        }
    }

    useLayoutEffect(() => {
        const el = containerRef.current
        const prev = prevHeightRef.current
        if (el && prev !== null && !isLoadingMore) {
            const diff = el.scrollHeight - prev
            el.scrollTop = diff
            prevHeightRef.current = null
        }
    }, [data.length, isLoadingMore])

    return (
        <Box
            h={{
                base: 'calc(100dvh - 60px - 64px)',
                md: '580px'
            }}
            overflow="auto"
            ref={containerRef}
            onScroll={handleScroll}
        >
            {isLoadingMore &&
                <Flex justifyContent="center" p="1">
                    <Spinner color="orange.500" size="md" />
                </Flex>
            }
            {!hasMore && <Text
                margin="0 auto"
                textAlign="center"
                fontSize="14px"
                color="orange.500"
            >
                No Older Messages
            </Text>
            }
            {data?.map((item: IMessage, index: number) => {
                const currentDate = convert(item?.createdAt);
                const previousDate = index > 0 ? convert(data[index - 1].createdAt) : null;

                return (
                    <Box key={item?.id} data-id={item?.id}>
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
            <Box></Box>
        </Box>
    )
}

export default MessageHistory;