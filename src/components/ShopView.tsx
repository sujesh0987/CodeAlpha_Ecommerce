import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, SlidersHorizontal, Heart, RotateCcw, Star, Grid3X3, Eye } from 'lucide-react';

interface ShopViewProps {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setView: (view: string) => void;
  setSelectedProduct: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export default function ShopView({
  products,
  searchQuery,
  setSearchQuery,
  setView,
  setSelectedProduct,
  wishlist,
  onToggleWishlist,
}: ShopViewProps) {
  // Local state for filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(8000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Available options
  const categories = ['All', 'Running', 'Lifestyle', 'Basketball', 'Training'];
  const sizes = [6, 7, 8, 9, 10, 11];
  const colors = [
    { hex: '#FF6B00', name: 'Blaze Orange' },
    { hex: '#1A1A1A', name: 'Stealth Black' },
    { hex: '#FFFFFF', name: 'Hyper White' }
  ];

  // Reset filters handler
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSize(null);
    setSelectedColor(null);
    setMaxPrice(8000);
    setSearchQuery('');
    setSortBy('featured');
  };

  // Filtered and Sorted Products calculation
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search filter
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory;

        // Size filter
        const matchesSize =
          selectedSize === null || product.sizes.includes(selectedSize);

        // Color filter
        const matchesColor =
          selectedColor === null || product.colors.includes(selectedColor);

        // Price filter
        const matchesPrice = product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default or featured - custom sorting
        return b.rating * b.reviewsCount - a.rating * a.reviewsCount;
      });
  }, [products, searchQuery, selectedCategory, selectedSize, selectedColor, maxPrice, sortBy]);

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-neutral-900 pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase">
              WALKIN <span className="text-orange-500">CATALOG</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Showing {filteredProducts.length} high-fidelity premium sneakers
            </p>
          </div>

          {/* Quick Filters / Sorters */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Search Input Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 text-sm py-2 px-4 pl-10 rounded-xl focus:outline-none focus:border-orange-500 text-white w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-sm py-2 px-4 rounded-xl text-gray-300 focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="featured">Best Matches</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-2 bg-orange-500 text-black font-bold uppercase text-xs px-4 py-2 rounded-xl"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR FILTERS (Desktop) */}
          <aside className={`lg:col-span-3 space-y-8 bg-neutral-900/50 p-6 rounded-2xl border border-neutral-900 md:block ${
            showMobileFilters ? 'block' : 'hidden md:block'
          }`}>
            
            {/* Header / Reset */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <h2 className="font-black text-sm uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-orange-500" /> Filters
              </h2>
              <button
                onClick={handleResetFilters}
                className="text-gray-500 hover:text-orange-500 transition-colors text-xs font-bold uppercase flex items-center gap-1.5"
              >
                <RotateCcw size={12} /> Clear
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Categories</h3>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-sm py-1.5 px-3 rounded-lg transition-colors font-semibold flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-orange-500 text-black font-black'
                        : 'text-gray-400 hover:text-white hover:bg-neutral-800/40'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <span className="w-1.5 h-1.5 bg-black rounded-full"></span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Max Price</h3>
                <span className="text-xs font-bold text-orange-500">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="2499"
                max="8000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-600 font-bold">
                <span>₹2,499</span>
                <span>₹8,000</span>
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">UK Shoe Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                      selectedSize === size
                        ? 'bg-orange-500 text-black border-orange-500 font-black'
                        : 'bg-transparent border-neutral-800 text-gray-400 hover:text-white hover:border-gray-500'
                    }`}
                  >
                    UK {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Color</h3>
              <div className="flex gap-3">
                {colors.map((color) => {
                  const isActive = selectedColor === color.hex;
                  return (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(selectedColor === color.hex ? null : color.hex)}
                      title={color.name}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                        isActive ? 'ring-2 ring-orange-500 border-white' : 'border-neutral-800'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isActive && (
                        <span className={`w-2 h-2 rounded-full ${
                          color.hex === '#FFFFFF' ? 'bg-black' : 'bg-white'
                        }`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </aside>

          {/* SNEAKERS GRID */}
          <main className="lg:col-span-9">
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-neutral-900/10 border border-dashed border-neutral-900 rounded-3xl">
                <p className="text-gray-400 text-lg font-bold uppercase mb-2">No matching kicks found</p>
                <p className="text-gray-600 text-sm max-w-sm mx-auto mb-6">
                  Try clearing your filter criteria, altering the price scope, or searching for other sneaker keywords.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase px-6 py-3 rounded-xl transition-all"
                >
                  RESET CATALOG FILTER
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-neutral-900/40 border border-neutral-900 hover:border-orange-500/30 rounded-2xl p-4 flex flex-col justify-between group transition-all duration-300 relative"
                    >
                      
                      {/* Wishlist Heart Icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                        }}
                        className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-black/80 flex items-center justify-center hover:bg-orange-500 hover:text-black text-gray-400 transition-colors"
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        <Heart
                          size={16}
                          className={isWishlisted ? "fill-orange-500 text-orange-500" : ""}
                        />
                      </button>

                      {/* Photo wrapper */}
                      <div
                        className="bg-black/80 rounded-xl h-44 mb-4 flex items-center justify-center overflow-hidden relative cursor-pointer"
                        onClick={() => {
                          setSelectedProduct(product);
                          setView('details');
                        }}
                      >
                        {/* Highlights badge */}
                        {product.isBestSeller && (
                          <span className="absolute top-2 left-2 bg-orange-500 text-black text-[8px] font-black uppercase px-2 py-0.5 rounded">
                            BEST SELLER
                          </span>
                        )}
                        {!product.isBestSeller && product.isNewArrival && (
                          <span className="absolute top-2 left-2 bg-white text-black text-[8px] font-black uppercase px-2 py-0.5 rounded">
                            NEW ARRIVAL
                          </span>
                        )}

                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-36 object-contain group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Hover Quick view indicator overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                          <span className="bg-orange-500 text-black font-black uppercase text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1">
                            <Eye size={12} /> DETAILS
                          </span>
                        </div>
                      </div>

                      {/* Sneaker meta data */}
                      <div
                        className="space-y-1 text-left cursor-pointer"
                        onClick={() => {
                          setSelectedProduct(product);
                          setView('details');
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-orange-500 font-bold uppercase tracking-widest">{product.category}</span>
                          <div className="flex items-center text-xs text-gray-500">
                            <Star size={10} className="fill-orange-500 text-orange-500 mr-0.5" />
                            <span className="font-bold">{product.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-black text-white tracking-tight text-lg group-hover:text-orange-500 transition-colors truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-1">{product.tagline}</p>
                      </div>

                      {/* Footer buying action */}
                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-900">
                        <span className="text-lg font-black text-white">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setView('details');
                          }}
                          className="bg-neutral-800 text-gray-300 font-bold text-xs uppercase px-4 py-2 rounded-lg group-hover:bg-orange-500 group-hover:text-black transition-colors"
                        >
                          BUY NOW
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}
