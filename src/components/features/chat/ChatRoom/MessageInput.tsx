import { useAuth } from "@/libs/hooks/useAuth";
import { useSendMessage } from "@/libs/hooks/useSendMessage";
import { useTyping } from "@/libs/hooks/useTyping";
import { IUser } from "@/libs/interfaces";
import { Box, IconButton, Input } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";

interface IMessageInputProps {
    selectedUser: IUser;
    onMessageSent?: () => void;
}

function MessageInput({ selectedUser, onMessageSent }: IMessageInputProps) {
    const [messageText, setMessageText] = useState<string>('');
    const { session } = useAuth();
    const { startTyping, stopTyping } = useTyping({
        senderId: session?.user?.userId,
        receiverId: selectedUser?.id
    });
    const { sendMessage } = useSendMessage({
        senderId: session?.user?.userId,
        receiverId: selectedUser?.id
    });

    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageText(e.target.value);

        startTyping();

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => stopTyping(), 2000);
    };

    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        };
    }, []);

    const handleSendMessage = useCallback(() => {
        if (messageText.trim()) {
            sendMessage(messageText);
            setMessageText('');
            stopTyping();
            onMessageSent?.(); // Call the callback when message is sent
        }
    }, [messageText, sendMessage, stopTyping, onMessageSent]);

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box display="flex" gap="10px" alignItems="center" width="100%" justifyContent="center" p="3">
            <Input
                borderRadius="15px"
                value={messageText}
                onKeyDown={onKeyDown}
                onChange={handleMessageChange}
                placeholder="Type your message..."
            />
            <IconButton
                isDisabled={!messageText}
                aria-label="Send Message"
                onClick={handleSendMessage}
                icon={<FiSend />}
                isRound
                variant="solid"
            />
        </Box>
    );
}

export default MessageInput;