"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Layout from "@/components/Layout/Layout";
import { BotIcon } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/chatbot?message=${encodeURIComponent(input)}`
      );
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, an error occurred while processing your request.(our backend is not currently deployed becuit needs rental servers but in final product our chabot will run 100% optimized and focused to water conservation topics",
          isUser: false,
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <Layout chatbot={false}>
      <div className="flex flex-col pt-10 items-center min-h-screen bg-gray-50 mx-4">
        <span className="text-lg font-semibold mb-2">
          This might not work currently as there is no final backend made but in
          the actual model it will work perfectly.
        </span>
        <div className="flex flex-row mb-8 px-4 py-2 bg-black text-white rounded-2xl space-x-2">
          <BotIcon size={40} color="white" className="hidden md:block" />
          <BotIcon size={35} color="white" className="block md:hidden" />
          <h1 className="text-3xl md:text-4xl font-bold ">
            Jal Saathi Chatbot{" "}
          </h1>
        </div>
        <div className="w-full max-w-2xl bg-black rounded-lg shadow-lg p-6">
          <div className="h-96 overflow-y-auto mb-4 px-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.isUser ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.isUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.isUser ? (
                    <p>{message.text}</p>
                  ) : (
                    <ReactMarkdown
                      components={{
                        h2: ({ node, ...props }) => (
                          <h2
                            className="text-xl font-bold mt-4 mb-2"
                            {...props}
                          />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="text-lg font-semibold mt-3 mb-1"
                            {...props}
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc list-inside my-2"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="list-decimal list-inside my-2"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="mb-1" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="mb-2" {...props} />
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block p-2 rounded-lg bg-gray-200 text-gray-800 py-2">
                  <div className="loader-chat"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow mr-2 p-2 border border-gray-300 rounded"
              placeholder="Type a message..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
              disabled={isLoading || input.trim() === ""}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
