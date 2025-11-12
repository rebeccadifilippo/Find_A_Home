import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { SlidersHorizontal, Bed, Bath, Maximize } from 'lucide-react';
import { House } from '../types';

interface HomeScreenProps {
  houses: House[];
  onSwipeRight: (house: House) => void;
  onSwipeLeft: (house: House) => void;
}

export function HomeScreen({ houses, onSwipeRight, onSwipeLeft }: HomeScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      // Swiped right
      setHistory((prev) => [...prev, currentIndex]);
      onSwipeRight(houses[currentIndex]);
      setCurrentIndex((prev) => Math.min(prev + 1, houses.length - 1));
    } else if (info.offset.x < -100) {
      // Swiped left
      setHistory((prev) => [...prev, currentIndex]);
      onSwipeLeft(houses[currentIndex]);
      setCurrentIndex((prev) => Math.min(prev + 1, houses.length - 1));
    }
    x.set(0);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevIndex = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentIndex(prevIndex);
    }
  };

  if (currentIndex >= houses.length) {
    return (
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No more houses to view!</p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const currentHouse = houses[currentIndex];

  return (
    <div className="flex-1 flex flex-col px-5 pt-5 pb-20 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          disabled={history.length === 0}
          className={`flex items-center gap-2 ${
            history.length > 0 ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          ← Back
        </button>

        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 text-gray-700"
        >
          <SlidersHorizontal size={20} />
          <span>Filter</span>
        </button>
      </div>

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Next card preview */}
        {currentIndex < houses.length - 1 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-sm h-[500px] bg-gray-200 rounded-2xl" />
          </div>
        )}

        {/* Current card */}
        <motion.div
          className="absolute w-full max-w-sm h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ x, rotate, opacity }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          <div className="relative h-full">
            <img
              src={currentHouse.image}
              alt={currentHouse.address}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="mb-4">
                <p className="text-blue-600 mb-2">${currentHouse.price.toLocaleString()}</p>
                <p className="text-gray-800">{currentHouse.address}</p>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Bed size={18} />
                  <span>{currentHouse.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Bath size={18} />
                  <span>{currentHouse.bathrooms} Baths</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Maximize size={18} />
                  <span>{currentHouse.sqft.toLocaleString()} sqft</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{currentHouse.description}</p>

              {/* Message Realtor Button */}
              <button
                onClick={() => alert(`Messaging realtor for ${currentHouse.address}`)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Message Realtor
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="text-center mt-6 text-gray-600">
        Swipe Right: Yes | Swipe Left: No
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-80 p-5 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Filter Homes</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Max Price ($)</label>
                <input type="number" className="w-full border rounded-lg p-2" placeholder="1000000" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Bedrooms</label>
                <input type="number" className="w-full border rounded-lg p-2" placeholder="3" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Bathrooms</label>
                <input type="number" className="w-full border rounded-lg p-2" placeholder="2" />
              </div>
            </div>

            <div className="flex justify-end mt-5 gap-3">
              <button onClick={() => setShowFilter(false)} className="text-gray-600">
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowFilter(false);
                  // TODO: Apply filter logic here
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
