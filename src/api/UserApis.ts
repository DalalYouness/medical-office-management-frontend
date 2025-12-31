// src/api/userApi.js
import axios from "axios";

const API_URL = "http://localhost:8085/users";

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/add`, userData);
};

export const getUsers = async () => {
  return axios.get(API_URL);
};

export const deleteUser = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const updateUser = async (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};
