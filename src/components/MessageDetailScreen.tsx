import { ArrowLeft, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Message } from '../types';

interface MessageDetailScreenProps {
  message: Message;
  onBack: () => void;
}

export function MessageDetailScreen({ message, onBack }: MessageDetailScreenProps) {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'agent', text: message.preview },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    const newUserMessage = { sender: 'user', text: userMessage };
    const newAgentMessage = { sender: 'agent', text: 'Feature coming soon: Messaging functionality.' };

    setChatHistory((prev) => [...prev, newUserMessage, newAgentMessage]);
    setUserMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center gap-3 shadow-md z-10">
        <button
          onClick={onBack}
          className="p-1 hover:bg-blue-700 transition-colors rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{message.agent}</h1> {/* Larger and bolded name */}
          <p className="text-2xl font-bold">{message.house.address}</p> {/* Slightly larger address */}
        </div>
      </div>

      {/* Chat Content */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 flex flex-col"
      >
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${
              chat.sender === 'user'
                ? 'bg-blue-600 text-white ml-auto rounded-br-none' // User: Blue, Right aligned
                : 'bg-white text-gray-800 mr-auto border border-gray-200 rounded-bl-none' // Agent: White, Left aligned
            }`}
          >
            <p className="break-words">{chat.text}</p>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 p-3 bg-gray-100 border-transparent focus:bg-white border border-gray-200 rounded-full focus:border-blue-500 focus:outline-none transition-all px-4"
          />
          <button
            onClick={handleSendMessage}
            disabled={!userMessage.trim()}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}