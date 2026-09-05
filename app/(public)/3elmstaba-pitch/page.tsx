import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: '3Elmstaba Café - Strategic Development Consultation',
  description: 'Partnership opportunity for Syrian Shawarma inside 3Elmstaba Café.',
};

export default function PitchPage() {
  return (
    <div className="min-h-screen bg-[#0b1121] text-slate-200 font-sans pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-cyan-400 mb-2 leading-tight">
            3Elmstaba Café -<br />Strategic Development<br />Consultation
          </h1>
          <p className="text-slate-400 text-sm mb-6">
            Location: Tokh City, Egypt | Business Model: Cloud Kitchen & Hybrid Café Integration
          </p>
          <div className="inline-block bg-cyan-600 text-white font-semibold py-2 px-6 rounded-full text-sm shadow-md">
            CONSULTATION STRATEGY TRANSCRIPT
          </div>
        </div>

        {/* Conversation Feed */}
        <div className="space-y-6 relative z-10">
          
          {/* Card 1: Client */}
          <div className="bg-[#111827] rounded-xl overflow-hidden border-l-4 border-l-purple-500 shadow-lg">
            <div className="p-5">
              <h3 className="text-purple-400 font-bold text-xs tracking-wider mb-3 uppercase">Client / Business Consultant</h3>
              <p className="text-slate-200 leading-relaxed text-sm">
                Café location tokh city, the owner asked me to develop his business and I recommended to share with another business one of his double places to Syrian shawarma food. What is your opinion?
              </p>
            </div>
          </div>

          {/* Card 2: Consultant */}
          <div className="bg-[#111827] rounded-xl overflow-hidden border-l-4 border-l-cyan-500 shadow-lg">
            <div className="p-5">
              <h3 className="text-cyan-400 font-bold text-xs tracking-wider mb-4 uppercase">Business Advisory Analysis</h3>
              <p className="text-slate-200 leading-relaxed text-sm mb-4">
                Partnering a local café with a Syrian shawarma concept is a strong commercial move in Egypt. Shawarma is high-margin, fast-moving, and drives foot traffic during late-afternoon and evening hours—peak times for café revenue.
              </p>
              <p className="text-slate-200 leading-relaxed text-sm mb-6">
                However, looking at the photos of <strong>3Elmstaba Cafe</strong>, executing this properly requires careful structural and operational balancing.
              </p>

              {/* Pros */}
              <div className="mb-6 border-l-2 border-l-orange-500 pl-3">
                <h4 className="text-orange-500 font-bold mb-3">Pros of the Recommendation</h4>
                <ul className="space-y-3 text-sm text-slate-300 list-disc list-inside">
                  <li><strong className="text-white">Revenue Sharing & Risk Reduction:</strong> Leasing or sharing half the double storefront instantly guarantees rental income or shared overhead (electricity, rent, municipal fees).</li>
                  <li><strong className="text-white">Foot Traffic Boost:</strong> A popular food element attracts customers who wouldn't visit for drinks alone, converting food diners into beverage and shisha customers.</li>
                  <li><strong className="text-white">Footprint Efficiency:</strong> Converting one side into a focused food station maximizes unused street-facing square footage.</li>
                </ul>
              </div>

              {/* Cons */}
              <div className="mb-8 border-l-2 border-l-orange-500 pl-3">
                <h4 className="text-orange-500 font-bold mb-3">Cons & Critical Operational Risks</h4>
                <ul className="space-y-3 text-sm text-slate-300 list-disc list-inside">
                  <li><strong className="text-white">Smell & Heat Exhaustion:</strong> Shawarma spits produce intense heat, grease, and heavy smoke. Without a dedicated chimney/exhaust system, oil fumes will settle on indoor seating and furniture.</li>
                  <li><strong className="text-white">Cluttered Aesthetic:</strong> The café currently features a rustic, colorful street-art/baladi vibe. Merging a stainless-steel Syrian kitchen setup can look messy if not integrated into the facade design seamlessly.</li>
                  <li><strong className="text-white">Customer Flow Bottleneck:</strong> Shawarma draws quick takeaway crowds and delivery drivers. If takeaways block the entrance, traditional café sit-down customers will be turned off by noise and congestion.</li>
                </ul>
              </div>

              {/* Matrix Table */}
              <div className="mb-2 border-l-2 border-l-orange-500 pl-3">
                <h4 className="text-orange-500 font-bold mb-3">Strategic Action Matrix</h4>
              </div>
              
              <div className="overflow-x-auto bg-[#0f172a] rounded-lg border border-slate-700/50">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#1e293b]/50 text-cyan-400">
                    <tr>
                      <th className="px-4 py-3 font-semibold border-b border-slate-700/50">Area</th>
                      <th className="px-4 py-3 font-semibold border-b border-slate-700/50">Strategic Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50 text-slate-300">
                    <tr className="bg-[#0f172a]">
                      <td className="px-4 py-3 font-medium text-white align-top whitespace-nowrap">Separation of Space</td>
                      <td className="px-4 py-3 align-top">Clearly divide the interior. Ensure the shawarma kitchen has its own glass/metal partition to seal heat and grease away from café seating.</td>
                    </tr>
                    <tr className="bg-[#111827]">
                      <td className="px-4 py-3 font-medium text-white align-top whitespace-nowrap">Ventilation Investment</td>
                      <td className="px-4 py-3 align-top">Require the Syrian food vendor (or split the cost) to install an industrial hood and filtration system. This is non-negotiable for café comfort.</td>
                    </tr>
                    <tr className="bg-[#0f172a]">
                      <td className="px-4 py-3 font-medium text-white align-top whitespace-nowrap">Unified Branding</td>
                      <td className="px-4 py-3 align-top">Match the shawarma counter's exterior woodwork or signage with the existing rustic wooden fence aesthetic of 3Elmstaba.</td>
                    </tr>
                    <tr className="bg-[#111827]">
                      <td className="px-4 py-3 font-medium text-white align-top whitespace-nowrap">Cross-Promotion Deal</td>
                      <td className="px-4 py-3 align-top">Structure the agreement so café customers get a meal discount, or allow food customers to sit in the café on the condition they purchase at least one drink.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>

          {/* Card 3: Client */}
          <div className="bg-[#111827] rounded-xl overflow-hidden border-l-4 border-l-purple-500 shadow-lg mt-6">
            <div className="p-5">
              <h3 className="text-purple-400 font-bold text-xs tracking-wider mb-3 uppercase">Client / Business Consultant</h3>
              <p className="text-slate-200 leading-relaxed text-sm">
                Second door especially the left door, give me images with minimized cost, and I think we can decide to sell online only to cover the online demand. Tokh is highly populated and has high demand for food delivery.
              </p>
            </div>
          </div>

          {/* Card 4: Consultant with Image */}
          <div className="bg-[#111827] rounded-xl overflow-hidden border-l-4 border-l-cyan-500 shadow-lg mt-6 mb-12">
            <div className="p-5">
              <h3 className="text-cyan-400 font-bold text-xs tracking-wider mb-4 uppercase">Business Advisory Response & Cloud Kitchen Concept</h3>
              
              <p className="text-slate-200 leading-relaxed text-sm mb-5">
                Transitioning the left door into a low-cost, delivery-optimized ("Cloud Kitchen / Delivery Hub") model specifically tailored to Tokh's high-density delivery market is an excellent capital-efficient strategy.
              </p>

              {/* Concept Image */}
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-slate-700/50 mb-5">
                {/* Fallback styling for the image in case it's missing initially */}
                <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center text-slate-500 text-xs text-center p-4 z-0">
                  Concept image rendering... (Ensure 3elmstaba-concept.png is in /public)
                </div>
                <Image 
                  src="/3elmstaba-concept.png" 
                  alt="3Elmstaba Cafe Cloud Kitchen Concept"
                  fill
                  className="object-cover z-10"
                />
              </div>

              {/* Boxed Highlights */}
              <div className="bg-[#0f172a] rounded-lg border border-cyan-500/30 p-4">
                <h4 className="text-cyan-400 font-bold mb-3">Left-Door Online Delivery Execution Highlights:</h4>
                <ul className="space-y-3 text-sm text-slate-300 list-disc list-inside">
                  <li><strong className="text-white">Minimalist Facade Transformation:</strong> Utilize existing rustic wooden gate structures to frame a compact pick-up counter without costly masonry work.</li>
                  <li><strong className="text-white">High-Visibility Digital Signage:</strong> Deploy prominent banners/screens targeting delivery riders ("Online Orders Only" & "Scan to Order QR Code").</li>
                  <li><strong className="text-white">Dedicated Rider Staging Area:</strong> Set up designated delivery motorcycle parking directly outside the left door to keep takeaway queues away from café patrons.</li>
                  <li><strong className="text-white">Cost Minimization:</strong> Low Capex setup focusing on essential kitchen equipment (vertical shawarma spit, grill press, stainless counter, and overhead hood ventilation).</li>
                </ul>
              </div>

            </div>
          </div>

        </div>

        {/* Powerful CTA Button to Ordering App */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0b1121] via-[#0b1121] to-transparent z-50 pointer-events-none flex justify-center pb-8">
          <Link 
            href="/3elmstaba-order" 
            className="pointer-events-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white w-full max-w-md text-center py-4 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-transform active:scale-95 hover:scale-105"
          >
            🚀 View Live Ordering App Prototype
          </Link>
        </div>

        <div className="text-center mt-12 pb-24 text-slate-500 text-xs relative z-10">
          Generated for 3Elmstaba Café Strategic Consultation<br/>Business Strategy & Architectural Concept Record
        </div>

      </div>
    </div>
  );
}
