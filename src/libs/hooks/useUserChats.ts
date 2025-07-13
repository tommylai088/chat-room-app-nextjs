import { useMessagesContext } from '@/contexts/messages/MessagesContext';
import { IUnreadCounts, IUserChat } from '@/libs/interfaces';
import { useCallback, useEffect, useMemo } from 'react';
import { useFetcherGet } from './useFetcherGet';

export const useUserChats = () => {
    const { data, loading, error, mutate } = useFetcherGet(`/messages/userChats`);
    const { dispatch } = useMessagesContext();
    
    // Memoize the sorted userChats to prevent unnecessary re-renders
    const userChats: IUserChat[] = useMemo(() => {
        const chats = [...data];
        return chats.sort((a, b) => new Date(b.latestMessage.createdAt).getTime() - new Date(a.latestMessage.createdAt).getTime());
    }, [data]);

    // Memoize the unread counts calculation
    const unreadCounts = useMemo(() => {
        if (userChats?.length === 0) return {};
        
        return userChats.reduce((acc: IUnreadCounts, item: IUserChat) => {
            const roomId = item?.latestMessage?.roomId;
            if (roomId) {
                acc[roomId] = item.unreadCount || 0;
            }
            return acc;
        }, {});
    }, [userChats]);

    // Memoize the dispatch call to prevent unnecessary re-renders
    const updateUnreadCounts = useCallback(() => {
        if (userChats?.length > 0) {
            dispatch({ type: 'SET_MESSAGE_COUNTS', payload: unreadCounts });
        }
    }, [userChats, unreadCounts, dispatch]);

    useEffect(() => {
        updateUnreadCounts();
    }, [updateUnreadCounts]);

    return {
        userChats,
        loading,
        error,
        mutate
    };
};

