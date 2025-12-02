import { useState } from 'react';
import { X, MapPin, Clock, Bed, Bath } from 'lucide-react';
import { OpenHouse } from '../types';

interface CalendarScreenProps {
  openHouses: OpenHouse[];
  onClose: () => void; // Callback to navigate back to Open Houses page
}

export function CalendarScreen({ openHouses, onClose }: CalendarScreenProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddToCalendar = () => {
    setSuccessMessage('Added to Outlook Calendar Successfully');
    setTimeout(() => {
      setSuccessMessage(null);
      onClose(); // Navigate back to the Open Houses page
    }, 2000); // Show the message for 2 seconds
  };

  return (
    <div className="flex-1 px-5 pt-5 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={onClose}>
          <X size={24} className="text-gray-700" />
        </button>
        <h1 className="text-gray-800">Open Houses</h1>
        <div className="w-6" />
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-md">
          {successMessage}
        </div>
      )}

      {/* Open Houses List */}
      <div className="space-y-4">
        {openHouses.map((openHouse) => (
          <div
            key={openHouse.id}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-4 p-4">
              <img
                src={openHouse.house.image}
                alt={openHouse.house.address}
                className="w-28 h-28 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="text-blue-600 mb-1">
                  ${(openHouse.house.price / 1000).toFixed(0)}K
                </p>
                <div className="flex items-start gap-1 mb-2">
                  <MapPin size={14} className="text-gray-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-sm line-clamp-2">
                    {openHouse.house.address}
                  </p>
                </div>
                <div className="flex gap-3 mb-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed size={12} />
                    <span>{openHouse.house.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath size={12} />
                    <span>{openHouse.house.bathrooms}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock size={12} />
                  <span>{openHouse.date}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{openHouse.time}</p>
              </div>
            </div>
            <div className="px-4 pb-4">
              <button
                onClick={handleAddToCalendar}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add to Calendar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
