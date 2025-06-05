import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';
import { FilterParams } from '../components/FilterSidebar/FilterSidebar';

export interface CampersApiParams {
  page: number;
  limit: number;
  location?: string;
  form?: string;
  AC?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  bathroom?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  radio?: boolean;
}

export const getAllCampers = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data.items;
};

export const getCamperById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const getCampersByPage = async (page: number, limit: number, filters?: FilterParams) => {
  const params: CampersApiParams = { page, limit };

  if (filters) {
    if (filters.location.trim()) {
      params.location = filters.location.trim();
    }

    if (filters.form) {
      params.form = filters.form;
    }

    Object.entries(filters.equipment).forEach(([key, value]) => {
      if (value === true) {
        (params as any)[key] = true;
      }
    });
  }

  const response = await axios.get(API_BASE_URL, { params });
  return response.data;
};

export const getUniqueLocations = async (): Promise<string[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    const campers = response.data.items;

    const locations = Array.from(
      new Set(campers.map((camper: any) => camper.location).filter(Boolean)),
    ) as string[];

    return locations.sort();
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};
