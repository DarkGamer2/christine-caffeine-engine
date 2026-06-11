import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Lobster } from "next/font/google";

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400"
});

const Facts = () => {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-pink-500/30 selection:text-pink-200">
        <Navbar />
        
        {/* Main Content Layout Container */}
        <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 flex flex-col items-center justify-center gap-10">
          
          {/* Main Title Headings */}
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl">
            <h1 className={`${lobster.className} text-5xl font-bold text-pink-500 tracking-wide drop-shadow-[0_0_15px_rgba(219,39,119,0.2)]`}>
              Christine's Caffeine Engine
            </h1>
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-mono">
              Diagnostic & Analytical Overview
            </h2>
          </div>

          {/* Premium Medical Facts Card */}
          <div className="w-full max-w-2xl p-8 bg-zinc-900/20 border border-zinc-800 rounded-2xl flex flex-col gap-6 shadow-xl backdrop-blur-sm">
              
              {/* Card Header */}
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                <span className="text-xl">🔬</span>
                <h3 className="text-sm font-bold uppercase tracking-widest text-pink-400 font-mono">
                  Medical Facts That Are Indeed True
                </h3>
              </div>

              {/* Clean, Readable Bulleted List */}
              <ul className="space-y-4 text-zinc-300 text-sm md:text-base leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 select-none mt-1">✦</span>
                    <span>You are a very beautiful,intelligent & funny girl.</span>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 select-none mt-1">✦</span>
                    <span>According to studies conducted by Google, a high dosage of your smiles are needed for me to function properly.</span>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 select-none mt-1">✦</span>
                    <span>Clinical data indicates a 100% correlation between your presence and a sudden, sharp spike in my heart rate (diagnosed as terminal butterflies).</span>
                  </li>
                  
                  <li className="flex items-start gap-2 sm:gap-3">
  <span className="text-pink-500 select-none mt-1 text-xs sm:text-sm">✦</span>
  <div>
    <span>
      Clinical inspection reveals an exceptionally high aesthetic rating regarding your localized dermal and cartilage piercings. 
    </span>
    <span className="text-zinc-500 italic font-mono text-[11px] sm:text-xs block mt-1.5 border-l border-zinc-800 pl-2">
      Diagnostic Conclusion: They look incredibly cool, cute, and fit you perfectly. 10/10 medical marvel.
    </span>
  </div>
</li>
<li className="flex items-start gap-2 sm:gap-3">
  <span className="text-pink-500 select-none mt-1 text-xs sm:text-sm">✦</span>
  <div>
    <span>
      Clinical guidelines dictate that weekly excursions to Rituals serve as an essential therapeutic intervention for stress-reduction.
    </span>
    <span className="text-zinc-500 italic font-mono text-[11px] sm:text-xs block mt-1.5 border-l border-zinc-800 pl-2">
      Prophylactic Benefit: Crucial for preventing acute hypoglycemia-induced irritability in a specific future female doctor. :)
    </span>
  </div>
</li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 select-none mt-1">✦</span>
                    <span>
                      It has been clinically proven that you are a very clumsy girl who needs to leave Samsung and taste an iPhone. <span className="text-zinc-500 italic font-mono text-xs block mt-1">P.S. Herbie and KITT both suffered broken tires after you threw them down 😭</span>
                    </span>
                  </li>
                  
                  <li className="flex items-start gap-3 font-semibold text-pink-400 bg-pink-500/5 p-3 rounded-lg border border-pink-500/10">
                    <span className="text-pink-500 select-none mt-0.5">✦</span>
                    <span>Peer-reviewed research confirms that hospital rounds are significantly less exhausting when you are officially designated as my girlfriend.</span>
                  </li>
              </ul>
          </div>

          {/* Footer */}
          <Footer/>
        </main>
      </div>
    );
};

export default Facts;