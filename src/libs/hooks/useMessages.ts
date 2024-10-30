import { IMessage } from '@/libs/interfaces';
import { useFetcherGet } from './useFetcherGet';

export const useMessages = (receiverId?: string) => {
    const { data, loading, error, mutate } = useFetcherGet(receiverId ? `/messages?receiverId=${receiverId}` : null);
    const messages: IMessage[] = [...data];

    return {
        messages,
        isLoading: loading,
        isError: error,
        mutate
    };
};