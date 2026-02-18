"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import {
  useProviderLocationsInArea,
  type CityKey,
  CITY_OPTIONS,
} from "../../hooks/useProviderLocationsInArea";
import { useI18n } from "../../i18n/I18nProvider";

const providerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const AnyMapContainer = MapContainer as any;
const AnyTileLayer = TileLayer as any;
const AnyMarker = Marker as any;

interface ProviderMapByCityProps {
  cityKey?: CityKey;
}

function RecenterOnCity({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function ProviderMapByCity({ cityKey = "cairo" }: ProviderMapByCityProps) {
  const [selectedCity, setSelectedCity] = useState<CityKey>(cityKey);
  const { city, providersInArea, countInArea, loading, error, radiusKm, allLocations } =
    useProviderLocationsInArea(selectedCity);
  const { t } = useI18n();

  if (loading) {
    return <p className="text-center">جارٍ تحميل إحداثيات مقدمي الخدمة...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!city) {
    return null;
  }

  const handleCityChange = (value: CityKey) => {
    setSelectedCity(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {t("providers.map_select_city") as string}
          </span>
          <select
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value as CityKey)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          >
            {CITY_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-center text-sm">
        {t("providers.stat_total")}:{" "}
        <span className="font-bold">{countInArea}</span>{" "}
        ({radiusKm} km - {city.name})
      </p>

      {allLocations.length > 0 && countInArea === 0 && (
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          {t("providers.map_no_in_radius") as string}
        </p>
      )}

      <div className="h-[400px] w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
        <AnyMapContainer
          center={[city.lat, city.lng]}
          zoom={11}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom
        >
          <RecenterOnCity center={[city.lat, city.lng]} />
          <AnyTileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {providersInArea.map((provider) => {
            const [lng, lat] = provider.coordinates;

            return (
              <AnyMarker key={provider.providerId} position={[lat, lng]} icon={providerIcon}>
                <Popup>Provider ID: {provider.providerId}</Popup>
              </AnyMarker>
            );
          })}
        </AnyMapContainer>
      </div>
    </div>
  );
}

