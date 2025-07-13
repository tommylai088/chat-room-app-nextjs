import { IMessage } from "@/libs/interfaces";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useLayoutEffect, useRef } from "react";
import Message from "./Message";

interface IMessageHistoryProps {
    data: IMessage[];
    loadMore: () => void;
    isLoadingMore: boolean;
    hasMore: boolean;
    shouldScrollToBottom?: boolean;
    currentUserId?: string;
}

function MessageHistory({ data, isLoadingMore, loadMore, hasMore, shouldScrollToBottom = false, currentUserId }: IMessageHistoryProps) {
    const convert = (createdAt: string) => {
        return dayjs(createdAt).format('DD MMMM YYYY')
    }
    const containerRef = useRef<HTMLDivElement>(null);
    const prevHeightRef = useRef<number | null>(null);
    const firstLoadRef = useRef(true);
    const prevDataLengthRef = useRef(0);

    // Check if user is near bottom of chat
    const isNearBottom = () => {
        const el = containerRef.current;
        if (!el) return false;
        const threshold = 150;
        return el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    };

    // Simple scroll to bottom function
    const scrollToBottom = () => {
        const el = containerRef.current;
        if (!el) return;
        
        el.scrollTop = el.scrollHeight;
    };

    // Scroll to bottom on first load
    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        if (firstLoadRef.current && data.length > 0) {
            scrollToBottom();
            firstLoadRef.current = false;
            prevDataLengthRef.current = data.length;
        }
    }, [data.length]);

    // Scroll to bottom when new messages are added
    useEffect(() => {
        const el = containerRef.current;
        if (!el || firstLoadRef.current) return;
        
        const hasNewMessages = data.length > prevDataLengthRef.current;
        
        if (shouldScrollToBottom && hasNewMessages) {
            const lastMessage = data[data.length - 1];
            const isOwnMessage = lastMessage?.sender?.id === currentUserId;
            
            // Always scroll for own messages, or if near bottom for others
            if (isOwnMessage || isNearBottom()) {
                scrollToBottom();
            }
        }
        
        prevDataLengthRef.current = data.length;
    }, [data.length, shouldScrollToBottom, currentUserId, data]);

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
            css={{
                scrollBehavior: 'smooth',
                '-webkit-overflow-scrolling': 'touch'
            }}
        >
            {!firstLoadRef.current && isLoadingMore &&
                <Flex justifyContent="center" p="1">
                    <Spinner color="orange.500" size="md" />
                </Flex>
            }
            {!firstLoadRef.current && !hasMore && <Text
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