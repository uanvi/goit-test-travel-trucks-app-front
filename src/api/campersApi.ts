import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';
import { FilterParams } from '../components/FilterSidebar/FilterSidebar';
import { getFilterableFeatures } from '../utils/featuresUtils';

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

export const getCampersByPage = async (page: number, limit: number, filters?: FilterParams) => {
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

// ✅ Рефакторена функція - використовує центральний конфіг
export const getFilterStats = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    const campers = response.data.items;

    // ✅ Отримуємо equipment features з централізованого конфігу
    const filterableFeatures = getFilterableFeatures();

    // ✅ Динамічно створюємо byEquipment на основі конфігу
    const byEquipment: Record<string, any> = {};
    filterableFeatures.forEach(feature => {
      if (feature.filterKey === 'transmission') {
        byEquipment.transmission = { automatic: 0, manual: 0 };
      } else if (feature.filterKey) {
        byEquipment[feature.filterKey] = 0;
      }
    });

    const stats = {
      total: campers.length,
      byForm: {} as Record<string, number>,
      byLocation: {} as Record<string, number>,
      byEquipment,
    };

    campers.forEach((camper: any) => {
      // Form stats
      if (camper.form) {
        stats.byForm[camper.form] = (stats.byForm[camper.form] || 0) + 1;
      }

      // Location stats
      if (camper.location) {
        stats.byLocation[camper.location] = (stats.byLocation[camper.location] || 0) + 1;
      }

      // ✅ Equipment stats - динамічно на основі конфігу
      filterableFeatures.forEach(feature => {
        if (feature.filterKey === 'transmission') {
          if (camper.transmission === 'automatic') stats.byEquipment.transmission.automatic++;
          if (camper.transmission === 'manual') stats.byEquipment.transmission.manual++;
        } else if (feature.filterKey && camper[feature.key]) {
          stats.byEquipment[feature.filterKey]++;
        }
      });
    });

    return stats;
  } catch (error) {
    console.error('Error fetching filter stats:', error);
    return null;
  }
};
