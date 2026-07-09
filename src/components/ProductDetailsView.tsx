import React, { useState, useEffect } from 'react';
import { Product, Review } from '../types';
import { Star, Heart, ShoppingCart, Plus, Minus, ShieldCheck, RefreshCw, Send, HelpCircle } from 'lucide-react';

const sizes = [6, 7, 8, 9, 10, 11];

interface ProductDetailsViewProps {
  product: Product;
  products: Product[];
  setView: (view: string) => void;
  setSelectedProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: number, color: string, colorName: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddReview: (productId: string, review: Review) => void;
}

export default function ProductDetailsView({
  product,
  products,
  setView,
  setSelectedProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onAddReview,
}: ProductDetailsViewProps) {
  // Navigation helper
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMainImage(product.image);
    setSelectedSize(product.sizes[0] || null);
    setSelectedColorIndex(0);
    setQuantity(1);
    // Clear review inputs
    setReviewerName('');
    setReviewRating(5);
    setReviewComment('');
    setReviewSuccessMessage('');
  }, [product]);

  // Image Gallery selection
  const [mainImage, setMainImage] = useState(product.image);
  
  // Color & Size Choice States
  const [selectedSize, setSelectedSize] = useState<number | null>(product.sizes[0] || null);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [cartError, setCartError] = useState<string>('');
  const [cartSuccess, setCartSuccess] = useState<boolean>(false);

  // Review submission states
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState('');

  const selectedColor = product.colors[selectedColorIndex];
  const selectedColorName = product.colorNames[selectedColorIndex];

  // Filter related products (same category, omit self)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Cart operations
  const handleIncreaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCartSubmit = () => {
    if (!selectedSize) {
      setCartError('Please choose a UK shoe size first.');
      return;
    }
    setCartError('');
    onAddToCart(product, selectedSize, selectedColor, selectedColorName);
    
    // Show success banner
    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 3000);
  };

  // Review Submissions
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newReview: Review = {
      id: `rev-gen-${Date.now()}`,
      userName: reviewerName,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString().split('T')[0],
    };

    onAddReview(product.id, newReview);
    
    // Clear and show success message
    setReviewerName('');
    setReviewComment('');
    setReviewRating(5);
    setReviewSuccessMessage('Thank you! Your verified review has been published.');
    setTimeout(() => setReviewSuccessMessage(''), 4000);
  };

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <div className="mb-8">
          <button
            onClick={() => setView('shop')}
            className="text-gray-400 hover:text-orange-500 transition-colors text-xs font-bold uppercase tracking-wider"
          >
            ← Back to All Sneakers
          </button>
        </div>

        {/* Dynamic Cart Success Prompt */}
        {cartSuccess && (
          <div className="mb-6 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-black uppercase text-xs p-4 rounded-xl flex items-center justify-between animate-bounce">
            <span>✓ {product.name} ({selectedColorName}, UK Size {selectedSize}) added to your cart successfully!</span>
            <button onClick={() => setView('cart')} className="underline decoration-black">
              View Cart Bag
            </button>
          </div>
        )}

        {/* Core Detail Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* LEFT: PHOTO GALLERY (5 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Master display */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden h-[380px] sm:h-[480px]">
              
              {/* Highlight Tags */}
              <span className="absolute top-4 left-4 bg-orange-500 text-black text-[9px] font-black uppercase px-2.5 py-1 rounded">
                {product.category} Elite
              </span>

              <img
                src={mainImage}
                alt={product.name}
                className="max-h-[300px] sm:max-h-[380px] object-contain transform hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4">
              {product.images.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(imgUrl)}
                  className={`w-24 h-20 rounded-xl bg-neutral-900 border flex items-center justify-center overflow-hidden p-2 transition-all ${
                    mainImage === imgUrl ? 'border-orange-500 ring-1 ring-orange-500' : 'border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="max-h-full object-contain" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: BUYING TRIGGERS (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Titles */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-orange-500 tracking-wider">
                <span>Walkin Elite Shoes</span>
                <span>•</span>
                <span className="flex items-center">
                  <Star size={12} className="fill-orange-500 text-orange-500 mr-0.5" />
                  {product.rating} ({product.reviewsCount} verified reviews)
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-none text-white">
                {product.name}
              </h1>
              
              <p className="text-gray-400 text-sm italic">{product.tagline}</p>
            </div>

            {/* Price display */}
            <div className="py-4 border-t border-b border-neutral-900 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">MRP (Inclusive of Taxes)</p>
                <p className="text-3xl font-black text-white">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800">
                <p className="text-[10px] text-gray-500 font-bold uppercase">Stock Availability</p>
                <p className={`text-xs font-black uppercase ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out Of Stock'}
                </p>
              </div>
            </div>

            {/* Color Option Chips */}
            <div className="space-y-2">
              <p className="text-xs font-black uppercase text-gray-400 tracking-wider">
                Color Way: <span className="text-white font-bold">{selectedColorName}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((hex, index) => (
                  <button
                    key={hex}
                    onClick={() => setSelectedColorIndex(index)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                      selectedColorIndex === index ? 'ring-2 ring-orange-500 border-white' : 'border-neutral-800'
                    }`}
                    style={{ backgroundColor: hex }}
                  >
                    {selectedColorIndex === index && (
                      <span className={`w-2.5 h-2.5 rounded-full ${hex === '#FFFFFF' ? 'bg-black' : 'bg-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector UK */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-black uppercase text-gray-400 tracking-wider">Select UK Size</span>
                <span className="text-orange-500 font-bold cursor-pointer hover:underline">Sizing Guide</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => {
                  const isAvailable = product.sizes.includes(size);
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-xl font-bold text-sm transition-all border uppercase ${
                        !isAvailable
                          ? 'bg-neutral-950 text-neutral-800 border-neutral-900 cursor-not-allowed line-through'
                          : isSelected
                            ? 'bg-orange-500 text-black border-orange-500 font-black'
                            : 'bg-neutral-900 border-neutral-800 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <p className="text-xs font-black uppercase text-gray-400 tracking-wider">Select Quantity</p>
              <div className="inline-flex items-center bg-neutral-900 border border-neutral-800 rounded-xl p-1">
                <button
                  onClick={handleDecreaseQty}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-20"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center font-black text-sm">{quantity}</span>
                <button
                  onClick={handleIncreaseQty}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-20"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Cart Error Prompt */}
            {cartError && (
              <p className="text-xs text-orange-500 font-bold bg-orange-500/10 border border-orange-500/20 px-3 py-2 rounded-lg">
                ✕ {cartError}
              </p>
            )}

            {/* Adding Actions */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCartSubmit}
                disabled={product.stock === 0}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-800 disabled:text-neutral-500 text-black font-black uppercase text-sm tracking-wider py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3"
              >
                <ShoppingCart size={18} /> {product.stock > 0 ? 'ADD TO CART BAG' : 'OUT OF STOCK'}
              </button>
              
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`px-5 rounded-xl border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'border-orange-500 text-orange-500 bg-orange-500/10'
                    : 'border-neutral-800 text-gray-400 hover:text-white hover:border-gray-500'
                }`}
                title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
              >
                <Heart size={20} className={isWishlisted ? 'fill-orange-500' : ''} />
              </button>
            </div>

            {/* Brand guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-900 text-xs text-gray-400">
              <p className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-orange-500" /> Secure Transit Insurance
              </p>
              <p className="flex items-center gap-2">
                <RefreshCw size={16} className="text-orange-500" /> Cash-on-Delivery Options
              </p>
            </div>

          </div>

        </div>

        {/* SNEAKER STORY / FULL OVERVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 border-t border-neutral-900">
          
          {/* Narrative */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <h2 className="text-2xl font-black uppercase text-white">THE DESIGN STORY</h2>
            <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-3 mt-4">
              <h3 className="text-xs font-black text-orange-500 uppercase tracking-widest">Premium Specifications</h3>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-gray-300">
                <li>• Breathable double-mesh fabric</li>
                <li>• Reinforced TPU heel counter</li>
                <li>• Natural vulcanized rubber soles</li>
                <li>• Shock-absorbing Nitro capsules</li>
                <li>• Contrast custom logo embroidery</li>
                <li>• Indian artisanal design assembly</li>
              </ul>
            </div>
          </div>

          {/* REVIEWS & RATINGS BLOCK */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="text-2xl font-black uppercase text-white">CUSTOMER REVIEWS</h2>
            
            {/* Verified Reviews Stream */}
            <div className="space-y-4 max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
              {product.reviews.length === 0 ? (
                <p className="text-gray-500 text-sm italic">Be the first to leave a review for this sneaker drop!</p>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-900 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-sm text-white">{rev.userName}</p>
                      <p className="text-[10px] text-gray-500">{rev.date}</p>
                    </div>
                    
                    <div className="flex text-orange-500 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < rev.rating ? 'fill-orange-500 text-orange-500' : 'text-neutral-800'}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Write a Review Block */}
            <form onSubmit={handleReviewSubmit} className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-orange-500">Add Verified Review</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Rating Out of 5</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value="4">⭐⭐⭐⭐ (4/5)</option>
                    <option value="3">⭐⭐⭐ (3/5)</option>
                    <option value="2">⭐⭐ (2/5)</option>
                    <option value="1">⭐ (1/5)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Commentary</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details of your experience with these sneakers..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send size={12} /> SUBMIT REVIEW
              </button>

              {reviewSuccessMessage && (
                <p className="text-xs text-green-500 font-bold text-center mt-2">✓ {reviewSuccessMessage}</p>
              )}
            </form>

          </div>

        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="py-12 border-t border-neutral-900">
            <h2 className="text-2xl font-black uppercase text-white mb-8 text-left">
              RELATED <span className="text-orange-500">DROPS</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    setSelectedProduct(rel);
                  }}
                  className="bg-neutral-900 border border-neutral-800 hover:border-orange-500/30 rounded-2xl p-4 flex flex-col justify-between group cursor-pointer text-left transition-all"
                >
                  <div className="bg-black rounded-xl h-40 mb-3 flex items-center justify-center overflow-hidden p-2">
                    <img src={rel.image} alt={rel.name} className="max-h-32 object-contain group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <span className="text-[10px] text-orange-500 font-bold uppercase">{rel.category}</span>
                    <h3 className="font-bold text-white group-hover:text-orange-500 truncate transition-colors text-base">{rel.name}</h3>
                    <p className="text-sm font-black text-white mt-1">₹{rel.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
