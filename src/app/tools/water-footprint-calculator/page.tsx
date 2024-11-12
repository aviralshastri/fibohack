"use client";
import React, { useState } from "react";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import { ArrowRight, Droplet } from 'lucide-react';

const items = {
  'Pork': { water: 6000, image: 'https://via.placeholder.com/150?text=Pork' },
  'Chicken': { water: 4300, image: '/toolsimages/chicken.jpg' },
  'Lamb': { water: 10400, image: 'https://via.placeholder.com/150?text=Lamb' },
  'Milk': { water: 1000, image: '/toolsimages/milk.jpg' },
  'Cheese': { water: 5000, image: 'https://via.placeholder.com/150?text=Cheese' },
  'Eggs': { water: 3300, image: '/toolsimages/egg.jpg' },
  'Fish': { water: 2800, image: '/toolsimages/fish.jpg' },
  'Rice': { water: 2500, image: 'https://via.placeholder.com/150?text=Rice' },
  'Wheat': { water: 1800, image: 'https://via.placeholder.com/150?text=Wheat' },
  'Corn': { water: 1200, image: 'https://via.placeholder.com/150?text=Corn' },
  'Soybeans': { water: 2100, image: 'https://via.placeholder.com/150?text=Soybeans' },
  'Barley': { water: 1200, image: 'https://via.placeholder.com/150?text=Barley' },
  'Potatoes': { water: 290, image: 'https://via.placeholder.com/150?text=Potatoes' },
  'Tomatoes': { water: 180, image: 'https://via.placeholder.com/150?text=Tomatoes' },
  'Apples': { water: 700, image: 'https://via.placeholder.com/150?text=Apples' },
  'Oranges': { water: 560, image: 'https://via.placeholder.com/150?text=Oranges' },
  'Grapes': { water: 560, image: 'https://via.placeholder.com/150?text=Grapes' },
  'Carrots': { water: 560, image: 'https://via.placeholder.com/150?text=Carrots' },
  'Lettuce': { water: 230, image: 'https://via.placeholder.com/150?text=Lettuce' },
  'Cucumbers': { water: 560, image: 'https://via.placeholder.com/150?text=Cucumbers' },
  'Onions': { water: 560, image: 'https://via.placeholder.com/150?text=Onions' },
  'Peas': { water: 1100, image: 'https://via.placeholder.com/150?text=Peas' },
  'Beans': { water: 2100, image: 'https://via.placeholder.com/150?text=Beans' },
  'Peanuts': { water: 4300, image: 'https://via.placeholder.com/150?text=Peanuts' },
  'Almonds': { water: 12000, image: 'https://via.placeholder.com/150?text=Almonds' },
  'Cashews': { water: 8500, image: 'https://via.placeholder.com/150?text=Cashews' },
  'Walnuts': { water: 5500, image: 'https://via.placeholder.com/150?text=Walnuts' },
  'Coffee': { water: 18900, image: 'https://via.placeholder.com/150?text=Coffee' },
  'Tea': { water: 1900, image: 'https://via.placeholder.com/150?text=Tea' },
  'Chocolate': { water: 17200, image: '/toolsimages/chocolate.jpg' },
  'Sugar (beet)': { water: 1500, image: 'https://via.placeholder.com/150?text=Sugar+Beet' },
  'Sugar (cane)': { water: 1500, image: 'https://via.placeholder.com/150?text=Sugar+Cane' },
  'Wine': { water: 560, image: 'https://via.placeholder.com/150?text=Wine' },
  'Beer': { water: 300, image: 'https://via.placeholder.com/150?text=Beer' },
  'Bread': { water: 1300, image: 'https://via.placeholder.com/150?text=Bread' },
  'Pasta': { water: 1800, image: 'https://via.placeholder.com/150?text=Pasta' },
  'Rice noodles': { water: 2000, image: 'https://via.placeholder.com/150?text=Rice+Noodles' },
  'Olive oil': { water: 1000, image: 'https://via.placeholder.com/150?text=Olive+Oil' },
  'Butter': { water: 5000, image: 'https://via.placeholder.com/150?text=Butter' },
  'Yogurt': { water: 1000, image: 'https://via.placeholder.com/150?text=Yogurt' },
  'Burger': { water: 3300, image: 'https://via.placeholder.com/150?text=Burger' },
  'Sandwich': { water: 2300, image: 'https://via.placeholder.com/150?text=Sandwich' },
  'Pizza': { water: 2900, image: 'https://via.placeholder.com/150?text=Pizza' }
};

