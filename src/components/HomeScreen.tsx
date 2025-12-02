import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { SlidersHorizontal, Bed, Bath, Maximize } from 'lucide-react';
import { House, Message } from '../types';
import { FilterPage } from './FilterPage';

interface HomeScreenProps {
  houses: House[];
  onSwipeRight: (house: House) => void;
  onSwipeLeft: (house: House) => void;
  onMessageRealtor: (message: Message) => void; // Add onMessageRealtor prop
}

export function HomeScreen({ houses, onSwipeRight, onSwipeLeft, onMessageRealtor }: HomeScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [visibleHouses, setVisibleHouses] = useState(houses);
  const [showFilterPage, setShowFilterPage] = useState(false);

  const [filters, setFilters] = useState({
    maxPrice: 10000000,
    bedrooms: 4,
    bathrooms: 2,
    maxSqft: 10000,
  });

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      // Swiped right
      setHistory((prev) => [...prev, currentIndex]);
      onSwipeRight(visibleHouses[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    } else if (info.offset.x < -100) {
      // Swiped left
      setHistory((prev) => [...prev, currentIndex]);
      onSwipeLeft(visibleHouses[currentIndex]);
      setCurrentIndex(prev => prev + 1);
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

  const applyFilters = () => {
    const newFiltered = houses.filter(h =>
      h.price <= filters.maxPrice &&
      h.bedrooms >= filters.bedrooms &&
      h.bathrooms >= filters.bathrooms &&
      h.sqft <= filters.maxSqft
    );

    setVisibleHouses(newFiltered);
    setCurrentIndex(0);
    setHistory([]);
    setShowFilterPage(false);
  };

  if (showFilterPage) {
    return (
      <FilterPage
        filters={filters}
        setFilters={setFilters}
        onApply={applyFilters}
        onCancel={() => setShowFilterPage(false)}
      />
    );
  }

  if (currentIndex >= visibleHouses.length) {
    return (
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No more houses to view!</p>
          <button
            onClick={() => {
              setCurrentIndex(0); // Reset the index
              setVisibleHouses(houses); // Restore the original list of houses
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const currentHouse = visibleHouses[currentIndex];

  return (
    <div className="flex-1 flex flex-col px-5 pt-5 pb-20 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          disabled={history.length === 0}
          className={`flex items-center gap-2 ${history.length > 0 ? 'text-blue-600' : 'text-gray-400'
            }`}
        >
          ← Back
        </button>

        <button
          onClick={() => setShowFilterPage(true)}
          className="flex items-center gap-2 text-gray-700"
        >
          <SlidersHorizontal size={20} />
          <span>Filter</span>
        </button>
      </div>

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Next card preview */}
        {currentIndex < visibleHouses.length - 1 && (
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
            {/* Swipeable Area */}
            <div className="h-[400px]">
              <img
                src={currentHouse.image}
                alt={currentHouse.address}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
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
              </div>
            </div>

            {/* Message Realtor Button */}
            <div className="absolute bottom-0 w-full p-6">
              <button
                onClick={() => onMessageRealtor()}
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
    </div>
  );
}
