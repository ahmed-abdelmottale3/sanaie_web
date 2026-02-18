import api from "../lib/axios";

export interface NearbyService {
  _id: string;
  userID: string;
  businessName?: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
  distance: number;
}

export interface SearchServicesByLocationResponse {
  count: number;
  services: NearbyService[];
}

export interface ProviderLocation {
  providerId: string;
  coordinates: [number, number];
}

/**
 * Search services/providers by nearby location.
 * Backend endpoint: GET /service/search?lat=..&lng=..&radius=..
 */
export async function searchServicesByLocation(
  lat: number,
  lng: number,
  radiusKm: number,
): Promise<ProviderLocation[]> {
  try {
    const response = await api.get<SearchServicesByLocationResponse>("/service/search", {
      params: {
        lat,
        lng,
        radius: radiusKm,
      },
    });

    return response.data.services
      .filter((s) => s.location && Array.isArray(s.location.coordinates))
      .map((s) => ({
        providerId: s.userID || s._id,
        coordinates: s.location.coordinates,
      }));
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: { error?: string; message?: string } };
      message?: string;
    };

    throw new Error(
      err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Failed to search services by location",
    );
  }
}

