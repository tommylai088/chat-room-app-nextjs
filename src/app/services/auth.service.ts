import { ICreateUserPostRequestArgs } from "@/libs/interfaces";
import { instance } from "@/libs/utils/api.util";

export const createUser = async (url: string, { arg }: { arg: ICreateUserPostRequestArgs }) => {
    return instance.post(url, arg?.requestBody).then((res) => {
        if (!res.data) {
            throw Error(res.data.message);
        }
        return res.data;
    });
}