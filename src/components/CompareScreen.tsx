import { X, Bed, Bath, Maximize } from 'lucide-react';
import { House } from '../types';

interface CompareScreenProps {
  houses: House[];
  onClose: () => void;
}

export function CompareScreen({ houses, onClose }: CompareScreenProps) {
  const [house1, house2] = houses.slice(0, 2);

  return (
    <div className="flex-1 flex flex-col px-5 pt-5 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={onClose}>
          <X size={24} className="text-gray-700" />
        </button>
        <h1 className="text-gray-800">Compare Homes</h1>
        <div className="w-6" />
      </div>

      {/* Comparison Grid */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        {/* House 1 */}
        <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src={house1.image}
            alt={house1.address}
            className="w-full h-32 object-cover"
          />
          <div className="flex-1 p-3 flex flex-col gap-3">
            <div>
              <p className="text-blue-600 mb-1">${(house1.price / 1000).toFixed(0)}K</p>
              <p className="text-gray-700 text-xs line-clamp-3">{house1.address}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Bed size={14} />
                <span>{house1.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Bath size={14} />
                <span>{house1.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Maximize size={14} />
                <span>{house1.sqft.toLocaleString()} sqft</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 line-clamp-4">{house1.description}</p>
          </div>
        </div>

        {/* House 2 */}
        <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src={house2.image}
            alt={house2.address}
            className="w-full h-32 object-cover"
          />
          <div className="flex-1 p-3 flex flex-col gap-3">
            <div>
              <p className="text-blue-600 mb-1">${(house2.price / 1000).toFixed(0)}K</p>
              <p className="text-gray-700 text-xs line-clamp-3">{house2.address}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Bed size={14} />
                <span>{house2.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Bath size={14} />
                <span>{house2.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Maximize size={14} />
                <span>{house2.sqft.toLocaleString()} sqft</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 line-clamp-4">{house2.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
