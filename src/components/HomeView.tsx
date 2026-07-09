import { Product } from '../types';
import { ArrowRight, Flame, Shield, Truck, RefreshCw, Star } from 'lucide-react';

interface HomeViewProps {
  products: Product[];
  setView: (view: string) => void;
  setSelectedProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: number, color: string, colorName: string) => void;
}

export default function HomeView({
  products,
  setView,
  setSelectedProduct,
  onAddToCart,
}: HomeViewProps) {
  // Get featured products
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  const categories = [
    { name: 'Running', count: 'Nitro cushioned speedwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600' },
    { name: 'Lifestyle', count: 'Effortless street silhouettes', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600' },
    { name: 'Basketball', count: 'Supreme ankle protection & grip', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600' }
  ];

  return (
    <div className="bg-neutral-950 text-white min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-zinc-800">
        
        {/* Background gradient/glows */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-neutral-900/40 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(10,10,10,0.8)_100%)]"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col - Slogans */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest animate-pulse">
                <Flame size={14} /> NEW DROP: PYRO RUNNER VOLT
              </div>
              
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none uppercase">
                WALK <br />YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-amber-400">TALK.</span>
              </h1>
              
              <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
                Experience high-performance mechanics packed inside high-fashion luxury. The new Walkin collection integrates adaptive carbon plating with surgical stitch overlays.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setView('shop')}
                  className="bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-sm tracking-wider px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-3 shadow-lg shadow-orange-500/10"
                >
                  SHOP ALL SNEAKERS <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => {
                    const pyro = products.find(p => p.id === 'walkin-pyro-runner');
                    if (pyro) {
                      setSelectedProduct(pyro);
                      setView('details');
                    }
                  }}
                  className="bg-transparent hover:bg-white/5 border border-neutral-800 text-white font-black uppercase text-sm tracking-wider px-8 py-4 rounded-xl transition-all"
                >
                  EXPLORE HERO DROP
                </button>
              </div>

              {/* Little Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-900 max-w-md">
                <div>
                  <p className="text-3xl font-black text-white">08+</p>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Premium Models</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-orange-500">100%</p>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Indian Crafted</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-white">10K+</p>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Happy Walkers</p>
                </div>
              </div>
            </div>

            {/* Right Col - Floating Shoe Visual */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute w-72 h-72 rounded-full bg-orange-500/20 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 animate-pulse"></div>
              <div className="relative z-10 select-none cursor-pointer group" onClick={() => {
                const pyro = products.find(p => p.id === 'walkin-pyro-runner');
                if (pyro) {
                  setSelectedProduct(pyro);
                  setView('details');
                }
              }}>
                {/* Float animation combined with nice rotation hover */}
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"
                  alt="Walkin Flagship Sneaker"
                  className="w-full max-w-[420px] transform rotate-[-15deg] group-hover:rotate-[-5deg] transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Info Tag */}
                <div className="absolute -bottom-4 left-6 bg-black/90 border border-orange-500/30 px-4 py-3 rounded-xl backdrop-blur-md">
                  <p className="text-xs font-black text-orange-500 uppercase tracking-widest">Walkin Pyro Runner</p>
                  <p className="text-sm font-bold text-white">From ₹4,999</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Brand Value Pillars */}
      <section className="bg-neutral-900/50 py-12 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Free Express Shipping</h4>
                <p className="text-xs text-gray-500">Free delivery across India</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Genuine Indian Craft</h4>
                <p className="text-xs text-gray-500">100% genuine guaranteed</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                <RefreshCw size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm">7-Day Easy Exchange</h4>
                <p className="text-xs text-gray-500">No questions asked return</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                <Star size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Top Customer Reviews</h4>
                <p className="text-xs text-gray-500">4.8 Average rating stars</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              SELECT YOUR <span className="text-orange-500">ARENA</span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm max-w-md mx-auto">
              Precision-tuned silhouettes engineered for distinct terrain and lifestyle goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="group relative h-[360px] rounded-2xl overflow-hidden border border-neutral-900 hover:border-orange-500/40 transition-all duration-500 cursor-pointer"
                onClick={() => setView('shop')}
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 z-10 text-left">
                  <p className="text-xs font-black text-orange-500 uppercase tracking-widest mb-1">Explore Range</p>
                  <h3 className="text-2xl font-black uppercase text-white tracking-tight">{cat.name}</h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">{cat.count}</p>
                  
                  <div className="mt-4 flex items-center gap-2 text-white font-bold text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Discover Collection <ArrowRight size={14} className="text-orange-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Drops (Trending) */}
      <section className="py-20 bg-neutral-900/30 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
                FEATURED <span className="text-orange-500">DROPS</span>
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                The most coveted models driving the current sneaker culture in India.
              </p>
            </div>
            <button
              onClick={() => setView('shop')}
              className="bg-transparent hover:bg-white/5 border border-neutral-800 text-white font-bold uppercase text-xs tracking-wider px-6 py-3 rounded-lg flex items-center gap-2 transition-colors self-start sm:self-auto"
            >
              VIEW FULL SHOP <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 hover:border-orange-500/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  setView('details');
                }}
              >
                {/* Image */}
                <div className="relative bg-black rounded-xl overflow-hidden h-48 mb-4 flex items-center justify-center">
                  <span className="absolute top-2 left-2 bg-orange-500 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full z-10">
                    Hot Drop
                  </span>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-40 object-contain group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Meta details */}
                <div className="space-y-1">
                  <p className="text-xs text-orange-500 font-bold uppercase tracking-wide">{product.category}</p>
                  <h3 className="font-black text-white text-lg tracking-tight group-hover:text-orange-500 transition-colors truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{product.tagline}</p>
                </div>

                {/* Pricing & Add */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-800">
                  <span className="text-lg font-black text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-orange-500 text-xs font-bold uppercase group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    BUY NOW →
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Highlight Promotional Banner */}
      <section className="py-16 bg-black relative overflow-hidden border-t border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-neutral-900 to-black p-8 sm:p-12 rounded-3xl border border-neutral-800 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-left">
              <span className="text-orange-500 font-bold text-xs uppercase tracking-widest">Exclusive Season Coupon</span>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">GET FLAT 20% OFF ON SNEAKERS</h3>
              <p className="text-gray-400 text-sm">
                Apply the coupon <span className="text-orange-500 font-black">WALKIN20</span> during checkout. Available for purchases above ₹3,000 across India.
              </p>
            </div>
            <div className="shrink-0 flex gap-4">
              <button
                onClick={() => setView('shop')}
                className="bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-xs tracking-wider px-8 py-4 rounded-xl transition-all"
              >
                APPLY & SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. High-support Customer Reviews Section */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              WALKIN <span className="text-orange-500">VOICES</span>
            </h2>
            <p className="text-gray-400 mt-2 text-sm max-w-md mx-auto">
              Real opinions from athletes, collectors, and street stylists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900/40 p-8 rounded-2xl border border-neutral-900 space-y-4 text-left">
              <div className="flex text-orange-500 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-orange-500 text-orange-500" />)}
              </div>
              <p className="text-gray-300 text-sm italic">
                "The carbon plate tech inside Walkin Carbon Stealth is unbelievable for Indian running tracks. High durability and supreme responsiveness. Shaved minutes of my PB!"
              </p>
              <div>
                <p className="font-bold text-sm">Rohan S. Malhotra</p>
                <p className="text-xs text-orange-500">Professional Athlete, Delhi</p>
              </div>
            </div>

            <div className="bg-neutral-900/40 p-8 rounded-2xl border border-neutral-900 space-y-4 text-left">
              <div className="flex text-orange-500 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-orange-500 text-orange-500" />)}
              </div>
              <p className="text-gray-300 text-sm italic">
                "Finding UK Size 11 that fits correctly is tough in India. Walkin sizing chart is perfect. Built like premium high-street items but half the cost. Beautiful orange highlight stitching."
              </p>
              <div>
                <p className="font-bold text-sm">Jaspreet Singh</p>
                <p className="text-xs text-orange-500">Sneaker Enthusiast, Chandigarh</p>
              </div>
            </div>

            <div className="bg-neutral-900/40 p-8 rounded-2xl border border-neutral-900 space-y-4 text-left">
              <div className="flex text-orange-500 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-orange-500 text-orange-500" />)}
              </div>
              <p className="text-gray-300 text-sm italic">
                "The delivery arrived in Bengaluru in just 2 days. The unboxing was amazing — premium shoebox, details, extra orange laces. The Zenith Court silhouette is legendary."
              </p>
              <div>
                <p className="font-bold text-sm">Aditi Rao</p>
                <p className="text-xs text-orange-500">Street Stylist, Bengaluru</p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
