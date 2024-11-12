import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  selectedDistrict: string;
  districtData: DistrictDataMap;
}

interface DistrictData {
  2025: "Scarcity" | "Stress" | "No Stress";
  2050: "Scarcity" | "Stress" | "No Stress";
  geoJSON: any;
}

interface DistrictDataMap {
  [key: string]: DistrictData;
}

const MapComponent: React.FC<MapComponentProps> = ({
  selectedDistrict,
  districtData,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current) {
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current).setView(
          [26.2006, 92.9376],
          7
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstanceRef.current);
      }

      if (selectedDistrict && districtData[selectedDistrict]) {
        const data = districtData[selectedDistrict];
        const layer = L.geoJSON(data.geoJSON, {
          style: () => ({
            color: getColor(data[2050]),
            weight: 2,
            opacity: 1,
            fillOpacity: 0.5,
          }),
        }).addTo(mapInstanceRef.current);

        const bounds = layer.getBounds();
        mapInstanceRef.current.fitBounds(bounds);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedDistrict, districtData]);

  const getColor = (status: "Scarcity" | "Stress" | "No Stress"): string => {
    switch (status) {
      case "Scarcity":
        return "#ff0000";
      case "Stress":
        return "#ffa500";
      case "No Stress":
        return "#00ff00";
    }
  };

  return <div ref={mapRef} className="h-[500px] w-full rounded-md border" />;
};

export default MapComponent;