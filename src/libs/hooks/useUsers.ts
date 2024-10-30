import { useFetcherGet } from './useFetcherGet';

export const useUsers = (name: string) => {
    const { data, loading, error } = useFetcherGet(name ? `/users?name=${name}` : null);
    return {
        users: data,
        loading,
        error,
    };
};