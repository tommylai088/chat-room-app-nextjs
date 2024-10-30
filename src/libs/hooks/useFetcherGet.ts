import { fetcher } from '@/libs/utils/api.util';
import useSWR from 'swr';

export const useFetcherGet = (url: string | null) => {
    const { data, error, mutate } = useSWR(url, fetcher,
        //     {
        //     refreshInterval: 10000
        // }
    );
    return { data: data || [], loading: !error && !data, mutate, error };
};