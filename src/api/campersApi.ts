import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';
import { FilterState } from '../redux/filters/filtersSlice';

export interface CampersApiParams {
  page: number;
  limit: number;
  location?: string;
  form?: string;
  AC?: boolean;
  transmission?: string;
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

export const getCampersByPage = async (page: number, limit: number, filters?: FilterState) => {
  const params: CampersApiParams = {
    page,
    limit,
  };

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
      } else if (typeof value === 'string' && value.trim()) {
        (params as any)[key] = value.trim();
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

export const getFilterStats = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    const campers = response.data.items;

    const stats = {
      total: campers.length,
      byForm: {} as Record<string, number>,
      byLocation: {} as Record<string, number>,
      byEquipment: {
        AC: 0,
        transmission: { automatic: 0, manual: 0 },
        kitchen: 0,
        TV: 0,
        bathroom: 0,
        refrigerator: 0,
        microwave: 0,
        gas: 0,
        water: 0,
        radio: 0,
      },
    };

    campers.forEach((camper: any) => {
      if (camper.form) {
        stats.byForm[camper.form] = (stats.byForm[camper.form] || 0) + 1;
      }

      if (camper.location) {
        stats.byLocation[camper.location] = (stats.byLocation[camper.location] || 0) + 1;
      }

      if (camper.AC) stats.byEquipment.AC++;
      if (camper.transmission === 'automatic') stats.byEquipment.transmission.automatic++;
      if (camper.transmission === 'manual') stats.byEquipment.transmission.manual++;
      if (camper.kitchen) stats.byEquipment.kitchen++;
      if (camper.TV) stats.byEquipment.TV++;
      if (camper.bathroom) stats.byEquipment.bathroom++;
      if (camper.refrigerator) stats.byEquipment.refrigerator++;
      if (camper.microwave) stats.byEquipment.microwave++;
      if (camper.gas) stats.byEquipment.gas++;
      if (camper.water) stats.byEquipment.water++;
      if (camper.radio) stats.byEquipment.radio++;
    });

    return stats;
  } catch (error) {
    console.error('Error fetching filter stats:', error);
    return null;
  }
};
