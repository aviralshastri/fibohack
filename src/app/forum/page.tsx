'use client'
import React, { useState, useEffect } from 'react';
import Layout from "@/components/Layout/Layout";
import Link from 'next/link';

interface Question {
  title: string;
  description: string;
  id: string;
}

const QuestionCard: React.FC<Question> = ({ title, description, id }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
    <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link 
      href={`/forum/${id}`}
      className="text-blue-500 hover:text-blue-700 font-medium"
    >
      Read more
    </Link>
  </div>
);

export default function Forum() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/forum/questions.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }
        setQuestions(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading questions:', err);
        setError(`Failed to load questions. Error: ${err.message}`);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Loading questions...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-red-500">{error}</p>
          <p className="mt-4">Please check the browser console for more details.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Community Forum</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((question: Question) => (
            <QuestionCard 
              key={question.id}
              title={question.title}
              description={question.description}
              id={question.id}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}