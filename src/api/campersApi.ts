import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

export const getAllCampers = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data.items;
};

export const getCamperById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const getCampersByPage = async (page: number, limit: number) => {
  const url = `${API_BASE_URL}?page=${page}&limit=${limit}`;
  const response = await axios.get(url);
  return response.data;
};