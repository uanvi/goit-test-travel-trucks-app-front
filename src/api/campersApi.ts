// src/api/campersApi.ts
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

// Оновлена функція з підтримкою фільтрів
export const getCampersByPage = async (page: number, limit: number, filters?: FilterState) => {
  // Формуємо параметри запиту
  const params: CampersApiParams = {
    page,
    limit,
  };

  // Додаємо фільтри якщо вони є
  if (filters) {
    if (filters.location.trim()) {
      params.location = filters.location.trim();
    }

    if (filters.form) {
      params.form = filters.form;
    }

    // Додаємо фільтри обладнання тільки якщо вони true
    Object.entries(filters.equipment).forEach(([key, value]) => {
      if (value === true) {
        params[key as keyof CampersApiParams] = true;
      } else if (typeof value === 'string' && value.trim()) {
        params[key as keyof CampersApiParams] = value.trim();
      }
    });
  }

  const response = await axios.get(API_BASE_URL, { params });
  return response.data;
};

// Функція для отримання унікальних локацій (для автокомпліту)
export const getUniqueLocations = async (): Promise<string[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    const campers = response.data.items;

    // Витягуємо унікальні локації
    const locations = Array.from(
      new Set(campers.map((camper: any) => camper.location).filter(Boolean)),
    ) as string[];

    return locations.sort();
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};

// Функція для отримання статистики фільтрів (скільки кемперів відповідає кожному фільтру)
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
      // Статистика за формою
      if (camper.form) {
        stats.byForm[camper.form] = (stats.byForm[camper.form] || 0) + 1;
      }

      // Статистика за локацією
      if (camper.location) {
        stats.byLocation[camper.location] = (stats.byLocation[camper.location] || 0) + 1;
      }

      // Статистика за обладнанням
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
