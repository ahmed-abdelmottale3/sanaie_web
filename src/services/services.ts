import api from "../lib/axios";
import type { Service } from "../types/service";

/**
 * Get all services
 */
export async function getAllServices(): Promise<Service[]> {
  try {
    const response = await api.get<Service[]>("/service/services");
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch services"
    );
  }
}

/**
 * Get services by category ID
 */
export async function getServicesByCategoryId(categoryId: string): Promise<Service[]> {
  try {
    const response = await api.get<Service[]>(`/service/all/${categoryId}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch services by category"
    );
  }
}
