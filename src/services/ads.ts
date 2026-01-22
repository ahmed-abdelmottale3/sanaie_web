import api from "../lib/axios";
import type { Ad } from "../types/ad";

/**
 * Get all ads
 */
export async function getAllAds(): Promise<Ad[]> {
  try {
    const response = await api.get<Ad[]>("/ads/all");
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch ads"
    );
  }
}

/**
 * Get active ads
 */
export async function getActiveAds(): Promise<Ad[]> {
  try {
    const response = await api.get<Ad[]>("/ads");
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch active ads"
    );
  }
}

/**
 * Get ad by ID
 */
export async function getAdById(id: string): Promise<Ad> {
  try {
    const response = await api.get<Ad>(`/ads/${id}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch ad"
    );
  }
}
