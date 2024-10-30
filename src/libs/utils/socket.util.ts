import { io } from "socket.io-client";
import config from "../config/app.config";

export const socket = io(config.API_HOST);

export enum SocketEvent {
    Register = 'register',
    SendMessage = 'sendMessage',
    Message = 'message',
    JoinRoom = 'joinRoom',
    RoomNotification = 'roomNotification',
    StartTyping = 'startTyping',
    StopTyping = 'stopTyping',
    MarkMessageAsRead = 'markMessageAsRead',
    UnreadCountUpdated = 'unreadCountUpdated'
}