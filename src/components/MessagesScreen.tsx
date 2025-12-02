import { Calendar as CalendarIcon } from 'lucide-react';
import { Message } from '../types';

interface MessagesScreenProps {
  messages: Message[];
  onCalendar: () => void;
  onMessageSelect: (message: Message) => void; // Add this prop for navigation
}

export function MessagesScreen({ messages, onCalendar, onMessageSelect }: MessagesScreenProps) {
  return (
    <div className="flex-1 px-5 pt-5 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-800">Messages</h1>
        <button
          onClick={onCalendar}
          className="flex items-center gap-2 text-blue-600"
        >
          <CalendarIcon size={20} />
          <span>Calendar</span>
        </button>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => onMessageSelect(message)}
            className="bg-white rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600">{message.agent.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  {/* Display house address above the agent's name */}
                  <p className="text-gray-500 text-sm">{message.house.address}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-800">{message.agent}</p>
                    {message.unread && (
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{message.preview}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{message.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
