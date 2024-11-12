"use client";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  state: string;
  city: string;
  fieldSize: string;
  irrigationMethod: "flood" | "sprinkler" | "drip";
  soilType: "clay" | "sand" | "loam";
  techniques: string[];
  cropType: string;
  growthStage: string;
  season: string;
  location: string;
}

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

export default function WaterIrrigationCalculator() {
  const [formData, setFormData] = useState<FormData>({
    state: "",
    city: "",
    fieldSize: "",
    irrigationMethod: "flood",
    soilType: "clay",
    techniques: [],
    cropType: "cotton",
    growthStage: "germination",
    season: "spring",
    location: "",
  });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [waterUsage, setWaterUsage] = useState<number | null>(null);

  const states: { [key: string]: string[] } = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubli"],
    Delhi: ["Delhi"],
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;

    if (type === "select-multiple") {
      const select = e.target as HTMLSelectElement;
      const values = Array.from(select.selectedOptions).map(
        (option) => option.value
      );
      setFormData((prev) => ({ ...prev, [name]: values }));
    } else {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      fieldSize,
      irrigationMethod,
      soilType,
      techniques,
      cropType,
      location,
    } = formData;
    const apiKey = "6d09f5d69178912c5f4209bca98be73a";

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      const weather: WeatherData = await res.json();
      setWeatherData(weather);

      const baseWaterUsage: { [key: string]: number } = {
        cotton: 466667,
        wheat: 350000,
        rice: 875000,
        jute: 583333,
        pulses: 291667,
        vegetables: 466667,
      };

      let waterUsage = baseWaterUsage[cropType] || 0;

      switch (irrigationMethod) {
        case "flood":
          waterUsage *= 1.2;
          break;
        case "sprinkler":
          waterUsage *= 1.1;
          break;
        case "drip":
          waterUsage *= 0.8;
          break;
      }

      switch (soilType) {
        case "clay":
          waterUsage *= 1.1;
          break;
        case "sand":
          waterUsage *= 0.9;
          break;
      }

      techniques.forEach((technique) => {
        if (technique === "drip") waterUsage *= 0.8;
        if (technique === "mulching") waterUsage *= 0.9;
        if (technique === "rainwater") waterUsage *= 0.85;
      });

      const totalWaterUsage = waterUsage * parseFloat(fieldSize);
      setWaterUsage(totalWaterUsage);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex pt-20 pb-10 justify-center">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Water Usage Calculator
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="state" className="mb-1 text-gray-600">
                State:
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select State</option>
                {Object.keys(states).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="city" className="mb-1 text-gray-600">
                City:
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select City</option>
                {states[formData.state]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="field-size" className="mb-1 text-gray-600">
                Field Size (hectares):
              </label>
              <input
                type="number"
                id="field-size"
                name="fieldSize"
                value={formData.fieldSize}
                onChange={handleChange}
                step="0.1"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="irrigation-method" className="mb-1 text-gray-600">
                Irrigation Method:
              </label>
              <select
                id="irrigation-method"
                name="irrigationMethod"
                value={formData.irrigationMethod}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="flood">Flood</option>
                <option value="sprinkler">Sprinkler</option>
                <option value="drip">Drip</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="soil-type" className="mb-1 text-gray-600">
                Soil Type:
              </label>
              <select
                id="soil-type"
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="clay">Clay</option>
                <option value="sand">Sand</option>
                <option value="loam">Loam</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
            >
              Calculate Water Usage
            </button>
          </form>

          {waterUsage !== null && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Water Requirements
              </h2>
              <p>
                Based on your inputs, you will need approximately{" "}
                <strong>{waterUsage.toFixed(2)} liters</strong> of water for
                your field.
              </p>
            </div>
          )}

          {weatherData && weatherData.main && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800">
                Weather Information
              </h2>
              <p>
                <strong>Temperature:</strong> {weatherData.main.temp}°C
              </p>
              <p>
                <strong>Humidity:</strong> {weatherData.main.humidity}%
              </p>
              <p>
                <strong>Weather Condition:</strong>{" "}
                {weatherData.weather[0].description}
              </p>
              <Image
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="weather icon"
                width={50}
                height={50}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
