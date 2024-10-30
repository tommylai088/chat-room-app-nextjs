import { useCallback } from "react";
import { socket, SocketEvent } from "../utils/socket.util";

interface IUseMarkAsRead {
    handleMarkAsRead: () => void;
}

interface IMarkAsReadParams {
    senderId?: string;
    receiverId?: string;
}

export const useMarkAsRead = ({ senderId, receiverId }: IMarkAsReadParams): IUseMarkAsRead => {
    const handleMarkAsRead = useCallback(() => {
        // Emit the event only if both senderId and receiverId are available
        if (senderId && receiverId) {
            socket?.emit(SocketEvent.MarkMessageAsRead, { senderId, receiverId });
        }
    }, [senderId, receiverId]);

    return { handleMarkAsRead };
};