import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
      // Clear values
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const stores = [
    {
      city: 'Bengaluru (Flagship)',
      address: '104, Brigade Road, Ashok Nagar, Bengaluru, Karnataka 560001',
      phone: '+91 80 4912 3456',
      hours: '11:00 AM - 9:30 PM (Daily)',
    },
    {
      city: 'New Delhi',
      address: 'Shop G-22, Inner Circle, Connaught Place, New Delhi 110001',
      phone: '+91 11 4123 9876',
      hours: '11:00 AM - 9:00 PM (Daily)',
    },
    {
      city: 'Mumbai',
      address: 'Ground Floor, Link Square Mall, Linking Road, Bandra West, Mumbai 400050',
      phone: '+91 22 2640 1234',
      hours: '11:00 AM - 10:00 PM (Daily)',
    }
  ];

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-500 font-black text-xs uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full">
            CONNECT WITH WALKIN
          </span>
          <h1 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase mt-6">
            GET IN <span className="text-orange-500">TOUCH</span>
          </h1>
          <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
            Need sizing support? Inquiring about special sneaker shipments? Or want to trade custom styles? Reach out to our concierge, or visit a physical Walkin store.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* LEFT: INTERACTIVE CONTACT FORM (7 Cols) */}
          <div className="lg:col-span-7 bg-neutral-900/40 border border-neutral-900 rounded-3xl p-8 sm:p-10 text-left space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
              <MessageSquare size={24} className="text-orange-500" /> SEND CONCIERGE MESSAGE
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Our direct support team typically responds to inquiries within 2 to 4 business hours, ensuring rapid premium assistance.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Arjun Roy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="E.g., arjun@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Exchange size UK 9 for 10"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Detailed Message</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Describe your inquiry with detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-sm tracking-wider py-4 rounded-xl transition-colors flex items-center justify-center gap-3 shadow-lg shadow-orange-500/10"
              >
                <Send size={16} /> SEND DISPATCH
              </button>

              {submitted && (
                <div className="bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold p-4 rounded-xl text-center">
                  ✓ Dispatch Successful! Our sneaker concierges have received your inquiry. We will contact you shortly.
                </div>
              )}

            </form>
          </div>

          {/* RIGHT: STORE LOCATORS (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
              <MapPin size={24} className="text-orange-500" /> VISIT OUR LOCATIONS
            </h2>

            <div className="space-y-6">
              {stores.map((store, index) => (
                <div
                  key={index}
                  className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6 space-y-3 hover:border-orange-500/20 transition-colors"
                >
                  <p className="font-black text-orange-500 uppercase text-sm tracking-wide">{store.city}</p>
                  
                  <div className="space-y-2 text-xs text-gray-400">
                    <p className="flex items-start gap-2.5">
                      <MapPin size={14} className="text-gray-500 shrink-0 mt-0.5" />
                      <span>{store.address}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone size={14} className="text-gray-500 shrink-0" />
                      <span>{store.phone}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Clock size={14} className="text-gray-500 shrink-0" />
                      <span>{store.hours}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Helpline details */}
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 text-left space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-white">Central Operations</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Our support phone channels are active Monday to Saturday from 10:00 AM to 7:00 PM IST. Feel free to contact our operational line for general support.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
