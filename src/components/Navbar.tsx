import React, { useState } from 'react';
import { ShoppingBag, Heart, User, Search, Menu, X, ShieldAlert, LogOut } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  cartCount: number;
  wishlistCount: number;
  user: UserType | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  onSearch: (query: string) => void;
}

export default function Navbar({
  currentView,
  setView,
  cartCount,
  wishlistCount,
  user,
  onLogout,
  onOpenAuth,
  onSearch,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setView('shop');
  };

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  return (
    <nav className="bg-[#0a0a0a]/95 text-white sticky top-0 z-50 border-b border-zinc-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView('home'); setIsMobileMenuOpen(false); }}>
            <span className="text-2xl font-black tracking-tighter text-white">
              WALKIN<span className="text-orange-500 underline decoration-2 underline-offset-4">.</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => setView(link.view)}
                className={`text-sm font-medium tracking-wide uppercase transition-colors relative py-2 ${
                  currentView === link.view
                    ? 'text-orange-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {currentView === link.view && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500"></span>
                )}
              </button>
            ))}
          </div>

          {/* Right Section Actions */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Expanded Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search premium sneakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`bg-neutral-900 border border-neutral-800 text-sm rounded-full py-1.5 px-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all ${
                  isSearchExpanded ? 'w-64 opacity-100' : 'w-48'
                }`}
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => setTimeout(() => setIsSearchExpanded(false), 200)}
              />
              <button type="submit" className="absolute right-3 text-gray-400 hover:text-orange-500 transition-colors">
                <Search size={16} />
              </button>
            </form>

            {/* Wishlist */}
            <button
              onClick={() => setView('wishlist')}
              className="relative p-2 text-gray-300 hover:text-orange-500 transition-colors"
              title="Wishlist"
            >
              <Heart size={20} className={currentView === 'wishlist' ? 'fill-orange-500 text-orange-500' : ''} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-black font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setView('cart')}
              className="relative p-2 text-gray-300 hover:text-orange-500 transition-colors"
              title="Cart"
            >
              <ShoppingBag size={20} className={currentView === 'cart' ? 'fill-orange-500 text-orange-500' : ''} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-black font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Admin Panel Trigger */}
            {user ? (
              <div className="flex items-center gap-3 bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">
                <span className="text-xs font-semibold max-w-[120px] truncate">
                  {user.fullName}
                </span>
                {user.isAdmin && (
                  <button
                    onClick={() => setView('admin')}
                    className="bg-orange-500 text-black font-bold text-[10px] uppercase px-2 py-0.5 rounded flex items-center gap-1 hover:bg-orange-600 transition-colors"
                    title="Admin Panel"
                  >
                    <ShieldAlert size={10} /> Admin
                  </button>
                )}
                <button
                  onClick={onLogout}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold uppercase text-xs tracking-wider px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <User size={14} /> Login
              </button>
            )}

          </div>

          {/* Mobile Hamburguer & Quick actions */}
          <div className="md:hidden flex items-center space-x-4">
            
            {/* Quick Cart */}
            <button
              onClick={() => setView('cart')}
              className="relative p-2 text-gray-300"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-black font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-zinc-800 px-4 py-6 space-y-4">
          
          {/* Quick search */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search Walkin sneakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-sm rounded-lg py-2 px-4 pr-10 text-white placeholder-gray-500 focus:outline-none w-full"
            />
            <button type="submit" className="absolute right-3 text-gray-400">
              <Search size={18} />
            </button>
          </form>

          {/* Nav links */}
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  setView(link.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-base font-bold uppercase py-2 border-b border-neutral-900 transition-colors ${
                  currentView === link.view ? 'text-orange-500' : 'text-gray-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Quick actions for Wishlist & Auth */}
          <div className="flex flex-col space-y-3 pt-3">
            <button
              onClick={() => {
                setView('wishlist');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 text-sm text-gray-300 hover:text-white"
            >
              <Heart size={18} /> Wishlist ({wishlistCount})
            </button>

            {user ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-400">Logged in as</p>
                    <p className="text-sm font-semibold text-white">{user.fullName}</p>
                  </div>
                  {user.isAdmin && (
                    <button
                      onClick={() => {
                        setView('admin');
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded"
                    >
                      Admin Panel
                    </button>
                  )}
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-sm bg-red-950/40 text-red-400 hover:bg-red-950 rounded-lg border border-red-900/30 font-bold"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-orange-500 text-black font-bold uppercase rounded-lg tracking-wider text-sm flex justify-center items-center gap-2"
              >
                <User size={16} /> LOGIN / SIGNUP
              </button>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}
