"use client";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Lobster } from "next/font/google";
import { Bar } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import { motion, Variants } from "framer-motion"; // 1. IMPORT MOTION

import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from "chart.js";

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
);

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400"
});

type FdaReactionData = {
  term: string;
  count: number;
};

// Animation Variants for clean, sequential fading
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] }
  }
};

const Graphs = () => {
    const [graphData, setGraphData] = useState<ChartData<"bar", number[], string>>({
      labels: [],
      datasets: [],
    });

    const fetchData=async ()=>{
        try{
            const response=await fetch("https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:caffeine&count=patient.reaction.reactionmeddrapt.exact&limit=10");
            const data=await response.json();
            const results: FdaReactionData[] = data?.results ?? [];
            setGraphData({
              labels: results.map((item) => item.term),
              datasets: [
                {
                  label: "Reactions",
                  data: results.map((item) => item.count),
                  backgroundColor: "rgba(219, 39, 119, 0.6)",
                  borderColor: "rgba(219, 39, 119, 1)",
                  borderWidth: 1,
                },
              ],
            });
        } catch (error) {
            console.error("Error fetching graph data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-pink-500/30 selection:text-pink-200">
      <Navbar />
      
      {/* Centered Main Layout Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 flex flex-col items-center justify-center gap-10">
        
        {/* Animated Header Section */}
        <motion.div 
          className="flex flex-col items-center text-center gap-4 max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className={`${lobster.className} text-5xl font-bold text-pink-500 tracking-wide drop-shadow-[0_0_15px_rgba(219,39,119,0.2)]`}>
            Christine's Caffeine Engine
          </h1>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-mono">
            Advanced Clinical Telemetry
          </h2>
        </motion.div>

        {/* Animated Graph Container Card */}
        <motion.div 
          className="w-full min-h-75 p-8 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-3 group hover:border-pink-500/20 transition duration-300"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }} // Delays slightly so header loads first
        >
          <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-pink-500/30 transition">
            <span className="text-pink-500 text-sm animate-pulse">📊</span>
          </div>
         
         {/* Render only when data is loaded to prevent animation flashes */}
         {graphData.labels && graphData.labels.length > 0 && (
            <motion.div 
              className="w-full"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Bar data={graphData}/>
            </motion.div>
         )}
        </motion.div>

        {/* Animated Footer */}
        <motion.footer 
          className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Built via Solo I.T. Infrastructure Engine // 2026
        </motion.footer>
      </main>
    </div>
  );
};

export default Graphs;