import api from "../lib/axios";
import type { Category } from "../types/category";

/**
 * Get all categories
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await api.get<Category[]>("/category/categories");
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch categories"
    );
  }
}

/**
 * Get category by ID
 */
export async function getCategoryById(id: string): Promise<Category> {
  try {
    const response = await api.get<Category>(`/category/${id}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch category"
    );
  }
}
