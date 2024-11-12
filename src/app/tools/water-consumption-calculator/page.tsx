'use client'
import React, { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Layout from "@/components/Layout/Layout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function WaterConsumptionTool() {
  const [formData, setFormData] = useState({
    watering: '',
    bathing: '',
    irrigation: '',
    laundry: '',
    others: '',
  });

  const [chartData, setChartData] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      labels: ['Watering Plants', 'Bathing', 'Irrigation', 'Laundry', 'Others'],
      withoutSaving: Object.values(formData).map(Number),
      withSaving: Object.values(formData).map((value, index) => {
        const savings = [0.6, 0.9, 0.5, 0.7, 0.7];
        return Number(value) * savings[index];
      }),
    };
    setChartData(data);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Water Consumption Tools</h1>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)} (litres):
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={key}
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        {chartData && (
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Water Consumption Comparison</h2>
              <Line
                data={{
                  labels: chartData.labels,
                  datasets: [
                    {
                      label: 'Without Saving Techniques',
                      data: chartData.withoutSaving,
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                      label: 'With Saving Techniques',
                      data: chartData.withSaving,
                      borderColor: 'rgb(53, 162, 235)',
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                  ],
                }}
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Water Usage by Category</h2>
              <Bar
                data={{
                  labels: chartData.labels,
                  datasets: [
                    {
                      label: 'Without Saving Techniques',
                      data: chartData.withoutSaving,
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                      label: 'With Saving Techniques',
                      data: chartData.withSaving,
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                  ],
                }}
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Water Consumption Distribution</h2>
              <div className="w-full max-w-md mx-auto">
                <Doughnut
                  data={{
                    labels: chartData.labels,
                    datasets: [
                      {
                        label: 'With Saving Techniques',
                        data: chartData.withSaving,
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.5)',
                          'rgba(54, 162, 235, 0.5)',
                          'rgba(255, 206, 86, 0.5)',
                          'rgba(75, 192, 192, 0.5)',
                          'rgba(153, 102, 255, 0.5)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}