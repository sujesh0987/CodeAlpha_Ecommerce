import { Product } from '../types';
import { Trash2, ShoppingCart, Heart, ArrowRight, Star } from 'lucide-react';

interface WishlistViewProps {
  wishlist: string[];
  products: Product[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: number, color: string, colorName: string) => void;
  setView: (view: string) => void;
  setSelectedProduct: (product: Product) => void;
}

export default function WishlistView({
  wishlist,
  products,
  onToggleWishlist,
  onAddToCart,
  setView,
  setSelectedProduct,
}: WishlistViewProps) {
  // Filter products in wishlist
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleQuickAddToCart = (product: Product) => {
    // Pick the first available size and color
    const size = product.sizes[0] || 8;
    const color = product.colors[0] || '#FF6B00';
    const colorName = product.colorNames[0] || 'Blaze Orange';
    
    onAddToCart(product, size, color, colorName);
    onToggleWishlist(product.id); // Remove from wishlist on move to cart
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-neutral-900 pb-8 mb-8 text-left">
          <h1 className="text-4xl font-black tracking-tight uppercase flex items-center gap-3">
            <Heart className="text-orange-500 fill-orange-500" size={32} /> WISHLIST GALLERY
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Keep track of limited drops and high-performance sneakers saved for later
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-24 bg-neutral-900/10 border border-dashed border-neutral-900 rounded-3xl space-y-6">
            <Heart size={48} className="text-neutral-700 mx-auto animate-pulse" />
            <div>
              <p className="text-gray-400 text-lg font-black uppercase mb-2">Your wishlist is empty</p>
              <p className="text-gray-600 text-xs max-w-sm mx-auto">
                No items have been saved yet. Browse our catalog and click the heart icon on any shoe card to save it here.
              </p>
            </div>
            <button
              onClick={() => setView('shop')}
              className="bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
            >
              DISCOVER SNEAKERS <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-neutral-900/40 border border-neutral-900 hover:border-orange-500/30 rounded-2xl p-4 flex flex-col justify-between group transition-all duration-300 relative text-left"
              >
                
                {/* Trash button to remove */}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-black/80 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove from Wishlist"
                >
                  <Trash2 size={16} />
                </button>

                {/* Sneaker Image */}
                <div
                  className="bg-black/80 rounded-xl h-44 mb-4 flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(product);
                    setView('details');
                  }}
                >
                  <img src={product.image} alt={product.name} className="max-h-36 object-contain group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>

                {/* Metadata */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-orange-500 font-bold uppercase tracking-widest">{product.category}</span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Star size={10} className="fill-orange-500 text-orange-500 mr-0.5" />
                      <span className="font-bold">{product.rating}</span>
                    </div>
                  </div>
                  <h3
                    onClick={() => {
                      setSelectedProduct(product);
                      setView('details');
                    }}
                    className="font-black text-white tracking-tight text-lg group-hover:text-orange-500 transition-colors truncate cursor-pointer uppercase"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{product.tagline}</p>
                </div>

                {/* Price and Action triggers */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-900">
                  <span className="text-lg font-black text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  
                  <button
                    onClick={() => handleQuickAddToCart(product)}
                    className="bg-orange-500 hover:bg-orange-600 text-black font-black text-xs uppercase px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <ShoppingCart size={12} /> MOVE TO BAG
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
