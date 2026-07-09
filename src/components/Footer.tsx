import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer({ setView }: { setView: (view: string) => void }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 pb-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <span className="text-3xl font-black tracking-tighter">
              WALKIN<span className="text-orange-500 underline decoration-2 underline-offset-4">.</span>
            </span>
            <p className="text-gray-400 text-sm leading-relaxed">
              Redefining street culture, high-performance running, and premium craftsmanship since 2026. Made bold. Born in India.
            </p>
            
            {/* Socials */}
            <div className="flex space-x-4 pt-2">
              <a href="#instagram" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-orange-500 hover:text-black transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#twitter" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-orange-500 hover:text-black transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#facebook" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-orange-500 hover:text-black transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-6">Explore</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => setView('shop')} className="text-gray-400 hover:text-white text-sm transition-colors uppercase">
                  All Sneakers
                </button>
              </li>
              <li>
                <button onClick={() => setView('home')} className="text-gray-400 hover:text-white text-sm transition-colors uppercase">
                  Featured Drops
                </button>
              </li>
              <li>
                <button onClick={() => setView('about')} className="text-gray-400 hover:text-white text-sm transition-colors uppercase">
                  Our Legacy
                </button>
              </li>
              <li>
                <button onClick={() => setView('contact')} className="text-gray-400 hover:text-white text-sm transition-colors uppercase">
                  Store Locator
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-500 shrink-0" />
                <span>104, Brigade Road, Ashok Nagar, Bengaluru, Karnataka 560001, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-orange-500 shrink-0" />
                <span>+91 80 4912 3456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-orange-500 shrink-0" />
                <span>support@walkinsneakers.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-6">Newsletter</h3>
            <p className="text-gray-400 text-xs mb-4 leading-relaxed">
              Sign up for early access to limited edition drops, secret sales, and community meetups.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 text-sm py-3 px-4 pr-12 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-orange-500 hover:bg-orange-600 text-black p-1.5 rounded-md transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </form>
            
            {subscribed && (
              <p className="text-orange-500 text-xs mt-2 font-semibold">
                ✓ Welcome to the inner circle! Check your inbox soon.
              </p>
            )}
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Walkin Sneakers India. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-300">Terms of Service</a>
            <a href="#shipping" className="hover:text-gray-300">Shipping & Returns</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
