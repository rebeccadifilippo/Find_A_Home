import { GitCompare, Bed, Bath } from 'lucide-react';
import { House } from '../types';

interface FavoritesScreenProps {
  favorites: House[];
  onCompare: () => void;
}

export function FavoritesScreen({ favorites, onCompare }: FavoritesScreenProps) {
  return (
    <div className="flex-1 px-5 pt-5 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-800">My Favorites</h1>
        <button
          onClick={onCompare}
          disabled={favorites.length < 2}
          className={`flex items-center gap-2 ${
            favorites.length >= 2 ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <GitCompare size={20} />
          <span>Compare</span>
        </button>
      </div>

      {/* Favorites Grid */}
      {favorites.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No favorites yet. Start swiping!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favorites.map((house) => (
            <div key={house.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={house.image}
                alt={house.address}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <p className="text-blue-600 mb-1">${(house.price / 1000).toFixed(0)}K</p>
                <p className="text-gray-700 text-sm mb-2 line-clamp-2">{house.address}</p>
                <div className="flex gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed size={14} />
                    <span>{house.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath size={14} />
                    <span>{house.bathrooms}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
