import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface FilterPageProps {
  filters: {
    maxPrice: number;
    bedrooms: number;
    bathrooms: number;
    maxSqft: number;
  };
  setFilters: (filters: {
    maxPrice: number;
    bedrooms: number;
    bathrooms: number;
    maxSqft: number;
  }) => void;
  onApply: () => void;
  onCancel: () => void;
}

export function FilterPage({ filters, setFilters, onApply, onCancel }: FilterPageProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    setFilters(localFilters);
    onApply();
  };

  const handleClear = () => {
    setLocalFilters({
      maxPrice: 500000,
      bedrooms: 0,
      bathrooms: 0,
      maxSqft: 0,
    });
  };

  const handleNumberChange = (key: string, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value === '' ? 0 : Number(value),
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans">
      {/* HEADER */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-1 hover:bg-blue-700 transition-colors rounded-full"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold tracking-wide">Filter Homes</h1>
        </div>
        <button
          onClick={handleClear}
          className="text-sm px-3 py-1 hover:bg-blue-700 transition-colors border border-blue-400 rounded-sm"
        >
          Clear All
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 space-y-6">
        {/* MAX PRICE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Price ($)</label>
          <div className="relative">
            <select
              value={localFilters.maxPrice || 500000}
              onChange={(e) => handleNumberChange('maxPrice', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-0 bg-white text-gray-800 placeholder-gray-400 transition-colors"
            >
              {[...Array(20)].map((_, index) => {
                const price = 500000 + index * 50000;
                return (
                  <option key={price} value={price}>
                    ${price.toLocaleString()}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* BEDROOMS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setLocalFilters({ ...localFilters, bedrooms: num })}
                className={`flex-1 py-2 border rounded-lg text-sm font-medium ${
                  localFilters.bedrooms === num
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                {num === 0 ? 'Any' : `${num}+`}
              </button>
            ))}
          </div>
        </div>

        {/* BATHROOMS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setLocalFilters({ ...localFilters, bathrooms: num })}
                className={`flex-1 py-2 border rounded-lg text-sm font-medium ${
                  localFilters.bathrooms === num
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                {num === 0 ? 'Any' : `${num}+`}
              </button>
            ))}
          </div>
        </div>

        {/* MAX SQUARE FEET */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Square Feet</label>
          <div className="relative">
            <input
              type="number"
              value={localFilters.maxSqft || ''}
              onChange={(e) => handleNumberChange('maxSqft', e.target.value)}
              placeholder="Any Size"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-0 bg-white text-gray-800 placeholder-gray-400 transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">sqft</span>
          </div>
        </div>

        {/* APPLY FILTERS BUTTON */}
        <div>
          <button
            onClick={handleApply}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}