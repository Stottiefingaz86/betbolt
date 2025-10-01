"use client";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-8">BetBolt</h1>
      <p className="text-xl mb-8">Sports Betting Reels</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
      >
        Click Count: {count}
      </button>
      <p className="mt-8 text-gray-400">If you can see this, the app is working!</p>
    </div>
  );
}
