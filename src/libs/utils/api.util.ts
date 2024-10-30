import axios from 'axios';
import { getSession } from 'next-auth/react';
import config from '../config/app.config';

export const instance = axios.create({
    baseURL: config.API_HOST,
    timeout: 40000,
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8',
    }
});

instance.interceptors.request.use(
    async (request) => {
        const session = await getSession();
        if (session) {
            request.headers.Authorization = `Bearer ${session.accessToken}`;
        }
        return request;
    }
);

export const fetcher = (url: string) => {
    return instance.get(url).then((res) => {
        if (!res.data) {
            throw Error(res.data.message);
        }

        return res.data;
    });
};