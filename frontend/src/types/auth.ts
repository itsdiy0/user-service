export interface RegisterRequest {
    email: string;
    username: string;
    full_name?: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    type: string;
}

export interface RegisterSuccessResponse {
    email: string;
    username: string;
    full_name: string | null;
    id: string;
    is_active: boolean;
    created_at: string;
}

export interface ErrorResponse {
    detail: string;
}