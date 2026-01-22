import { useState, useEffect, useCallback } from "react";
import {
  getAppStatistics,
  getCustomerStatistics,
  getProviderStatistics,
  getAdStatistics,
  getServiceStatistics,
  getRequestStatistics,
  getCategoryStatistics,
} from "../services/analytics";
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
 * Hook for fetching app statistics
 */
export function useAppStatistics() {
  const [data, setData] = useState<AppStatisticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAppStatistics();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch app statistics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Auto-refresh every minute
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching customer statistics
 */
export function useCustomerStatistics(dateRange?: DateRange) {
  const [data, setData] = useState<CustomerStatisticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCustomerStatistics(dateRange);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch customer statistics");
    } finally {
      setLoading(false);
    }
  }, [dateRange?.startDate, dateRange?.endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching provider statistics
 */
export function useProviderStatistics(dateRange?: DateRange) {
  const [data, setData] = useState<ProviderStatisticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProviderStatistics(dateRange);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch provider statistics");
    } finally {
      setLoading(false);
    }
  }, [dateRange?.startDate, dateRange?.endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching ad statistics
 */
export function useAdStatistics(dateRange?: DateRange) {
  const [data, setData] = useState<AdStatisticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAdStatistics(dateRange);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch ad statistics");
    } finally {
      setLoading(false);
    }
  }, [dateRange?.startDate, dateRange?.endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching service statistics
 */
export function useServiceStatistics(dateRange?: DateRange) {
  const [data, setData] = useState<ServiceStatisticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getServiceStatistics(dateRange);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch service statistics");
    } finally {
      setLoading(false);
    }
  }, [dateRange?.startDate, dateRange?.endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching request statistics
 */
export function useRequestStatistics(dateRange?: DateRange) {
  const [data, setData] = useState<RequestStatisticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getRequestStatistics(dateRange);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch request statistics");
    } finally {
      setLoading(false);
    }
  }, [dateRange?.startDate, dateRange?.endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching category statistics
 */
export function useCategoryStatistics(dateRange?: DateRange) {
  const [data, setData] = useState<CategoryStatisticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCategoryStatistics(dateRange);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch category statistics");
    } finally {
      setLoading(false);
    }
  }, [dateRange?.startDate, dateRange?.endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
