export interface ILogin {
    username: string;
    password: string;
}

export interface ICreateUser {
    username: string;
    password: string;
    confirmPassword?: string;
    avatar?: string;
}

export interface ICreateUserPostRequestArgs {
    requestBody: ICreateUser;
};