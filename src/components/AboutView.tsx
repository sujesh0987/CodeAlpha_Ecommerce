import { ShieldCheck, Target, HeartHandshake, Eye } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="bg-neutral-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-orange-500 font-black text-xs uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full">
            OUR LEGACY & MISSION
          </span>
          <h1 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase mt-6">
            WE ARE <span className="text-orange-500">WALKIN.</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mt-6 leading-relaxed">
            Walkin was born out of a simple frustration: the lack of premium, high-octane sneaker options engineered specifically for Indian streets and climates. Combining state-of-the-art sports science with heavy high-street design codes.
          </p>
        </div>

        {/* Brand Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <div className="bg-neutral-900/40 p-8 rounded-2xl border border-neutral-900 text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-black text-lg uppercase">Unmatched Quality</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every single seam, leather overlay, and vulcanized trim undergoes deep stress tests. No shortcuts, ever.
            </p>
          </div>

          <div className="bg-neutral-900/40 p-8 rounded-2xl border border-neutral-900 text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Target size={24} />
            </div>
            <h3 className="font-black text-lg uppercase">Precision Fit</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Tailored sizing loops that perfectly wrap the contours of Indian feet types, from UK Sizes 6 to 11.
            </p>
          </div>

          <div className="bg-neutral-900/40 p-8 rounded-2xl border border-neutral-900 text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <HeartHandshake size={24} />
            </div>
            <h3 className="font-black text-lg uppercase">Made in India</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Assembled, stitched, and detailed locally by master craftsmen in dynamic Indian design clusters.
            </p>
          </div>

          <div className="bg-neutral-900/40 p-8 rounded-2xl border border-neutral-900 text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Eye size={24} />
            </div>
            <h3 className="font-black text-lg uppercase">Futurism Ethos</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We look ahead. From bio-degradable mesh yarns to extreme nitro responsive springs, we build for tomorrow.
            </p>
          </div>
        </div>

        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-orange-500/10 rounded-3xl blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800"
              alt="Design Studio"
              className="w-full h-[400px] object-cover rounded-3xl border border-neutral-800 relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-6 text-left space-y-6">
            <span className="text-orange-500 font-bold text-xs uppercase tracking-widest">Our Engineering Philosophy</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">WHY CARBS & NITRO METERS?</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Traditional footwear either prioritizes cushion or prioritizes structural posture. Our design lab in Bengaluru solved this by suspending full-length propulsive Carbon-fiber spring plates directly within dual-capsule Nitrogen chambers.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              This results in a 14% energy return with every step, reducing joint fatigue during long marathons or hardcore gym lifts. When you Walkin, you don't just move — you float.
            </p>
            <div className="pt-4 border-t border-neutral-900 grid grid-cols-2 gap-4 text-xs font-bold uppercase text-orange-500">
              <p>✓ Breathable Ballistics</p>
              <p>✓ 14% Boost Springs</p>
              <p>✓ Anti-Slip Traction</p>
              <p>✓ Adaptive Ankle Support</p>
            </div>
          </div>
        </div>

        {/* Co-founder signoff */}
        <div className="bg-neutral-900/20 border border-neutral-900 rounded-3xl p-12 text-center max-w-4xl mx-auto">
          <p className="text-gray-300 italic text-lg leading-relaxed mb-6">
            "We wanted to construct a brand that Indian sneakerheads could wear with extreme pride on global stages. Walkin isn't just a label; it's a declaration of high-fashion and technical power."
          </p>
          <p className="font-black text-white text-base uppercase">Siddharth & Sujesh Kumar</p>
          <p className="text-xs text-orange-500 uppercase font-bold tracking-wider mt-1">Co-founders, Walkin Sneakers</p>
        </div>

      </div>
    </div>
  );
}
