import React, { useState, useMemo } from 'react';
import { CartItem, ShippingDetails, Coupon, Order } from '../types';
import { ShieldCheck, Truck, CreditCard, Landmark, CheckCircle } from 'lucide-react';

interface CheckoutViewProps {
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  setView: (view: string) => void;
  onPlaceOrder: (order: Order) => void;
}

export default function CheckoutView({
  cart,
  appliedCoupon,
  setView,
  onPlaceOrder,
}: CheckoutViewProps) {
  // Shipping form fields state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [upiIdInput, setUpiIdInput] = useState('');
  const [formError, setFormError] = useState('');

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountType === 'percentage') {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      return appliedCoupon.value;
    }
  }, [appliedCoupon, subtotal]);

  const finalTotal = subtotal - discountAmount;

  // Formatting helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formatted = '';
    for (let i = 0; i < rawVal.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += rawVal[i];
    }
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
    let formatted = '';
    for (let i = 0; i < rawVal.length && i < 4; i++) {
      if (i === 2) formatted += '/';
      formatted += rawVal[i];
    }
    setCardExpiry(formatted);
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/gi, '');
    setCardCVV(rawVal.substring(0, 3));
  };

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // General Validation
    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !city.trim() || !state.trim() || !zipCode.trim()) {
      setFormError('Please fill in all requested shipping address fields.');
      return;
    }

    if (phone.replace(/[^0-9]/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit Indian mobile phone number.');
      return;
    }

    if (zipCode.replace(/[^0-9]/g, '').length !== 6) {
      setFormError('Please enter a valid 6-digit Indian Pin Code.');
      return;
    }

    // Payment validation
    if (paymentMethod === 'Card') {
      if (cardNumber.replace(/\s+/g, '').length !== 16 || cardExpiry.length !== 5 || cardCVV.length !== 3) {
        setFormError('Please enter valid credit/debit card credentials (16-digit card, MM/YY expiry, 3-digit CVV).');
        return;
      }
    } else if (paymentMethod === 'UPI') {
      if (!upiIdInput.includes('@') || upiIdInput.length < 3) {
        setFormError('Please enter a valid UPI address format (e.g., customer@paytm or walker@ybl).');
        return;
      }
    }

    // Creating actual Order structure
    const newOrder: Order = {
      id: `WLK-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      items: cart.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        size: item.selectedSize,
        color: item.selectedColor,
        colorName: item.selectedColorName,
      })),
      shippingDetails: {
        fullName,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
      },
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      totalAmount: finalTotal,
      discountApplied: discountAmount,
      couponUsed: appliedCoupon?.code,
      status: 'Order Placed',
    };

    onPlaceOrder(newOrder);
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-8 text-left">
          <button
            onClick={() => setView('cart')}
            className="text-gray-400 hover:text-orange-500 transition-colors text-xs font-bold uppercase tracking-wider"
          >
            ← Back to Shopping Bag
          </button>
        </div>

        {/* Layout */}
        <form onSubmit={handlePlaceOrderSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* LEFT COLUMN: SHIPPING & BILLING ADDRESS (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* shipping address */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-6">
              <h2 className="text-2xl font-black uppercase text-white flex items-center gap-3">
                <Truck className="text-orange-500" size={24} /> Shipping Destination
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Full Delivery Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter recipient full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Email Coordinates</label>
                    <input
                      type="email"
                      required
                      placeholder="recipient@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Mobile Contact Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit Indian Mobile"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="Flat No, Wing, Building Name, Street, Landmark"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">City</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., Bengaluru"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">State / Province</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., Karnataka"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Pin Code (6 Digits)</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., 560001"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* PAYMENT SECTOR */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-6">
              <h2 className="text-2xl font-black uppercase text-white flex items-center gap-3">
                <CreditCard className="text-orange-500" size={24} /> Select Payment Way
              </h2>

              {/* Payment selection tags */}
              <div className="grid grid-cols-3 gap-4">
                
                {/* UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-orange-500 bg-orange-500/10 text-orange-500'
                      : 'border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <Landmark size={20} />
                  <span className="text-xs font-black uppercase tracking-wider">UPI App</span>
                </button>

                {/* Credit / Debit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'Card'
                      ? 'border-orange-500 bg-orange-500/10 text-orange-500'
                      : 'border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <CreditCard size={20} />
                  <span className="text-xs font-black uppercase tracking-wider">Debit Card</span>
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-orange-500 bg-orange-500/10 text-orange-500'
                      : 'border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <span className="font-black text-xs">₹ ₹</span>
                  <span className="text-xs font-black uppercase tracking-wider">COD</span>
                </button>

              </div>

              {/* Dynamic Subforms */}
              <div className="p-6 bg-neutral-950 rounded-2xl border border-neutral-900">
                {paymentMethod === 'UPI' && (
                  <div className="space-y-4">
                    <p className="text-xs font-semibold text-gray-400 leading-relaxed">
                      Scan QR and pay instantly via any UPI app (GPay, PhonePe, Paytm, BHIM). Or provide your UPI address handles below:
                    </p>
                    
                    {/* Mock QR code styling */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 bg-neutral-900 p-4 rounded-xl border border-neutral-800 max-w-sm mx-auto">
                      <div className="w-24 h-24 bg-white p-1 rounded flex items-center justify-center shrink-0">
                        {/* Custom visual mockup of QR Code */}
                        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,#1a1a1a_0%,#ffffff_100%)] flex flex-col justify-between p-1.5 border border-black">
                          <div className="flex justify-between">
                            <div className="w-5 h-5 bg-black"></div>
                            <div className="w-5 h-5 bg-black"></div>
                          </div>
                          <span className="text-[6px] text-black font-black leading-none text-center">WALKIN UPI</span>
                          <div className="flex justify-between items-end">
                            <div className="w-5 h-5 bg-black"></div>
                            <div className="w-4 h-4 border border-black"></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-left space-y-1">
                        <p className="text-xs font-bold text-white uppercase tracking-wider">Scan QR & Transfer</p>
                        <p className="text-[10px] text-gray-500">Payee: <strong className="text-gray-300">WALKIN SNEAKERS LTD</strong></p>
                        <p className="text-[10px] text-orange-500 font-bold">UPI ID: walkin@paytm</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Enter UPI ID</label>
                      <input
                        type="text"
                        placeholder="customer@okhdfcbank"
                        value={upiIdInput}
                        onChange={(e) => setUpiIdInput(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="space-y-4">
                    <p className="text-xs font-semibold text-gray-400 leading-relaxed">
                      We accept all major debit and credit card providers (Visa, Mastercard, RuPay). Payments are secured via 256-bit encryption.
                    </p>
                    
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Credit / Debit Card Number</label>
                      <input
                        type="text"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">CVV Security Pin</label>
                        <input
                          type="password"
                          placeholder="XXX"
                          value={cardCVV}
                          onChange={handleCVVChange}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'COD' && (
                  <div className="space-y-2 text-center sm:text-left">
                    <p className="text-xs font-black text-orange-500 uppercase tracking-widest">✓ Cash on Delivery Active</p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      We will dispatch your parcel via premium logistics. You can pay in hard cash or scan the digital code when the courier executive handovers your sneaker box. No extra charges apply.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY & DISPATCH SUBMIT (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider border-b border-neutral-800 pb-2">
                Order Review ({cart.length} Sneakers)
              </h3>

              {/* Items loop summary */}
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded bg-black flex items-center justify-center shrink-0 overflow-hidden p-1">
                        <img src={item.product.image} alt={item.product.name} className="max-h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate">{item.product.name}</p>
                        <p className="text-[10px] text-gray-500">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-black text-gray-300">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* pricing summary */}
              <div className="border-t border-neutral-800 pt-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Gross Sneaker Price</span>
                  <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Promo Discount ({appliedCoupon?.code})</span>
                    <span className="font-black">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-400">
                  <span>Shipping & Delivery Insurance</span>
                  <span className="text-orange-500 font-bold uppercase">FREE</span>
                </div>

                <div className="border-t border-neutral-800 pt-3 flex justify-between items-baseline">
                  <span className="font-black text-white text-sm uppercase">Total Amount Due</span>
                  <span className="font-black text-xl text-orange-500">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Form Errors */}
              {formError && (
                <div className="bg-red-950/40 border border-red-900/30 text-red-400 text-xs font-bold p-3 rounded-lg text-center leading-relaxed">
                  ✕ {formError}
                </div>
              )}

              {/* Submit Dispatch */}
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black uppercase tracking-wider text-sm py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10"
              >
                <CheckCircle size={16} /> SUBMIT DISPATCH ORDER
              </button>

              <p className="text-[10px] text-center text-gray-500 leading-relaxed">
                By placing the order, you authorize Walkin India to prepare premium sneaker box packaging and handover to local logistics channels. Secure Transit and COD applies.
              </p>
            </div>

            {/* Security metrics */}
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 text-left space-y-3">
              <p className="text-xs text-orange-500 font-black uppercase flex items-center gap-2">
                <ShieldCheck size={16} /> SECURE TRANSIT CONCIERGE
              </p>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Walkin operates in premium logistics partnership with BlueDart, Delhivery, and India Post. Your tracking parameters will be sent via SMS immediately upon box completion and dispatch.
              </p>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
