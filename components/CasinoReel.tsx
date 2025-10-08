"use client";

import Image from "next/image";
import { useState } from "react";

interface CasinoReelProps {
  gameName: string;
  provider: string;
  rtp: string;
  volatility: string;
  reelsRows: string;
  themes: string[];
  features: string[];
  thumbnail: string;
  onPlay: () => void;
}

export default function CasinoReel({
  gameName,
  provider,
  rtp,
  volatility,
  reelsRows,
  themes,
  features,
  thumbnail,
  onPlay
}: CasinoReelProps) {
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false);
  const [isMarketsDrawerOpen, setIsMarketsDrawerOpen] = useState(false);

  return (
    <div className="relative h-app w-full">
      {/* Background with light rays effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
        
        {/* Light rays effect */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-yellow-300/80 via-yellow-200/40 to-transparent transform -skew-x-12"></div>
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-yellow-300/60 via-yellow-200/30 to-transparent transform -skew-x-12"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-yellow-300/70 via-yellow-200/35 to-transparent transform -skew-x-12"></div>
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-yellow-300/50 via-yellow-200/25 to-transparent transform -skew-x-12"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-yellow-300/40 via-yellow-200/20 to-transparent transform -skew-x-12"></div>
          
          {/* Additional light rays from different angles */}
          <div className="absolute top-0 left-1/6 w-px h-full bg-gradient-to-b from-orange-300/50 via-orange-200/25 to-transparent transform skew-x-12"></div>
          <div className="absolute top-0 left-5/6 w-px h-full bg-gradient-to-b from-orange-300/40 via-orange-200/20 to-transparent transform skew-x-12"></div>
        </div>
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>


      {/* User Avatar - Top Right */}
      <div className="absolute top-4 right-4 z-30">
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-0.5">
          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
            <span className="text-white text-sm font-bold">BB</span>
          </div>
        </div>
      </div>

      {/* Side Menu - Instagram Reels Style */}
      <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
        {/* Menu */}
        <div className="flex flex-col items-center space-y-2">
          <button className="relative">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M8 18h8" />
              </svg>
            </div>
            <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Menu</span>
          </button>
        </div>

        {/* Like */}
        <div className="flex flex-col items-center space-y-2">
          <button className="relative">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
          </button>
        </div>

        {/* Casino */}
        <div className="flex flex-col items-center space-y-2">
          <button className="relative">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Casino</span>
          </button>
        </div>

        {/* My Bets */}
        <div className="flex flex-col items-center space-y-2">
          <button className="relative">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>My Bets</span>
          </button>
        </div>
      </div>

      {/* Game Thumbnail - Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <Image
            src={thumbnail}
            alt={gameName}
            width={200}
            height={150}
            className="rounded-lg shadow-2xl border-2 border-yellow-400/50"
          />
          {/* Glow effect around thumbnail */}
          <div className="absolute inset-0 rounded-lg shadow-2xl" style={{
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 165, 0, 0.3)'
          }}></div>
        </div>
      </div>

      {/* Main Content - Bottom Left */}
      <div className="absolute bottom-24 left-6 right-6 z-20">
        {/* Game Info Header */}
        <div className="mb-2">
          <div className="text-yellow-300/80 text-xs mb-1">Live Casino • {provider}</div>
          <div className="text-white/80 text-xs mb-2">Now Playing</div>
          <div className="text-white text-lg font-bold">{gameName}</div>
        </div>

        {/* Tournament Button */}
        <div className="mb-3">
          <button 
            onClick={() => setIsStatsDrawerOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-sm hover:from-purple-500/40 hover:to-blue-500/40 rounded-lg px-4 py-2 transition-all duration-200 active:scale-95 border border-purple-400/30"
          >
            <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-purple-200 text-xs font-medium">Tournament</span>
          </button>
        </div>

        {/* Break Line */}
        <div className="w-8 h-px bg-yellow-300/30 mb-3"></div>

        {/* Game Info with Light Rays Background */}
        <div className="relative bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-yellow-400/30 mb-3">
          {/* Light rays effect behind content */}
          <div className="absolute inset-0 rounded-lg opacity-20">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-yellow-300 via-yellow-200 to-transparent transform -skew-x-12"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-yellow-300 via-yellow-200 to-transparent transform -skew-x-12"></div>
            <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-yellow-300 via-yellow-200 to-transparent transform -skew-x-12"></div>
          </div>

          <div className="relative z-10">
            {/* Game Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-yellow-300/80 text-xs">RTP</div>
                <div className="text-white text-lg font-bold">{rtp}</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-300/80 text-xs">Volatility</div>
                <div className="text-white text-lg font-bold">{volatility}</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-300/80 text-xs">Reels & Rows</div>
                <div className="text-white text-lg font-bold">{reelsRows}</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-300/80 text-xs">Provider</div>
                <div className="text-white text-lg font-bold">{provider}</div>
              </div>
            </div>

            {/* Themes & Features */}
            <div className="space-y-2">
              <div className="text-yellow-300/80 text-xs">Themes & Features</div>
              <div className="flex flex-wrap gap-2">
                {themes.map((theme, index) => (
                  <span key={index} className="bg-yellow-400/20 text-yellow-200 text-xs px-2 py-1 rounded-full border border-yellow-400/30">
                    {theme}
                  </span>
                ))}
                {features.map((feature, index) => (
                  <span key={index} className="bg-orange-400/20 text-orange-200 text-xs px-2 py-1 rounded-full border border-orange-400/30">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Play Now Button */}
        <button 
          onClick={onPlay}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-3 px-6 rounded-lg text-sm font-bold transition-all duration-200 hover:from-yellow-300 hover:to-orange-400 active:scale-95 mb-2 shadow-lg"
        >
          Play Now
        </button>
      </div>

      {/* Tournament Drawer */}
      {isStatsDrawerOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-gray-900 w-full h-2/3 rounded-t-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-xl font-bold">Live Tournament</h2>
              <button 
                onClick={() => setIsStatsDrawerOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-4 border border-purple-400/30">
                <h3 className="text-purple-300 font-semibold mb-2">🏆 Finn's Adventure Tournament</h3>
                <p className="text-white mb-2">Prize Pool: $50,000</p>
                <p className="text-white/80 text-sm">Ends in 2h 34m</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-yellow-400 font-semibold mb-2">Leaderboard</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white">🥇 DragonMaster92</span>
                    <span className="text-yellow-400">$12,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">🥈 FinnHero</span>
                    <span className="text-gray-300">$8,920</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">🥉 AdventureKing</span>
                    <span className="text-orange-400">$6,780</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-yellow-400 font-semibold mb-2">Your Position</h3>
                <p className="text-white">#127 - $245 winnings</p>
                <p className="text-white/60 text-sm mt-1">Keep playing to climb the leaderboard!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* More Markets Drawer */}
      {isMarketsDrawerOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-gray-900 w-full h-2/3 rounded-t-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-xl font-bold">More Casino Games</h2>
              <button 
                onClick={() => setIsMarketsDrawerOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Starburst", provider: "NetEnt", rtp: "96.09%" },
                { name: "Book of Dead", provider: "Play'n GO", rtp: "96.21%" },
                { name: "Gonzo's Quest", provider: "NetEnt", rtp: "96.00%" },
                { name: "Mega Moolah", provider: "Microgaming", rtp: "88.12%" },
                { name: "Dead or Alive 2", provider: "NetEnt", rtp: "96.82%" },
                { name: "Reactoonz", provider: "Play'n GO", rtp: "96.51%" }
              ].map((game, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-1">{game.name}</h3>
                  <p className="text-yellow-400 text-sm mb-2">{game.provider}</p>
                  <p className="text-white/60 text-xs">RTP: {game.rtp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
