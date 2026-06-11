"use client";
import { Lobster } from "next/font/google";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400"
});

interface CaffeineData {
  name: string;
  description: string;
  indications: string;
  warnings: string;
}

export default function Home() {
  const [caffeineData, setCaffeineData] = useState<CaffeineData | null>(null);
  const [loading, setLoading] = useState(false);

  async function getCaffeineData() {
    try {
      setLoading(true);
      const response = await fetch(
        'https://api.fda.gov/drug/label.json?search=openfda.generic_name:"caffeine"&limit=1'
      );
      const data = await response.json();
      const drugInfo = data.results[0];
      
      setCaffeineData({
        name: drugInfo.openfda.brand_name ? drugInfo.openfda.brand_name[0] : "Caffeine",
        description: drugInfo.description ? drugInfo.description[0] : "No description available.",
        indications: drugInfo.indications_and_usage ? drugInfo.indications_and_usage[0] : "No indications available.",
        warnings: drugInfo.warnings ? drugInfo.warnings[0] : "No warnings available."
      });
    } catch (error) {
      console.error("FDA Engine Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCaffeineData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-pink-500/30 selection:text-pink-200">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 flex flex-col items-center justify-center gap-10">
        
        {/* Header and Hero Section */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl">
          <h1 className={`${lobster.className} text-5xl font-bold text-pink-500 tracking-wide drop-shadow-[0_0_15px_rgba(219,39,119,0.2)]`}>
            Christine's Caffeine Engine
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed border-b border-zinc-900 pb-6">
            Welcome to Christine's Caffeine Engine! Here, we dive deep into the world of caffeine, exploring its effects, benefits, and potential risks. Whether you're a coffee enthusiast or a <span className="text-pink-400 font-semibold bg-pink-950/30 px-1.5 py-0.5 rounded border border-pink-500/20">stubborn software engineer (yes I am talking to you!)</span>, we've got you covered with the latest research and insights.
          </p>
        </div>

        {/* Dynamic Telemetry Render */}
        {loading ? (
          <div className="w-full max-w-md p-8 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex items-center justify-center">
            <p className="text-pink-500 font-mono animate-pulse tracking-widest text-xs">
              📡 QUERYING FEDERAL MEDICAL DATABASES...
            </p>
          </div>
        ) : caffeineData ? (
          <div className="grid md:grid-cols-2 gap-6 w-full">
            
            {/* Left Card: Clinical Profile */}
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-pink-500/20 transition duration-300">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                    Live Substance Profile
                  </h2>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight mb-4">
                  {caffeineData.name}
                </h3>
                <div className="space-y-4 text-sm leading-relaxed text-zinc-300">
                  <p>
                    <strong className="text-zinc-500 font-mono text-xs block uppercase mb-1">Description:</strong>
                    {caffeineData.description}
                  </p>
                  <p>
                    <strong className="text-zinc-500 font-mono text-xs block uppercase mb-1">Indications & Usage:</strong>
                    {caffeineData.indications}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/60 text-[11px] font-mono text-zinc-500 flex justify-between">
                <span>Source: openFDA API</span>
                <span className="text-pink-500">STIMULANT // 1,3,7-Trimethylxanthine</span>
              </div>
            </div>

            {/* Right Card: Christine's Lecture Box (Official Warnings) */}
            <div className="bg-zinc-900/30 border border-amber-500/20 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition duration-300 bg-linear-to-br from-black to-amber-950/5">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                    Christine's Lecture Corner
                  </h2>
                </div>
                <p className="text-sm text-amber-200/90 leading-relaxed font-serif italic border-l-2 border-amber-500/50 pl-4 py-1">
                  "{caffeineData.warnings}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/60">
                <p className="text-[11px] font-mono text-amber-500/60 text-center tracking-wide">
                  ⚠️ WARNING: CAUTION ADVISED DURING DEMO
                </p>
              </div>
            </div>

          </div>
        ) : (
          <div className="w-full max-w-xl p-6 bg-zinc-950 border border-red-500/30 rounded-2xl text-center">
            <p className="text-red-400 font-mono text-sm">⚠️ Failed to parse FDA schema. Check server logs.</p>
          </div>
        )}

        {/* Footer */}
       <Footer/>
      </main>
    </div>
  );
}