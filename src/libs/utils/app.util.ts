import { instance } from "./api.util";

export const getBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve(reader.result as string)
        }
        reader.onerror = () => {
            reject('Get base64 string error')
        }
    })
}

export const markAsRead = async (url: string) => {
    return instance.patch(url).then((res) => {
        if (!res.data) {
            throw Error(res.data.message);
        }
        return res.data;
    });
}
