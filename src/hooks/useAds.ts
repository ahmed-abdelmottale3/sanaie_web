import { useState, useEffect, useCallback } from "react";
import { getAllAds, getActiveAds, getAdById } from "../services/ads";
import type { Ad } from "../types/ad";

/**
 * Hook for fetching all ads
 */
export function useAllAds() {
  const [data, setData] = useState<Ad[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAllAds();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch ads");
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
 * Hook for fetching active ads only
 */
export function useActiveAds() {
  const [data, setData] = useState<Ad[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getActiveAds();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch active ads");
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
 * Hook for fetching a single ad by ID
 */
export function useAdById(id: string) {
  const [data, setData] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await getAdById(id);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch ad");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
