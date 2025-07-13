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
        const threshold = 100; // pixels from bottom
        return el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    };

    // Scroll to bottom on first load
    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        if (firstLoadRef.current && data.length > 0) {
            el.scrollTop = el.scrollHeight;
            firstLoadRef.current = false;
            prevDataLengthRef.current = data.length;
        }
    }, [data.length]);

    // Scroll to bottom when new messages are added (not when loading older messages)
    useEffect(() => {
        const el = containerRef.current;
        if (!el || firstLoadRef.current) return;
        
        // Only scroll if we have more messages than before (new messages added)
        const hasNewMessages = data.length > prevDataLengthRef.current;
        
        if (shouldScrollToBottom && hasNewMessages) {
            // Check if the last message is from the current user
            const lastMessage = data[data.length - 1];
            const isOwnMessage = lastMessage?.sender?.id === currentUserId;
            
            // Scroll to bottom if it's our own message or if we're already near bottom
            if (isOwnMessage || isNearBottom()) {
                el.scrollTop = el.scrollHeight;
            }
        }
        
        // Update the previous data length
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