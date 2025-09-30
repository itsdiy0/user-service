export type registerType = {
    email: string;
    username: string;
    full_name?: string;
    password: string;
}

export type loginType = {
    email: string;
    password: string;
}

export type loginResponseType = {
    access_token: string;
    type: string;
}

export type registerResponseType = {
    id: number;
    email: string;
    username: string;
    full_name: string;
}