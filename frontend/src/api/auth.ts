import axios from "axios";
import type { registerType,loginType } from "../types/auth";

const API_URL = "http://localhost:8000/api/auth"; 

export const registerUser = async (data:registerType) => {
  return axios.post(`${API_URL}/register`, data);
};

export const loginUser = async (data:loginType) => {
  return axios.post(`${API_URL}/login`, data);
};