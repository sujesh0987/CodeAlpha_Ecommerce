import React, { useState } from 'react';
import { Product, Order } from '../types';
import { Shield, Plus, Trash2, Package, Landmark, ClipboardList, CheckCircle, Eye, RefreshCcw } from 'lucide-react';

interface AdminPanelViewProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  setView: (view: string) => void;
}

export default function AdminPanelView({
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  setView,
}: AdminPanelViewProps) {
  // Tabs: 'products' | 'orders'
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states for new sneaker
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [price, setPrice] = useState(3999);
  const [category, setCategory] = useState<'Running' | 'Lifestyle' | 'Basketball' | 'Training'>('Lifestyle');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(15);
  const [formSuccess, setFormSuccess] = useState('');

  // Inline pricing edits
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState<number>(0);
  const [editingStock, setEditingStock] = useState<number>(0);

  // Statistics summaries
  const totalEarnings = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const outOfStockAlerts = products.filter((p) => p.stock === 0).length;

  const handleSubmitNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !imageUrl.trim()) return;

    const newProd: Product = {
      id: `walkin-custom-${Date.now()}`,
      name,
      tagline,
      price: Number(price),
      category,
      image: imageUrl,
      images: [imageUrl],
      sizes: [6, 7, 8, 9, 10, 11],
      colors: ['#FF6B00', '#1A1A1A', '#FFFFFF'],
      colorNames: ['Blaze Orange', 'Stealth Black', 'Hyper White'],
      description: description || 'Premium sneaker curated by administrator. Comfortable and robust, built for everyday walk cycles.',
      rating: 5.0,
      reviewsCount: 1,
      stock: Number(stock),
      reviews: [{ id: 'rev-ad-1', userName: 'Admin Team', rating: 5, comment: 'Surgical design structure, highly recommended drop.', date: '2026-07-09' }],
    };

    onAddProduct(newProd);

    // Reset Form
    setName('');
    setTagline('');
    setImageUrl('');
    setDescription('');
    setStock(15);
    setPrice(3999);
    setFormSuccess('Sneaker published successfully to storefront!');
    setTimeout(() => {
      setFormSuccess('');
      setShowAddForm(false);
    }, 2000);
  };

  const startEditing = (p: Product) => {
    setEditingId(p.id);
    setEditingPrice(p.price);
    setEditingStock(p.stock);
  };

  const saveInlineEdit = (p: Product) => {
    onUpdateProduct({
      ...p,
      price: Number(editingPrice),
      stock: Number(editingStock),
    });
    setEditingId(null);
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="border-b border-neutral-900 pb-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase flex items-center gap-3">
              <Shield className="text-orange-500" size={36} /> WALKIN ADMIN PANEL
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Storefront management, sneaker pricing indices, catalog and client order stream controls
            </p>
          </div>
          <button
            onClick={() => setView('shop')}
            className="bg-transparent hover:bg-white/5 border border-neutral-800 text-white font-bold uppercase text-xs tracking-wider px-6 py-3 rounded-xl transition-all"
          >
            ← GO TO SNEAKER FRONT
          </button>
        </div>

        {/* Dashboard Statistics Marquee */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-left">
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <p className="text-xs text-gray-500 uppercase font-black">Gross Sales Revenue</p>
            <p className="text-3xl font-black text-orange-500 mt-2">₹{totalEarnings.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-gray-400 mt-1">From {orders.length} secure client orders</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <p className="text-xs text-gray-500 uppercase font-black">Total Catalog Products</p>
            <p className="text-3xl font-black text-white mt-2">{products.length}</p>
            <p className="text-[10px] text-gray-400 mt-1">Active sneaker silhouettes listed</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <p className="text-xs text-gray-500 uppercase font-black">Secure Placed Orders</p>
            <p className="text-3xl font-black text-white mt-2">{orders.length}</p>
            <p className="text-[10px] text-gray-400 mt-1">Awaiting dispatch fulfillment</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <p className="text-xs text-gray-500 uppercase font-black">Out of Stock Alerts</p>
            <p className={`text-3xl font-black mt-2 ${outOfStockAlerts > 0 ? 'text-orange-500' : 'text-green-500'}`}>
              {outOfStockAlerts}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">Requires immediate box restocking</p>
          </div>

        </div>

        {/* Tabs Control */}
        <div className="flex border-b border-neutral-900 mb-8 gap-6 justify-start">
          <button
            onClick={() => { setActiveTab('products'); setShowAddForm(false); }}
            className={`pb-4 text-sm font-black uppercase tracking-wider relative flex items-center gap-2 ${
              activeTab === 'products' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Package size={16} /> Sneaker Catalog ({products.length})
            {activeTab === 'products' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500"></span>}
          </button>
          
          <button
            onClick={() => { setActiveTab('orders'); setShowAddForm(false); }}
            className={`pb-4 text-sm font-black uppercase tracking-wider relative flex items-center gap-2 ${
              activeTab === 'orders' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ClipboardList size={16} /> Client Orders ({orders.length})
            {activeTab === 'orders' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500"></span>}
          </button>
        </div>

        {/* TAB 1: SNEAKERS CATALOG MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6 text-left">
            
            {/* Catalog Action line */}
            <div className="flex justify-between items-center bg-neutral-900/40 p-4 rounded-xl border border-neutral-900">
              <span className="text-xs text-gray-400 font-bold uppercase">Publish new drops or alter price metrics</span>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={14} /> {showAddForm ? 'COLLAPSE FORMS' : 'ADD NEW SNEAKER DROP'}
              </button>
            </div>

            {/* Form Creator form */}
            {showAddForm && (
              <form onSubmit={handleSubmitNewProduct} className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-orange-500">Publish New Sneaker</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Sneaker Name</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., Walkin Glide Runner"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Tagline Slogan</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., Smooth glide on modern avenues"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Category Arena</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Running">Running</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Training">Training</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Retail Price (₹)</label>
                    <input
                      type="number"
                      required
                      min="2499"
                      max="7999"
                      placeholder="E.g., 4599"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Available Box Stock</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Unsplash Product Photo Link</label>
                    <input
                      type="text"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Core Description & Specs</label>
                  <textarea
                    rows={3}
                    placeholder="Describe material wraps, comfort mesh layers and traction specs..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-xs py-3 px-6 rounded-xl transition-all"
                >
                  PUBLISH SNEAKER
                </button>

                {formSuccess && <p className="text-xs text-green-500 font-bold mt-2">✓ {formSuccess}</p>}
              </form>
            )}

            {/* Inventory listing Grid/Table */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  
                  <thead className="bg-neutral-950 text-gray-500 uppercase font-bold text-[10px] tracking-wider border-b border-neutral-800">
                    <tr>
                      <th className="p-4">Sneaker</th>
                      <th className="p-4">Arena</th>
                      <th className="p-4">Unit Cost</th>
                      <th className="p-4">Box Stock</th>
                      <th className="p-4 text-right">Administrative</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-neutral-800">
                    {products.map((p) => {
                      const isEditing = editingId === p.id;
                      return (
                        <tr key={p.id} className="hover:bg-neutral-900/35 transition-colors">
                          
                          {/* Image & Title */}
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-black rounded overflow-hidden p-1 flex items-center justify-center shrink-0">
                                <img src={p.image} alt={p.name} className="max-h-full object-contain" referrerPolicy="no-referrer" />
                              </div>
                              <div>
                                <p className="font-black text-white uppercase">{p.name}</p>
                                <p className="text-[10px] text-gray-500 italic truncate max-w-xs">{p.tagline}</p>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="p-4">
                            <span className="bg-neutral-950 border border-neutral-800 px-2.5 py-1 rounded text-[10px] font-bold text-orange-500 uppercase">
                              {p.category}
                            </span>
                          </td>

                          {/* Pricing */}
                          <td className="p-4">
                            {isEditing ? (
                              <div className="flex items-center gap-1">
                                <span className="text-gray-400 font-bold">₹</span>
                                <input
                                  type="number"
                                  value={editingPrice}
                                  onChange={(e) => setEditingPrice(Number(e.target.value))}
                                  className="bg-neutral-950 border border-neutral-800 text-xs text-white p-1 rounded w-16"
                                />
                              </div>
                            ) : (
                              <span className="font-bold text-white">₹{p.price.toLocaleString('en-IN')}</span>
                            )}
                          </td>

                          {/* Box Stock */}
                          <td className="p-4">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editingStock}
                                onChange={(e) => setEditingStock(Number(e.target.value))}
                                className="bg-neutral-950 border border-neutral-800 text-xs text-white p-1 rounded w-14"
                              />
                            ) : (
                              <span className={`font-bold ${p.stock <= 5 ? 'text-orange-500' : 'text-gray-300'}`}>
                                {p.stock} boxes {p.stock <= 5 && '(Low)'}
                              </span>
                            )}
                          </td>

                          {/* actions */}
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-3">
                              {isEditing ? (
                                <>
                                  <button
                                    onClick={() => saveInlineEdit(p)}
                                    className="bg-orange-500 text-black font-black text-[10px] px-3 py-1 rounded hover:bg-orange-600 uppercase"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingId(null)}
                                    className="text-gray-400 hover:text-white text-[10px] font-bold uppercase"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => startEditing(p)}
                                    className="text-gray-400 hover:text-orange-500 text-xs font-bold uppercase"
                                  >
                                    Edit Pricing
                                  </button>
                                  <button
                                    onClick={() => onDeleteProduct(p.id)}
                                    className="text-gray-600 hover:text-red-500 p-1 rounded transition-colors"
                                    title="Delete product drop"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>

                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CLIENT ORDERS STREAM */}
        {activeTab === 'orders' && (
          <div className="space-y-6 text-left">
            
            {orders.length === 0 ? (
              <div className="text-center py-20 bg-neutral-900/10 border border-dashed border-neutral-900 rounded-3xl text-gray-500">
                <ClipboardList size={32} className="mx-auto text-neutral-800 mb-3" />
                <p className="font-bold text-gray-400 uppercase">No customer orders placed yet</p>
                <p className="text-xs text-gray-600">Client checkout actions will stream directly into this dashboard.</p>
              </div>
            ) : (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    
                    <thead className="bg-neutral-950 text-gray-500 uppercase font-bold text-[10px] tracking-wider border-b border-neutral-800">
                      <tr>
                        <th className="p-4">Reference ID</th>
                        <th className="p-4">Client Name</th>
                        <th className="p-4">Date Placed</th>
                        <th className="p-4">Items Summary</th>
                        <th className="p-4">Net Paid</th>
                        <th className="p-4">Fulfillment Status</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-800">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-neutral-900/35 transition-colors">
                          
                          {/* Order Reference */}
                          <td className="p-4">
                            <p className="font-black text-white uppercase tracking-wider">{o.id}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-bold">{o.paymentMethod} Payment</p>
                          </td>

                          {/* Client Name */}
                          <td className="p-4 text-white">
                            <p className="font-bold">{o.shippingDetails.fullName}</p>
                            <p className="text-[10px] text-gray-500">{o.shippingDetails.city}, {o.shippingDetails.state}</p>
                          </td>

                          {/* Date */}
                          <td className="p-4 text-gray-400 font-medium">
                            {o.date}
                          </td>

                          {/* Items count / list */}
                          <td className="p-4">
                            <p className="font-bold text-gray-300">{o.items.length} Sneakers</p>
                            <p className="text-[10px] text-gray-500 truncate max-w-xs">
                              {o.items.map((i) => `${i.productName} (UK ${i.size})`).join(', ')}
                            </p>
                          </td>

                          {/* Net Paid */}
                          <td className="p-4 font-black text-white">
                            ₹{o.totalAmount.toLocaleString('en-IN')}
                          </td>

                          {/* Fulfillment Status Selector */}
                          <td className="p-4">
                            <select
                              value={o.status}
                              onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                              className="bg-neutral-950 border border-neutral-800 text-xs p-2 rounded text-orange-500 font-bold uppercase focus:outline-none focus:border-orange-500 cursor-pointer"
                            >
                              <option value="Order Placed">Placed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
