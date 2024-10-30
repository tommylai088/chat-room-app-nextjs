import { IMessage } from '@/libs/interfaces/MessageInterfaces';
import { socket, SocketEvent } from '@/libs/utils/socket.util';
import { useEffect } from 'react';
import { IMarkMessageAsReadRes, ITypingRes } from '../interfaces';


export const useListenSocketEvents = (
    onMessage: (message: IMessage) => void,
    onRoomNotification: (message: IMessage) => void,
    onUserTyping: (data: ITypingRes) => void,
    onUnreadCountUpdated: (data: IMarkMessageAsReadRes) => void
) => {

    useEffect(() => {
        if (!socket) return;
        socket.on(SocketEvent.Message, onMessage);
        socket.on(SocketEvent.RoomNotification, onRoomNotification);
        socket.on(SocketEvent.StartTyping, onUserTyping);
        socket.on(SocketEvent.UnreadCountUpdated, onUnreadCountUpdated);

        return () => {
            socket.off(SocketEvent.Message, onMessage);
            socket.off(SocketEvent.RoomNotification, onRoomNotification);
            socket.off(SocketEvent.StartTyping, onUserTyping);
            socket.off(SocketEvent.UnreadCountUpdated, onUnreadCountUpdated);
        };
    }, [onMessage, onRoomNotification, onUserTyping, onUnreadCountUpdated]);
};