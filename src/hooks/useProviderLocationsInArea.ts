import { useEffect, useMemo, useState } from "react";
import type { ProviderLocation } from "../services/providers";
import { searchServicesByLocation } from "../services/providers";

// نعتبر الجيزة و6 أكتوبر وأحياء القاهرة ضمن نطاق "القاهرة الكبرى"
export const CITY_CONFIG = {
  cairo: { name: "القاهرة الكبرى", lat: 30.0444, lng: 31.2357, radiusKm: 60 },
  alexandria: { name: "الإسكندرية", lat: 31.2001, lng: 29.9187, radiusKm: 30 },
  mansoura: { name: "المنصورة", lat: 31.0425, lng: 31.3785, radiusKm: 25 },
} as const;

export type CityKey = keyof typeof CITY_CONFIG;

export const CITY_OPTIONS: { key: CityKey; name: string }[] = Object.entries(CITY_CONFIG).map(
  ([key, value]) => ({
    key: key as CityKey,
    name: value.name,
  }),
);

function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface UseProviderLocationsInAreaResult {
  loading: boolean;
  error: string | null;
  city: (typeof CITY_CONFIG)[CityKey] | null;
  allLocations: ProviderLocation[];
  providersInArea: ProviderLocation[];
  countInArea: number;
  radiusKm: number;
}

export function useProviderLocationsInArea(
  cityKey: CityKey,
  radiusKmOverride?: number,
): UseProviderLocationsInAreaResult {
  const [locations, setLocations] = useState<ProviderLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const city = CITY_CONFIG[cityKey] ?? null;
    const effectiveRadiusKm = city
      ? radiusKmOverride && radiusKmOverride > 0
        ? radiusKmOverride
        : city.radiusKm
      : 0;

    async function fetchAll() {
      try {
        setLoading(true);
        setError(null);

        if (!city || !effectiveRadiusKm) {
          setLocations([]);
          return;
        }

        const results = await searchServicesByLocation(city.lat, city.lng, effectiveRadiusKm);

        if (cancelled) {
          return;
        }

        setLocations(results);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch provider locations");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, [cityKey, radiusKmOverride]);

  const city = CITY_CONFIG[cityKey] ?? null;
  const effectiveRadiusKm = city
    ? radiusKmOverride && radiusKmOverride > 0
      ? radiusKmOverride
      : city.radiusKm
    : 0;

  const providersInArea = useMemo(() => {
    if (!city || !effectiveRadiusKm) {
      return [];
    }

    return locations.filter((loc) => {
      const [lng, lat] = loc.coordinates;
      return distanceKm(lat, lng, city.lat, city.lng) <= effectiveRadiusKm;
    });
  }, [locations, city, effectiveRadiusKm]);

  return {
    loading,
    error,
    city,
    allLocations: locations,
    providersInArea,
    countInArea: providersInArea.length,
    radiusKm: effectiveRadiusKm,
  };
}

