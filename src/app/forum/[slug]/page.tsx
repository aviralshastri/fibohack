'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from "@/components/Layout/Layout";
import { AvatarIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

interface SubReply {
  id: string;
  content: string;
  name: string;
}

interface Reply {
  id: string;
  content: string;
  name: string;
  'Sub-replies'?: SubReply[];
}

interface Question {
  title: string;
  description: string;
  id: string;
}

export default function QuestionDetailsPage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  
  const [newReplyContent, setNewReplyContent] = useState('');
  const [subReplyContent, setSubReplyContent] = useState('');
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null); // To track the reply to which the user is replying

  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    if (!slug) return;

    const fetchQuestionAndReplies = async () => {
      try {
        const [questionsResponse, repliesResponse] = await Promise.all([
          fetch('/forum/questions.json'),
          fetch('/forum/replies.json')
        ]);

        if (!questionsResponse.ok || !repliesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const questionsData: Question[] = await questionsResponse.json();
        const repliesData = await repliesResponse.json();

        const questionData = questionsData.find(q => q.id === slug);
        if (!questionData) {
          throw new Error('Question not found');
        }

        setQuestion(questionData);

        const questionReplies = repliesData[slug] || [];
        setReplies(questionReplies);
      } catch (err) {
        console.error('Error loading question details:', err);
        setError('Failed to load question details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionAndReplies();
  }, [slug]);

  const toggleSubReplies = (replyId: string) => {
    setExpandedReplies(prev => {
      const updated = new Set(prev);
      if (updated.has(replyId)) {
        updated.delete(replyId);
      } else {
        updated.add(replyId);
      }
      return updated;
    });
  };

  const handleAddReply = () => {
    if (newReplyContent.trim()) {
      const newReply: Reply = {
        id: `reply${replies.length + 1}`,
        content: newReplyContent,
        name: "You",
      };
      setReplies(prev => [...prev, newReply]);
      setNewReplyContent('');
    }
  };

  const handleAddSubReply = (replyId: string) => {
    if (subReplyContent.trim()) {
      setReplies(prevReplies =>
        prevReplies.map(reply => {
          if (reply.id === replyId) {
            const newSubReply: SubReply = {
              id: `subreply${reply['Sub-replies'] ? reply['Sub-replies'].length + 1 : 1}`,
              content: subReplyContent,
              name: "You",
            };

            return {
              ...reply,
              'Sub-replies': [...(reply['Sub-replies'] || []), newSubReply],
            };
          }
          return reply;
        })
      );
      setSubReplyContent('');
      setActiveReplyId(null);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Loading question details...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {question && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{question.title}</h1>
            <p className="text-gray-600">{question.description}</p>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add a Reply</h2>
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your reply here..."
            value={newReplyContent}
            onChange={(e) => setNewReplyContent(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleAddReply}
          >
            Add Reply
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Replies</h2>
          {replies.length > 0 ? (
            <ul>
              {replies.map(reply => (
                <li key={reply.id} className="mb-4">
                  <div className="flex items-start mb-2">
                    <AvatarIcon className="w-10 h-10 rounded-full mr-4" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{reply.name}</p>
                      <p className="text-gray-600">{reply.content}</p>
                      {activeReplyId === reply.id ? (
                        <>
                          <textarea
                            className="w-full border border-gray-300 p-2 rounded mt-2"
                            placeholder={`Reply to ${reply.name}...`}
                            value={subReplyContent}
                            onChange={(e) => setSubReplyContent(e.target.value)}
                          />
                          <button
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => handleAddSubReply(reply.id)}
                          >
                            Add Sub-reply
                          </button>
                        </>
                      ) : (
                        <button
                          className="mt-2 px-4 py-2 bg-gray-300 text-black rounded"
                          onClick={() => setActiveReplyId(reply.id)}
                        >
                          Reply
                        </button>
                      )}

                      {reply['Sub-replies'] && reply['Sub-replies'].length > 0 && (
                        <button
                          className="mt-2 text-blue-600 flex items-center"
                          onClick={() => toggleSubReplies(reply.id)}
                        >
                          {expandedReplies.has(reply.id) ? (
                            <>
                              <ChevronUpIcon className="w-5 h-5 mr-2" />
                              Hide replies
                            </>
                          ) : (
                            <>
                              <ChevronDownIcon className="w-5 h-5 mr-2" />
                              Show replies
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {expandedReplies.has(reply.id) && reply['Sub-replies'] && (
                    <ul className="ml-12 mt-2">
                      {reply['Sub-replies'].map(subreply => (
                        <li key={subreply.id} className="flex items-start mb-2">
                          <AvatarIcon className="w-8 h-8 rounded-full mr-3" />
                          <div className="text-gray-500">
                            <p className="font-semibold">{subreply.name}</p>
                            <p>{subreply.content}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No replies yet.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