export default function WaterFootprintCalculator() {
  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");
  const [comparison, setComparison] = useState(null);

  const compareItems = () => {
    if (item1 && item2) {
      const data1 = items[item1];
      const data2 = items[item2];
      const percentageDifference = Math.abs(
        ((data2.water - data1.water) / Math.min(data1.water, data2.water)) * 100
      ).toFixed(2);
      const moreWater = data2.water > data1.water ? item2 : item1;
      const lessWater = data2.water > data1.water ? item1 : item2;

      setComparison({
        item1: { ...data1, name: item1 },
        item2: { ...data2, name: item2 },
        percentageDifference,
        moreWater,
        lessWater,
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Water Footprint Calculator
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ItemSelector
            label="Select Item 1"
            value={item1}
            onChange={(e) => setItem1(e.target.value)}
            items={items}
          />
          <ItemSelector
            label="Select Item 2"
            value={item2}
            onChange={(e) => setItem2(e.target.value)}
            items={items}
          />
        </div>
        <div className="text-center mb-8">
          <button
            onClick={compareItems}
            disabled={!item1 || !item2}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Compare
          </button>
        </div>
        {comparison && <ComparisonResult comparison={comparison} />}
      </div>
    </Layout>
  );
}

function ItemSelector({ label, value, onChange, items }) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{label}</h2>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="">Select Item</option>
        {Object.keys(items).map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {value && (
        <div className="text-center">
          <Image
            src={items[value].image}
            alt={value}
            width={150}
            height={150}
            className="mx-auto mb-4 rounded"
          />
          <p className="text-sm">
            Water Footprint: {items[value].water} liters per kg
          </p>
        </div>
      )}
    </div>
  );
}

const ComparisonResult = ({ comparison }) => {
  const { item1, item2, percentageDifference, moreWater, lessWater } = comparison;

  const WaterFootprint = ({ water, isHigher }) => (
    <div className={`flex items-center ${isHigher ? 'text-red-500' : 'text-green-500'}`}>
      <Droplet size={20} className="mr-2" />
      <span className="font-semibold">{water} L/kg</span>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mt-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Water Footprint Comparison</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col">
          <div
            className={`flex-1 p-6 rounded-lg ${moreWater === item1.name ? 'bg-red-50' : 'bg-green-50'} transition-all duration-300 hover:shadow-md`}
          >
            <h3 className="text-xl font-bold mb-4 text-center">{item1.name}</h3>
            <Image
              src={item1.image}
              alt={item1.name}
              width={150}
              height={150}
              className="mx-auto mb-4 rounded-full border-4 border-white shadow-md"
            />
            <WaterFootprint water={item1.water} isHigher={moreWater === item1.name} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <ArrowRight size={40} className="text-blue-500 mb-2" />
          <span className="text-lg font-semibold text-blue-600">{percentageDifference}%</span>
          <span className="text-sm text-gray-500">difference</span>
        </div>

        <div className="flex-1 flex flex-col">
          <div
            className={`flex-1 p-6 rounded-lg ${moreWater === item2.name ? 'bg-red-50' : 'bg-green-50'} transition-all duration-300 hover:shadow-md`}
          >
            <h3 className="text-xl font-bold mb-4 text-center">{item2.name}</h3>
            <Image
              src={item2.image}
              alt={item2.name}
              width={150}
              height={150}
              className="mx-auto mb-4 rounded-full border-4 border-white shadow-md"
            />
            <WaterFootprint water={item2.water} isHigher={moreWater === item2.name} />
          </div>
        </div>
      </div>
      <p className="text-center mt-8 text-lg text-gray-700">
        <span className="font-semibold">{moreWater}</span> has a{' '}
        <span className="text-red-500 font-bold">higher</span> water footprint than{' '}
        <span className="font-semibold">{lessWater}</span> by{' '}
        <span className="text-blue-600 font-bold">{percentageDifference}%</span>.
      </p>
    </div>
  );
};
