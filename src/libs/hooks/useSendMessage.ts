import { socket, SocketEvent } from '@/libs/utils/socket.util';
import { useCallback } from 'react';

interface IUseSendMessageParams {
    senderId?: string;
    receiverId?: string;
}

export const useSendMessage = ({ senderId, receiverId }: IUseSendMessageParams) => {

    const sendMessage = useCallback((message: string) => {
        if (!senderId || !senderId) return;
        socket?.emit(SocketEvent.SendMessage, {
            senderId,
            receiverId,
            message,
        });
    }, [senderId, receiverId]);

    return { sendMessage };
};