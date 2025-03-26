import React from 'react';

interface FilterProps {
  filters: {
    priceRange: [number, number];
    sortBy: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    priceRange: [number, number];
    sortBy: string;
  }>>;
}

const ProductFilter: React.FC<FilterProps> = ({ filters, setFilters }) => {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: [value, Math.max(value, prev.priceRange[1])]
    }));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: [Math.min(prev.priceRange[0], value), value]
    }));
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Price Range</label>
            <div className="mt-2 space-y-2">
              <div>
                <label className="text-xs text-gray-500">Min Price ($)</label>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={filters.priceRange[0]}
                  onChange={handleMinPriceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600">${filters.priceRange[0]}</span>
              </div>
              <div>
                <label className="text-xs text-gray-500">Max Price ($)</label>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={filters.priceRange[1]}
                  onChange={handleMaxPriceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600">${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;