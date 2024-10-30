import { socket, SocketEvent } from '@/libs/utils/socket.util';
import { useCallback } from 'react';

export const useJoinRoom = () => {

    const joinRoom = useCallback((roomId: string) => {
        if (!roomId) return;
        socket?.emit(SocketEvent.JoinRoom, { roomId });
    }, []);

    return { joinRoom };
};