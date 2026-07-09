import { Order } from '../types';
import { CheckCircle, Printer, ShoppingBag, Truck } from 'lucide-react';

interface OrderConfirmationViewProps {
  order: Order;
  setView: (view: string) => void;
}

export default function OrderConfirmationView({
  order,
  setView,
}: OrderConfirmationViewProps) {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Invoice styled card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-8 text-left relative overflow-hidden print:bg-white print:text-black print:border-none">
          
          {/* Neon banner indicator */}
          <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-orange-500 to-amber-500"></div>

          {/* Icon Header */}
          <div className="text-center space-y-4 pt-4 print:hidden">
            <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto">
              <CheckCircle size={36} />
            </div>
            
            <span className="text-orange-500 font-black text-xs uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full inline-block">
              ✓ ORDER SECURED SUCCESSFULLY
            </span>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase leading-none">
              THANK YOU FOR <br />YOUR <span className="text-orange-500">WALK.</span>
            </h1>
            
            <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto">
              Your box is being prepared in our Bengaluru lab. You will receive real-time SMS alerts when your shoes leave our warehouse.
            </p>
          </div>

          {/* Invoice Metadata */}
          <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-semibold">
            <div>
              <p className="text-gray-500 uppercase font-black">Order Reference ID</p>
              <p className="text-white text-sm font-black tracking-wider uppercase print:text-black">{order.id}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase font-black">Dispatch Date</p>
              <p className="text-white text-sm font-black print:text-black">{order.date}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase font-black">Payment Status</p>
              <p className="text-orange-500 text-sm font-black uppercase tracking-wider">{order.paymentStatus}</p>
            </div>
          </div>

          {/* Items Breakdown list */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-orange-500 border-b border-neutral-800 pb-2">
              Itemized Inventory
            </h3>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-neutral-900/60 text-xs sm:text-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 bg-black rounded overflow-hidden p-1 flex items-center justify-center shrink-0">
                      <img src={item.productImage} alt={item.productName} className="max-h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="font-bold text-white print:text-black truncate uppercase">{item.productName}</p>
                      <p className="text-[10px] text-gray-500 font-medium">UK Size: {item.size} | Color: {item.colorName} | Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-black text-white print:text-black shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Coordinates & Totals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            
            {/* shipping coordinates */}
            <div className="space-y-3 text-xs text-left">
              <h4 className="font-black uppercase tracking-widest text-gray-500">Shipping Destination</h4>
              <p className="font-bold text-white print:text-black uppercase">{order.shippingDetails.fullName}</p>
              <p className="text-gray-400 leading-relaxed print:text-gray-600">
                {order.shippingDetails.address}, {order.shippingDetails.city}, {order.shippingDetails.state} - {order.shippingDetails.zipCode}
              </p>
              <p className="text-gray-400 print:text-gray-600">Mobile: {order.shippingDetails.phone}</p>
              <p className="text-gray-400 print:text-gray-600">Email: {order.shippingDetails.email}</p>
            </div>

            {/* Calculations summaries */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-black uppercase tracking-widest text-gray-500 text-left sm:text-right">Charges Breakdown</h4>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Basket Subtotal</span>
                <span className="font-bold text-white print:text-black">
                  ₹{(order.totalAmount + order.discountApplied).toLocaleString('en-IN')}
                </span>
              </div>
              
              {order.discountApplied > 0 && (
                <div className="flex justify-between text-green-500 font-bold">
                  <span>Promo Code Discount ({order.couponUsed})</span>
                  <span>-₹{order.discountApplied.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-500">
                <span>Shipping & Transit Insurance</span>
                <span className="text-orange-500 font-bold">FREE</span>
              </div>

              <div className="border-t border-neutral-800 pt-2.5 flex justify-between items-baseline font-black text-sm">
                <span className="uppercase text-white print:text-black">Aggregate Paid</span>
                <span className="text-orange-500 text-lg">
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

          </div>

          {/* Delivery estimate pillar */}
          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 flex items-center gap-4 text-xs text-left print:hidden">
            <Truck size={24} className="text-orange-500 shrink-0" />
            <div>
              <p className="font-black text-white uppercase tracking-wider">Estimated Delivery Range</p>
              <p className="text-gray-400 mt-1 leading-relaxed">
                Your sneaker box is scheduled for parcel dispatch within 24 hours. The estimated courier arrival at your destination is in **2 to 4 working days**.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-neutral-800 print:hidden">
            <button
              onClick={() => setView('shop')}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10"
            >
              <ShoppingBag size={14} /> KEEP SHOPPING SNEAKERS
            </button>
            <button
              onClick={handlePrint}
              className="bg-transparent hover:bg-white/5 border border-neutral-800 text-white font-black uppercase text-xs py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Printer size={14} /> PRINT INVOICE
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
