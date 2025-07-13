import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';

// Login API function
export const login = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${USER_API_END_POINT}/login`, data);
  return response.data;
};

// Register API function
export const register = async (data: { fullname: string; email: string; password: string }) => {
  const response = await axios.post(`${USER_API_END_POINT}/register`, data);
  return response.data;
};