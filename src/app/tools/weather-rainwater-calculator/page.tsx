"use client";

import React, { useState } from "react";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";

const API_KEY = "d96fd0b37aba79a2d7362ca7c283187f";
const API_URL = "https://api.weatherstack.com/current";

export default function WeatherRainwaterCalculator() {
  const [city, setCity] = useState("London");
  const [roofSize, setRoofSize] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [rainwaterData, setRainwaterData] = useState(null);
  const [error, setError] = useState(null);
  const [apiRequestCount, setApiRequestCount] = useState(0);

  const getWeather = async () => {
    setError(null);
    setWeatherData(null);
    setRainwaterData(null);

    if (!roofSize || isNaN(parseFloat(roofSize)) || parseFloat(roofSize) <= 0) {
      setError("Please enter a valid roof size.");
      return;
    }

    if (apiRequestCount ===3){
      alert("can't make more then 3 calls in single load")
      return
    }
    try {
      const response = await fetch(
        `${API_URL}?access_key=${API_KEY}&query=${city}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setApiRequestCount((prev) => prev + 1);

      if (data.error) {
        throw new Error(data.error.info);
      }

      setWeatherData(data.current);
      calculateRainwater(data.current.precip, parseFloat(roofSize));
    } catch (error) {
      setError(`Error fetching weather data: ${error.message}`);
    }
  };

  const calculateRainwater = (precipitation, size) => {
    const harvestedWater = precipitation * size * 0.001 * 1000 * 0.8;
    setRainwaterData({
      precipitation,
      roofSize: size,
      harvestedWater: harvestedWater.toFixed(2),
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Weather and Rainwater Calculator
        </h1>

        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
          <div className="mb-4">
            <label
              htmlFor="city-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select a city:
            </label>
            <select
              id="city-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="London">London</option>
              <option value="New York">New York</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="roof-size"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter roof size (m²):
            </label>
            <input
              type="number"
              id="roof-size"
              value={roofSize}
              onChange={(e) => setRoofSize(e.target.value)}
              min="1"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <button
            onClick={getWeather}
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            Get Weather
          </button>

          {error && <div className="mt-4 text-red-600">{error}</div>}

          {weatherData && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4 text-teal-800">
                Weather Information for {city}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Temperature:</strong> {weatherData.temperature} °C
                </div>
                <div>
                  <strong>Wind Speed:</strong> {weatherData.wind_speed} km/h
                </div>
                <div>
                  <strong>Pressure:</strong> {weatherData.pressure} mb
                </div>
                <div>
                  <strong>Humidity:</strong> {weatherData.humidity} %
                </div>
                <div>
                  <strong>Cloud Cover:</strong> {weatherData.cloudcover} %
                </div>
                <div>
                  <strong>Feels Like:</strong> {weatherData.feelslike} °C
                </div>
                <div>
                  <strong>UV Index:</strong> {weatherData.uv_index}
                </div>
                <div>
                  <strong>Visibility:</strong> {weatherData.visibility} km
                </div>
                <div className="col-span-2">
                  <strong>Weather Description:</strong>{" "}
                  {weatherData.weather_descriptions.join(", ")}
                </div>
                <div className="col-span-2">
                  <strong>Weather Icon:</strong>
                  <Image
                    src={weatherData.weather_icons[0]}
                    alt="Weather icon"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            </div>
          )}

          {rainwaterData && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4 text-teal-800">
                Estimated Harvested Water
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Precipitation:</strong> {rainwaterData.precipitation}{" "}
                  mm
                </div>
                <div>
                  <strong>Roof Size:</strong> {rainwaterData.roofSize} m²
                </div>
                <div className="col-span-2">
                  <strong>Estimated Harvested Water:</strong>{" "}
                  {rainwaterData.harvestedWater} liters
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
