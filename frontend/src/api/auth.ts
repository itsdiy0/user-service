import axios, { AxiosError } from "axios";
import type { RegisterRequest,RegisterSuccessResponse,LoginRequest,LoginResponse,ErrorResponse,User } from "../types/auth";

const API_URL = "http://localhost:8000/api/auth"; 

export const registerUser = async (data: RegisterRequest) => {
  try {
    const res = await axios.post<RegisterSuccessResponse>(`${API_URL}/register`, data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    throw error.response?.data || { detail: "Unknown error" };
  }
};

export const loginUser = async (data: LoginRequest) => {
  try {
    const res = await axios.post<LoginResponse>(`${API_URL}/login`, data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    throw error.response?.data || { detail: "Unknown error" };
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    const res = await axios.get<User>(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    throw error.response?.data || { detail: "Failed to fetch user data" };
  }
};