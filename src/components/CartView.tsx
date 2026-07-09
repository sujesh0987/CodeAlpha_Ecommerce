import React, { useState, useMemo } from 'react';
import { CartItem, Coupon } from '../types';
import { Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQty: (cartItemId: string, qty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  setView: (view: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null) => void;
}

const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'WALKIN20', discountType: 'percentage', value: 20, minPurchase: 3000 },
  { code: 'STEPUP15', discountType: 'percentage', value: 15, minPurchase: 2000 },
  { code: 'FIRSTWALK', discountType: 'fixed', value: 500, minPurchase: 2500 }
];

export default function CartView({
  cart,
  onUpdateQty,
  onRemoveItem,
  setView,
  appliedCoupon,
  onApplyCoupon,
}: CartViewProps) {
  const [couponCodeInput, setCouponCodeInput] = useState(appliedCoupon ? appliedCoupon.code : '');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (subtotal < appliedCoupon.minPurchase) {
      // Auto-invalidate coupon if subtotal falls below requirement
      setTimeout(() => onApplyCoupon(null), 0);
      return 0;
    }

    if (appliedCoupon.discountType === 'percentage') {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      return appliedCoupon.value;
    }
  }, [appliedCoupon, subtotal, onApplyCoupon]);

  const finalTotal = subtotal - discountAmount;

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const trimmedInput = couponCodeInput.trim().toUpperCase();
    if (!trimmedInput) {
      onApplyCoupon(null);
      return;
    }

    const matched = AVAILABLE_COUPONS.find((c) => c.code === trimmedInput);
    if (!matched) {
      setCouponError('Invalid coupon code. Try WALKIN20 or FIRSTWALK.');
      onApplyCoupon(null);
      return;
    }

    if (subtotal < matched.minPurchase) {
      setCouponError(`This coupon requires a minimum purchase of ₹${matched.minPurchase.toLocaleString('en-IN')}.`);
      onApplyCoupon(null);
      return;
    }

    onApplyCoupon(matched);
    setCouponSuccess(`Coupon ${matched.code} applied successfully! You saved ₹${(matched.discountType === 'percentage' ? (subtotal * matched.value) / 100 : matched.value).toLocaleString('en-IN')}`);
  };

  const handleRemoveCoupon = () => {
    onApplyCoupon(null);
    setCouponCodeInput('');
    setCouponSuccess('');
    setCouponError('');
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="border-b border-neutral-900 pb-8 mb-8 text-left">
          <h1 className="text-4xl font-black tracking-tight uppercase flex items-center gap-3">
            <ShoppingBag className="text-orange-500" size={32} /> YOUR SNEAKER BAG
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Review and personalize your selections before proceeding to the checkout portal
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24 bg-neutral-900/10 border border-dashed border-neutral-900 rounded-3xl space-y-6">
            <ShoppingBag size={48} className="text-neutral-700 mx-auto animate-bounce" />
            <div>
              <p className="text-gray-400 text-lg font-black uppercase mb-2">Your shopping bag is empty</p>
              <p className="text-gray-600 text-xs max-w-sm mx-auto">
                No Walkin sneakers have been added yet. Discover our premium selections and high-performance runner shoes.
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: CART ROWS (8 Cols) */}
            <div className="lg:col-span-8 space-y-4 text-left">
              {cart.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="bg-neutral-900/40 border border-neutral-900 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 justify-between hover:border-neutral-800 transition-colors"
                  >
                    
                    {/* Item Image */}
                    <div className="w-24 h-24 rounded-xl bg-black flex items-center justify-center shrink-0 p-2 overflow-hidden cursor-pointer" onClick={() => { setView('details'); }}>
                      <img src={item.product.image} alt={item.product.name} className="max-h-full object-contain" referrerPolicy="no-referrer" />
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 space-y-1 text-center sm:text-left min-w-0">
                      <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">{item.product.category}</span>
                      <h3 className="font-black text-white text-lg truncate uppercase">{item.product.name}</h3>
                      <p className="text-xs text-gray-400 flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-1">
                        <span>UK Size: <strong className="text-white font-black">{item.selectedSize}</strong></span>
                        <span className="text-neutral-700">|</span>
                        <span className="flex items-center gap-1.5">
                          Color: 
                          <span className="w-2.5 h-2.5 rounded-full border border-neutral-700 inline-block" style={{ backgroundColor: item.selectedColor }}></span>
                          <strong className="text-white font-bold">{item.selectedColorName}</strong>
                        </span>
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="inline-flex items-center bg-neutral-950 border border-neutral-900 rounded-xl p-1 shrink-0">
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white disabled:opacity-25"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-xs font-black">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white disabled:opacity-25"
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </button>
                    </div>

                    {/* Row total & Delete */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto shrink-0">
                      <div className="text-right sm:text-right">
                        <p className="text-[10px] text-gray-500 font-bold uppercase">Aggregate Total</p>
                        <p className="font-black text-lg text-white">₹{itemTotal.toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-gray-600 font-bold">₹{item.product.price.toLocaleString('en-IN')} each</p>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-950/20 transition-all"
                        title="Delete product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                  </div>
                );
              })}

              <button
                onClick={() => setView('shop')}
                className="text-xs text-orange-500 hover:text-orange-600 font-black uppercase tracking-wider transition-colors pt-2 block"
              >
                ← CONTINUE ADDING SNEAKERS
              </button>
            </div>

            {/* RIGHT: BILL BREAKDOWN & COUPONS (4 Cols) */}
            <div className="lg:col-span-4 space-y-6 text-left">
              
              {/* Promo Coupon Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-2">
                  <Tag size={14} className="text-orange-500" /> Apply Promo Code
                </h3>
                
                <form onSubmit={handleApplyCouponSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="E.g., WALKIN20, STEPUP15"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    disabled={!!appliedCoupon}
                    className="flex-1 bg-neutral-950 border border-neutral-800 text-xs py-2.5 px-3 rounded-lg focus:outline-none focus:border-orange-500 uppercase text-white font-bold"
                  />
                  {appliedCoupon ? (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="bg-red-950 text-red-400 border border-red-900/30 hover:bg-red-900 hover:text-white text-xs font-black px-4 rounded-lg transition-colors"
                    >
                      REMOVE
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-black text-xs font-black px-4 rounded-lg transition-colors uppercase"
                    >
                      APPLY
                    </button>
                  )}
                </form>

                {couponError && <p className="text-[10px] text-red-500 font-bold">✕ {couponError}</p>}
                {couponSuccess && <p className="text-[10px] text-green-500 font-bold">✓ {couponSuccess}</p>}
                
                <div className="pt-2 border-t border-neutral-800/60 text-[10px] text-gray-500 space-y-1">
                  <p>• <span className="text-orange-500 font-black">WALKIN20</span>: Flat 20% Off on orders above ₹3,000</p>
                  <p>• <span className="text-orange-500 font-black">STEPUP15</span>: Flat 15% Off on orders above ₹2,000</p>
                  <p>• <span className="text-orange-500 font-black">FIRSTWALK</span>: Flat ₹500 Off on orders above ₹2,500</p>
                </div>
              </div>

              {/* Bill totals card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider border-b border-neutral-800 pb-2">
                  Payment Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bag Subtotal</span>
                    <span className="font-bold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span className="font-medium">Coupon Discount ({appliedCoupon?.code})</span>
                      <span className="font-bold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xs text-gray-400">
                    <span>GST (18% Included)</span>
                    <span>Included</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Express Courier (India)</span>
                    <span className="text-orange-500 font-black uppercase text-xs">FREE</span>
                  </div>

                  <div className="border-t border-neutral-800 pt-3 flex justify-between items-baseline">
                    <span className="font-black uppercase text-white text-base">Net Payable</span>
                    <span className="font-black text-2xl text-orange-500">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setView('checkout')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black uppercase tracking-wider text-sm py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-orange-500/10"
                >
                  SECURE CHECKOUT <ArrowRight size={16} />
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
