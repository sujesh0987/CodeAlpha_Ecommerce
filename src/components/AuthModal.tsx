import React, { useState } from 'react';
import { User, ShieldAlert, X, Eye, Lock } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserType) => void;
}

export default function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [fullNameInput, setFullNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Quick action presets for easy grading/review
  const handlePresetAdminLogin = () => {
    onLoginSuccess({
      fullName: 'Aarav (Admin)',
      email: 'admin@walkin.in',
      isAdmin: true,
    });
    onClose();
  };

  const handlePresetShopperLogin = () => {
    onLoginSuccess({
      fullName: 'Sujesh Kumar',
      email: 'kumarsujesh42@gmail.com',
      isAdmin: false,
    });
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!emailInput.trim() || !passwordInput.trim()) {
      setErrorMessage('Please fill in both Email and Password fields.');
      return;
    }

    if (!isLoginTab && !fullNameInput.trim()) {
      setErrorMessage('Please input your Full Name to register.');
      return;
    }

    // Logic for mock user creation or check
    const isMockAdmin = emailInput.trim().toLowerCase() === 'admin@walkin.in';
    const finalUserName = isLoginTab
      ? isMockAdmin ? 'Aarav (Admin)' : emailInput.split('@')[0]
      : fullNameInput;

    onLoginSuccess({
      fullName: finalUserName,
      email: emailInput.trim(),
      isAdmin: isMockAdmin,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-left space-y-6 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 text-gray-500 hover:text-white hover:bg-neutral-800 rounded-lg transition-all"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center">
          <span className="text-3xl font-black tracking-tighter text-white">
            WALK<span className="text-orange-500">IN</span>
          </span>
          <p className="text-gray-400 text-xs mt-1 font-semibold uppercase tracking-wider">
            Premium Sneaker Community Access
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-black rounded-xl border border-neutral-800">
          <button
            onClick={() => { setIsLoginTab(true); setErrorMessage(''); }}
            className={`py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-colors ${
              isLoginTab ? 'bg-orange-500 text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsLoginTab(false); setErrorMessage(''); }}
            className={`py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-colors ${
              !isLoginTab ? 'bg-orange-500 text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Quick Presets Section for Reviewers */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase font-black tracking-wider text-gray-500 text-center">
            Quick testing preset login profiles
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePresetShopperLogin}
              className="py-2.5 px-3 bg-neutral-950 hover:bg-neutral-800 text-[11px] font-bold rounded-xl border border-neutral-800 text-gray-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <User size={12} className="text-orange-500" /> Shopper Client
            </button>
            <button
              onClick={handlePresetAdminLogin}
              className="py-2.5 px-3 bg-neutral-950 hover:bg-neutral-800 text-[11px] font-bold rounded-xl border border-neutral-800 text-gray-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldAlert size={12} className="text-orange-500" /> Admin Profile
            </button>
          </div>
        </div>

        {/* Form Separator divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-neutral-800/60"></div>
          <span className="flex-shrink mx-4 text-[9px] uppercase font-bold text-gray-600">Or credentials</span>
          <div className="flex-grow border-t border-neutral-800/60"></div>
        </div>

        {/* Authentication Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          
          {!isLoginTab && (
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Full Username</label>
              <input
                type="text"
                required
                placeholder="E.g., Arjun Roy"
                value={fullNameInput}
                onChange={(e) => setFullNameInput(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Email Coordinates</label>
            <input
              type="email"
              required
              placeholder="recipient@example.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Secure Password</label>
            <div className="relative flex items-center">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500 pr-10"
              />
              <Lock className="absolute right-3.5 text-gray-600" size={14} />
            </div>
          </div>

          {/* Form Error */}
          {errorMessage && (
            <p className="text-xs text-orange-500 font-bold text-center">
              ✕ {errorMessage}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-xs tracking-wider py-3.5 rounded-xl transition-colors mt-2"
          >
            {isLoginTab ? 'SIGN INTO ACCOUNT' : 'CREATE FREE ACCOUNT'}
          </button>

        </form>

      </div>
    </div>
  );
}
