import { useEffect } from "react";
import { socket, SocketEvent } from "../utils/socket.util";

export const useSocket = (userId?: string) => {
    // Register the user with the socket server
    useEffect(() => {
        if (!userId) return;

        socket?.emit(SocketEvent.Register, userId);
        // console.log(`Registered user: ${userId}`);

        return () => {
            socket?.off(SocketEvent.Register);
        };
    }, [userId]);
};