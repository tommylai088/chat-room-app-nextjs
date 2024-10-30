import { useAuth } from '@/libs/hooks/useAuth';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import config from '../config/app.config';

export const useSocketIO = () => {
    const { session } = useAuth();
    const [socket, setSocket] = useState<Socket | null>();
    const token = session?.accessToken;

    useEffect(() => {
        if (token) {
            const newSocket = io(config.API_HOST, {
                auth: {
                    token,
                },
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, [token]);

    return socket;
};