"use client";
import Navbar from "../components/Navbar";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import { Lobster } from "next/font/google";
import Footer from "../components/Footer";
const lobster = Lobster({
  subsets: ["latin"],
  weight: "400"
});

const DatingCalendar = () => {
    const [datingResponse, setDatingResponse] = useState<string>("");
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    
    // Form Inputs
    const [date, setDate] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [foodChoice, setFoodChoice] = useState<string>(""); 
    const [requests, setRequests] = useState<string>("");
    const [dislikes, setDislikes] = useState<string>("");
    const [questions, setQuestions] = useState<string>("");

    // Array to hold all dates she locks in and schedules!
    const [lockedDates, setLockedDates] = useState<string[]>([]);

    // This handles checking if a tile matches any of her submitted dates
    const highlightSelectedDate = ({ date: tileDate, view }: { date: Date; view: string }) => {
        if (view === "month") {
            const currentTileDate = tileDate.toISOString().split("T")[0];

            // If this tile's date matches any date in our locked dates array, make it pulse pink!
            if (lockedDates.includes(currentTileDate)) {
                return 'bg-pink-500 text-white rounded-full font-bold shadow-lg shadow-pink-500/50 animate-pulse';
            }
        }
        return null;
    };

    const handleDatingFormData = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            
            // Append the newly selected date to our array of locked dates
            if (date && !lockedDates.includes(date)) {
                setLockedDates(prev => [...prev, date]);
            }

            await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
               body: JSON.stringify({
    datingResponse,
    date,
    location, // This sends the mall/venue string
    foodChoice, // This sends the cuisine selected
    requests,
    dislikes,
    questions
})
            });
            
            setHasSubmitted(true);
        } catch (error) {
            console.error("Error handling dating form data:", error);
        }
    };

    // Reset form so she can book another date in the future if she wants!
    const handleBookAnother = () => {
        setHasSubmitted(false);
        setDate("");
        setLocation("");
        setRequests("");
        setDislikes("");
        setQuestions("");
    };

    return (
       <div className={`min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-pink-500/30 selection:text-pink-200 transition-all duration-1000 ${
        datingResponse === "no" ? "grayscale contrast-125 brightness-50 animate-pulse" : ""
       }`}>
            <Navbar />

            <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 flex flex-col items-center justify-center gap-8">
                
                <div className="flex flex-col items-center text-center gap-4 max-w-2xl">
                    <h1 className={`${lobster.className} text-5xl font-bold text-pink-500 tracking-wide drop-shadow-[0_0_15px_rgba(219,39,119,0.2)]`}>
                        Christine's Dating Calendar
                    </h1>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-mono">
                        Engine Bookings & Clinical Directives
                    </h2>
                </div>

                {/* Main Dashboard Wrapper containing ticker and calendar block */}
                <div className="w-full max-w-2xl flex flex-col gap-3">
                    
                    {/* NEW ELEMENT: Upcoming Event Live Ticker Banner */}
                    <div className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-xl px-4 py-3 flex items-center justify-between text-xs font-mono shadow-md backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-pink-500 animate-ping"></span>
                            <span className="text-zinc-500 font-bold uppercase tracking-wider">Upcoming Event:</span>
                        </div>
                        <span className="text-pink-400 font-bold drop-shadow-[0_0_8px_rgba(244,114,182,0.3)] tracking-wide">
                            Our Date in December ❄️✨
                        </span>
                    </div>

                    {/* Dashboard Calendar Display Module */}
                    <div className="w-full p-4 bg-zinc-900/10 border border-zinc-900 rounded-2xl flex flex-col items-center justify-center shadow-md">
                        <Calendar 
                            tileClassName={highlightSelectedDate}
                            className="bg-black text-white border-none font-sans rounded-xl p-2"
                            activeStartDate={date ? new Date(date + 'T00:00:00') : undefined}
                        />
                    </div>
                </div>

                {/* PHASE 1 & 2 CARD: The Question Container */}
                <div className={`w-full max-w-2xl p-8 bg-zinc-900/20 border border-zinc-800 rounded-2xl flex flex-col gap-6 shadow-xl backdrop-blur-sm transition-all duration-700 ${
                    datingResponse === "yes" ? "max-h-0 p-0 opacity-0 overflow-hidden pointer-events-none border-none mb-8" : "max-h-125 opacity-100"
                }`}>
                    <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                        <span className="text-xl">📅</span>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-pink-400 font-mono">
                            Required Patient Response
                        </h3>
                    </div>

                    <h1 className="text-xl font-medium tracking-tight text-zinc-200">
                        Alright Software Engineer, would you like to date me?
                    </h1>
                    
                    <div className="flex flex-col gap-3 font-mono text-sm">
                        <label htmlFor="accept" className="flex items-center gap-3 p-3 bg-zinc-900/40 border border-zinc-800 rounded-xl hover:border-pink-500/30 transition cursor-pointer group">
                            <input 
                                type="radio" id="accept" name="dating_choice" 
                                checked={datingResponse === "yes"} 
                                onChange={() => setDatingResponse("yes")} 
                                className="accent-pink-500 h-4 w-4"
                            />
                            <span className="text-zinc-300 group-hover:text-pink-200 transition">Yes, I would love to date you! 🥰</span>
                        </label>

                        <label htmlFor="decline" className="flex items-center gap-3 p-3 bg-zinc-900/40 border border-zinc-800 rounded-xl hover:border-red-500/30 transition cursor-pointer group">
                            <input 
                                type="radio" id="decline" name="dating_choice" 
                                checked={datingResponse === "no"} 
                                onChange={() => setDatingResponse("no")} 
                                className="accent-red-500 h-4 w-4"
                            />
                            <span className="text-zinc-300 group-hover:text-red-300 transition">No, I am not interested. 😢</span>
                        </label>
                    </div>
                </div>

                {/* PHASE 3 CARD: The Scheduling Form Container */}
                <div className={`w-full max-w-2xl bg-zinc-900/20 border border-zinc-800 rounded-2xl shadow-xl backdrop-blur-sm transition-all duration-1000 ${
                    datingResponse === "yes" && !hasSubmitted ? "max-h-300 p-8 opacity-100 border" : "max-h-0 p-0 opacity-0 overflow-hidden border-none"
                }`}>
                    <div className="flex items-center gap-3 border-b border-zinc-800 pb-4 mb-6">
                        <span className="text-xl">✍️</span>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-pink-400 font-mono">
                            Treatment Logistics & Itinerary
                        </h3>
                    </div>

                    <form onSubmit={handleDatingFormData} className="space-y-5 text-sm font-mono">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="date_pick" className="text-zinc-400 uppercase tracking-wider text-xs font-bold">Great! When are you free?</label>
                            <input 
                                type="date" 
                                id="date_pick" 
                                value={date}
                                className="relative z-10 block w-full md:w-auto bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-pink-500/50 transition font-sans cursor-pointer" 
                                onChange={(e) => setDate(e.target.value)} 
                                required
                            />
                        </div>

                       <div className="flex flex-col gap-1.5">
    <label htmlFor="location_pick" className="text-zinc-400 uppercase tracking-wider text-xs font-bold">
        Where would you like to go?
    </label>
    <input 
        type="text" 
        id="location_pick" 
        value={location} 
        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white placeholder-zinc-700 focus:outline-none focus:border-pink-500/50 transition font-sans" 
        placeholder="Trincity Mall, the beach, C3 Centre..." 
        onChange={(e)=>setLocation(e.target.value)} 
        required
    />
</div>

{/* 2. NEW INTERACTIVE CUISINE SELECTOR */}
<div className="flex flex-col gap-1.5">
    <label htmlFor="location_pick" className="text-zinc-400 uppercase tracking-wider text-xs font-bold">
        Where would you like to go?
    </label>
    <input 
        type="text" 
        id="location_pick" 
        value={location} 
        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white placeholder-zinc-700 focus:outline-none focus:border-pink-500/50 transition font-sans" 
        placeholder="Trincity Mall, the beach, C3 Centre..." 
        onChange={(e)=>setLocation(e.target.value)} 
        required
    />
</div>

{/* 2. NEW INTERACTIVE CUISINE SELECTOR */}
<div className="flex flex-col gap-3 pt-2">
    <label className="text-zinc-400 uppercase tracking-wider text-xs font-bold font-mono">
        Culinary Mission: Select Target Cuisine
    </label>
    
    <div className="grid grid-cols-2 gap-3 font-sans">
        {[
            { id: "sushi", label: "Sushi / Japanese 🍣", bg: "hover:border-teal-500/30 text-teal-400" },
            { id: "italian", label: "Pasta / Italian 🍝", bg: "hover:border-amber-500/30 text-amber-400" },
            { id: "steak", label: "Steakhouse / Fine Dining 🥩", bg: "hover:border-red-500/30 text-red-400" },
            { id: "burgers", label: "Gourmet Burgers / Casual 🍔", bg: "hover:border-orange-500/30 text-orange-400" },
            { id: "tacos", label: "Mexican / Tacos 🌮", bg: "hover:border-yellow-500/30 text-yellow-400" },
            { id: "cafe", label: "Cute Cafe / Dessert 🍰", bg: "hover:border-pink-500/30 text-pink-400" }
        ].map((item) => (
            <button
                key={item.id}
                type="button" // Prevents the button from accidentally submitting the form early!
                onClick={() => setFoodChoice(item.id)}
                className={`p-3 bg-zinc-900/40 border text-sm rounded-xl transition text-left flex items-center justify-between group ${
                    foodChoice === item.id 
                        ? "border-pink-500 bg-pink-500/10 text-pink-400 font-bold shadow-[0_0_15px_rgba(219,39,119,0.1)]" 
                        : "border-zinc-800 text-zinc-300 " + item.bg
                }`}
            >
                <span>{item.label}</span>
                {foodChoice === item.id && (
                    <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-md uppercase tracking-widest font-mono animate-pulse">
                        Locked
                    </span>
                )}
            </button>
        ))}
    </div>
    
    {/* Hidden input field so HTML form validation requires her to pick a cuisine */}
    <input type="hidden" name="food_choice" value={foodChoice} required />
</div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="requests_pick" className="text-zinc-400 uppercase tracking-wider text-xs font-bold">Any special requests for our date?</label>
                            <textarea id="requests_pick" rows={3} value={requests} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white placeholder-zinc-700 focus:outline-none focus:border-pink-500/50 transition font-sans" placeholder="I want to go to the beach and eat ice cream!" onChange={(e)=>setRequests(e.target.value)}></textarea>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="dislikes_pick" className="text-zinc-400 uppercase tracking-wider text-xs font-bold">Any Dislikes?</label>
                            <input type="text" id="dislikes_pick" value={dislikes} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white placeholder-zinc-700 focus:outline-none focus:border-pink-500/50 transition font-sans" placeholder="Mushrooms, crowded places..." onChange={(e)=>setDislikes(e.target.value)}/>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="questions_pick" className="text-zinc-400 uppercase tracking-wider text-xs font-bold">Any questions?</label>
                            <textarea id="questions_pick" rows={3} value={questions} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white placeholder-zinc-700 focus:outline-none focus:border-pink-500/50 transition font-sans" placeholder="Ask me anything!" onChange={(e)=>setQuestions(e.target.value)}></textarea>
                        </div>

                        <div className="text-center pt-2">
                            <button type="submit" className="w-full md:w-auto px-6 py-3 bg-pink-500 text-white font-sans font-semibold rounded-xl hover:bg-pink-600 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 transition-all duration-300">
                                Lock In Booking
                            </button>
                        </div>
                    </form>
                </div>

                {/* PHASE 4: FINAL SUCCESS CARD */}
                {hasSubmitted && (
                    <div className="w-full max-w-2xl p-8 bg-zinc-900/20 border border-green-500/20 rounded-2xl flex flex-col items-center justify-center gap-4 text-center shadow-xl backdrop-blur-sm">
                        <span className="text-3xl animate-bounce">💚</span>
                        <h1 className="text-xl md:text-2xl font-bold text-green-500 font-sans">
                            Booking Manifested Successfully!
                        </h1>
                        <p className="text-sm text-zinc-400 font-mono max-w-md">
                            Access explicitly granted to the Software Engineer's heart. Check the updated terminal profile calendar grid above!
                        </p>
                        <button 
                            onClick={handleBookAnother}
                            className="mt-2 px-4 py-2 bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 rounded-xl hover:bg-zinc-700 transition font-mono text-xs uppercase tracking-wider"
                        >
                            + Schedule Another Date
                        </button>
                    </div>
                )}

                {/* EXTRA NO FAILURE CARD */}
                {datingResponse === "no" && (
                    <div className="w-full max-w-2xl p-8 bg-zinc-900/10 border border-red-500/20 rounded-2xl flex flex-col items-center justify-center gap-2 text-center shadow-xl backdrop-blur-sm">
                        <span className="text-3xl">⚠️</span>
                        <h1 className="text-xl font-bold text-red-500 font-mono uppercase tracking-wider">
                            Caffeine Engine: Critical Failure
                        </h1>
                        <p className="text-xs text-zinc-500 font-mono">
                            Core sequence termination initialized. Unstable voltage levels detected.
                        </p>
                    </div>
                )}

              <Footer/>
            </main>
        </div>
        
    );
};

export default DatingCalendar;