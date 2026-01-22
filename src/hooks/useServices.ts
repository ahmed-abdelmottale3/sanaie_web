import { useState, useEffect, useCallback } from "react";
import { getAllServices, getServicesByCategoryId } from "../services/services";
import type { Service } from "../types/service";

/**
 * Hook for fetching all services
 */
export function useAllServices() {
  const [data, setData] = useState<Service[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAllServices();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching services by category ID
 */
export function useServicesByCategoryId(categoryId: string) {
  const [data, setData] = useState<Service[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!categoryId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await getServicesByCategoryId(categoryId);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch services by category");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
