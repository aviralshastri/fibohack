"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

interface DistrictData {
  2025: "Scarcity" | "Stress" | "No Stress";
  2050: "Scarcity" | "Stress" | "No Stress";
  geoJSON: any;
}

interface StateDistricts {
  [key: string]: string[];
}

interface DistrictDataMap {
  [key: string]: DistrictData;
}

const CircleIndicator = () => {
  return (
    <div>
      <div className="flex space-x-8">
        <div className="flex flex-row items-center">
          <span className="text-black text-lg font-bold">High:</span>
          <div className="w-6 h-6 bg-red-600 rounded-full flex justify-center items-center"></div>
        </div>
        <div className="flex flex-row items-center">
          <span className="text-black text-lg font-bold">Medium:</span>
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex justify-center items-center"></div>
        </div>
        <div className="flex flex-row items-center">
          <span className="text-black text-lg font-bold">Low:</span>
          <div className="w-6 h-6 bg-green-500 rounded-full flex justify-center items-center"></div>
        </div>
      </div>
    </div>
  );
};

const WaterScarcityMap = () => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [mapKey, setMapKey] = useState(0);

  const states: StateDistricts = {
    Assam: [
      "Kokrajhar",
      "Baksa",
      "Barpeta",
      "Bongaigaon",
      "Cachar",
      "Dhubri",
      "Dibrugarh",
      "Golaghat",
    ],
  };

  const districtData: DistrictDataMap = {
    Kokrajhar: {
      2025: "Stress",
      2050: "Scarcity",
      geoJSON: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [90.3776, 26.3913],
              [90.3776, 26.35],
              [90.4, 26.35],
              [90.4, 26.3913],
              [90.3776, 26.3913],
            ],
          ],
        },
        properties: { name: "Kokrajhar" },
      },
    },
    Baksa: {
      2025: "Scarcity",
      2050: "Scarcity",
      geoJSON: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [90.556, 26.485],
              [90.556, 26.445],
              [90.58, 26.445],
              [90.58, 26.485],
              [90.556, 26.485],
            ],
          ],
        },
        properties: { name: "Baksa" },
      },
    },
    Barpeta: {
      2025: "No Stress",
      2050: "Stress",
      geoJSON: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [90.934, 26.259],
              [90.934, 26.22],
              [90.96, 26.22],
              [90.96, 26.259],
              [90.934, 26.259],
            ],
          ],
        },
        properties: { name: "Barpeta" },
      },
    },
    Bongaigaon: {
      2025: "Scarcity",
      2050: "Stress",
      geoJSON: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [90.533, 26.462],
              [90.533, 26.425],
              [90.55, 26.425],
              [90.55, 26.462],
              [90.533, 26.462],
            ],
          ],
        },
        properties: { name: "Bongaigaon" },
      },
    },
    Cachar: {
      2025: "No Stress",
      2050: "No Stress",
      geoJSON: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [92.76, 24.84],
              [92.76, 24.81],
              [92.79, 24.81],
              [92.79, 24.84],
              [92.76, 24.84],
            ],
          ],
        },
        properties: { name: "Cachar" },
      },
    },
    Dhubri: {
      2025: "Stress",
      2050: "Stress",
      geoJSON: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [89.97, 26.026],
              [89.97, 25.99],
              [90.0, 25.99],
              [90.0, 26.026],
              [89.97, 26.026],
            ],
          ],
        },
        properties: { name: "Dhubri" },
      },
    },
    Dibrugarh: {
      2025: "No Stress",
      2050: "Stress",
      geoJSON: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [94.982, 27.3],
              [94.982, 27.27],
              [95.015, 27.27],
              [95.015, 27.3],
              [94.982, 27.3],
            ],
          ],
        },
        properties: { name: "Dibrugarh" },
      },
    },
    Golaghat: {
      2025: "Scarcity",
      2050: "Scarcity",
      geoJSON: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [93.39, 26.55],
              [93.39, 26.52],
              [93.42, 26.52],
              [93.42, 26.55],
              [93.39, 26.55],
            ],
          ],
        },
        properties: { name: "Golaghat" },
      },
    },
  };

  const showDistrictMap = () => {
    if (!selectedDistrict) return;
    setMapKey((prevKey) => prevKey + 1);
  };

  return (
    <Layout>
      <Card className="m-4">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Water Scarcity Map</h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent style={{ zIndex: 1000 }}>
                  {Object.keys(states).map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedDistrict}
                onValueChange={setSelectedDistrict}
                disabled={!selectedState}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent style={{ zIndex: 1000 }}>
                  {selectedState &&
                    states[selectedState].map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Button onClick={showDistrictMap} disabled={!selectedDistrict}>
                Show District
              </Button>
            </div>
            <CircleIndicator />
            {selectedDistrict && districtData[selectedDistrict] && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{selectedDistrict}</h3>
                <p>
                  Water Scarcity Status in 2025:{" "}
                  {districtData[selectedDistrict][2025]}
                </p>
                <p>
                  Water Scarcity Status in 2050:{" "}
                  {districtData[selectedDistrict][2050]}
                </p>
              </div>
            )}
            <MapComponent
              key={mapKey}
              selectedDistrict={selectedDistrict}
              districtData={districtData}
            />
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default WaterScarcityMap;
