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

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      // Swiped right
      onSwipeRight(houses[currentIndex]);
      setCurrentIndex((prev) => Math.min(prev + 1, houses.length - 1));
    } else if (info.offset.x < -100) {
      // Swiped left
      onSwipeLeft(houses[currentIndex]);
      setCurrentIndex((prev) => Math.min(prev + 1, houses.length - 1));
    }
    x.set(0);
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
    <div className="flex-1 flex flex-col px-5 pt-5 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="w-10" />
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

              <p className="text-gray-600 text-sm">{currentHouse.description}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="text-center mt-6 text-gray-600">
        Swipe Right: Yes   |   Swipe Left: No
      </div>
    </div>
  );
}
