import { socket, SocketEvent } from '@/libs/utils/socket.util';
import { useCallback } from 'react';

interface IUseTypingParams {
    senderId?: string;
    receiverId?: string;
}

export const useTyping = ({ senderId, receiverId }: IUseTypingParams) => {

    const startTyping = useCallback(() => {
        if (!senderId || !receiverId) return;
        socket?.emit(SocketEvent.StartTyping, { senderId, receiverId });
    }, [senderId, receiverId]);

    const stopTyping = useCallback(() => {
        if (!senderId || !receiverId) return;
        socket?.emit(SocketEvent.StopTyping, { senderId, receiverId });
    }, [senderId, receiverId]);

    return { startTyping, stopTyping };
};