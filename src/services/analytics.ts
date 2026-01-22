import api from "../lib/axios";
import type {
  AppStatisticsResponse,
  CustomerStatisticsResponse,
  ProviderStatisticsResponse,
  AdStatisticsResponse,
  ServiceStatisticsResponse,
  RequestStatisticsResponse,
  CategoryStatisticsResponse,
  DateRange,
} from "../types/analytics";

/**
 * Get general app statistics
 */
export async function getAppStatistics(): Promise<AppStatisticsResponse> {
  try {
    const response = await api.get<AppStatisticsResponse>("/analytics/stats");
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch app statistics"
    );
  }
}

/**
 * Get customer statistics
 */
export async function getCustomerStatistics(dateRange?: DateRange): Promise<CustomerStatisticsResponse> {
  try {
    const params = new URLSearchParams();
    if (dateRange?.startDate) params.append("startDate", dateRange.startDate);
    if (dateRange?.endDate) params.append("endDate", dateRange.endDate);

    const queryString = params.toString();
    const url = `/analytics/customer-stats${queryString ? `?${queryString}` : ""}`;
    const response = await api.get<CustomerStatisticsResponse>(url);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch customer statistics"
    );
  }
}

/**
 * Get provider statistics
 */
export async function getProviderStatistics(dateRange?: DateRange): Promise<ProviderStatisticsResponse> {
  try {
    const params = new URLSearchParams();
    if (dateRange?.startDate) params.append("startDate", dateRange.startDate);
    if (dateRange?.endDate) params.append("endDate", dateRange.endDate);

    const queryString = params.toString();
    const url = `/analytics/provider-stats${queryString ? `?${queryString}` : ""}`;
    const response = await api.get<ProviderStatisticsResponse>(url);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch provider statistics"
    );
  }
}

/**
 * Get ad statistics
 */
export async function getAdStatistics(dateRange?: DateRange): Promise<AdStatisticsResponse> {
  try {
    const params = new URLSearchParams();
    if (dateRange?.startDate) params.append("startDate", dateRange.startDate);
    if (dateRange?.endDate) params.append("endDate", dateRange.endDate);

    const queryString = params.toString();
    const url = `/analytics/ad-stats${queryString ? `?${queryString}` : ""}`;
    const response = await api.get<AdStatisticsResponse>(url);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch ad statistics"
    );
  }
}

/**
 * Get service statistics
 */
export async function getServiceStatistics(dateRange?: DateRange): Promise<ServiceStatisticsResponse> {
  try {
    const params = new URLSearchParams();
    if (dateRange?.startDate) params.append("startDate", dateRange.startDate);
    if (dateRange?.endDate) params.append("endDate", dateRange.endDate);

    const queryString = params.toString();
    const url = `/analytics/service-stats${queryString ? `?${queryString}` : ""}`;
    const response = await api.get<ServiceStatisticsResponse>(url);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch service statistics"
    );
  }
}

/**
 * Get request statistics
 */
export async function getRequestStatistics(dateRange?: DateRange): Promise<RequestStatisticsResponse> {
  try {
    const params = new URLSearchParams();
    if (dateRange?.startDate) params.append("startDate", dateRange.startDate);
    if (dateRange?.endDate) params.append("endDate", dateRange.endDate);

    const queryString = params.toString();
    const url = `/analytics/request-stats${queryString ? `?${queryString}` : ""}`;
    const response = await api.get<RequestStatisticsResponse>(url);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch request statistics"
    );
  }
}

/**
 * Get category statistics
 */
export async function getCategoryStatistics(dateRange?: DateRange): Promise<CategoryStatisticsResponse> {
  try {
    const params = new URLSearchParams();
    if (dateRange?.startDate) params.append("startDate", dateRange.startDate);
    if (dateRange?.endDate) params.append("endDate", dateRange.endDate);

    const queryString = params.toString();
    const url = `/analytics/category-stats${queryString ? `?${queryString}` : ""}`;
    const response = await api.get<CategoryStatisticsResponse>(url);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    throw new Error(
      err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch category statistics"
    );
  }
}
