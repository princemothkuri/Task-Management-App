import axios from "axios";

const API_URL = "https://task-management-app-server-y13i.onrender.com";

// User Authentication
export const signup = (userData) =>
  axios.post(`${API_URL}/api/auth/signup`, userData);
export const login = (userData) =>
  axios.post(`${API_URL}/api/auth/login`, userData);

// Forget Password - Verify Email
export const verifyEmail = (email) =>
  axios.post(`${API_URL}/api/auth/verify-email`, { email });

// Forget Password - Reset Password
export const resetPassword = (email, password) =>
  axios.post(`${API_URL}/api/auth/reset-password`, { email, password });

// Task Management
export const createTask = (taskData, token) =>
  axios.post(`${API_URL}/api/tasks`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTasks = (token) =>
  axios.get(`${API_URL}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateTask = (taskId, taskData, token) =>
  axios.put(`${API_URL}/api/tasks/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTask = (taskId, token) =>
  axios.delete(`${API_URL}/api/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getUserById = (userId, token) =>
  axios.get(`${API_URL}/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateUserProfile = (userId, userData, token) =>
  axios.put(`${API_URL}/api/users/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
