export interface IUser {
    id: string;
    username: string;
    avatar: IAvatar;
}

export interface IAvatar {
    folder: string;
    formatType: string;
    public_id: string;
    resourceType: string;
    tags: string[];
    url: string;
}
