import { useMessagesContext } from '@/contexts/messages/MessagesContext';
import { IUnreadCounts, IUserChat } from '@/libs/interfaces';
import { useEffect, useMemo } from 'react';
import { useFetcherGet } from './useFetcherGet';

export const useUserChats = () => {
    const { data, loading, error, mutate } = useFetcherGet(`/messages/userChats`);
    const { dispatch } = useMessagesContext();
    const userChats: IUserChat[] = useMemo(() => [...data], [data])
    userChats.sort((a, b) => new Date(b.latestMessage.createdAt).getTime() - new Date(a.latestMessage.createdAt).getTime());

    useEffect(() => {
        if (userChats?.length > 0) {
            const newCountMap = userChats.reduce((acc: IUnreadCounts, item: IUserChat) => {
                const roomId = item?.latestMessage?.roomId;
                if (roomId) {
                    acc[roomId] = item.unreadCount || 0; // Ensure to use default value
                }
                return acc;
            }, {});
            dispatch(({ type: 'SET_MESSAGE_COUNTS', payload: newCountMap }));
        }
    }, [userChats, dispatch]);


    return {
        userChats,
        loading,
        error,
        mutate
    };
};

