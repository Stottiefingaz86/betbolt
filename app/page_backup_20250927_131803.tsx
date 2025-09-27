"use client";
import { useViewportHeight } from "@/hooks/useViewportHeight";
import ReelsSwiper from "@/components/ReelsSwiper";
import { useState } from "react";
import { BetSlip365 } from "@/components/betslip/BetSlip365";
import { useBetSlipStore } from "@/lib/store/bet-slip";
import LiquidEther from "@/components/LiquidEther";
import { Receipt, CheckCircle2, Dice6, Share2, Menu } from "lucide-react";
import Image from "next/image";

export default function Page() {
  useViewportHeight();
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false);
  const [isBettingOverlayOpen, setIsBettingOverlayOpen] = useState(false);
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false);
  const [isMarketsDrawerOpen, setIsMarketsDrawerOpen] = useState(false);
  const [currentBet, setCurrentBet] = useState<{
    match: string;
    market: string;
    selection: string;
    odds: number;
  } | null>(null);
  const [stake, setStake] = useState(5);
  const { legs, addLeg } = useBetSlipStore();

  const reels = [
    // Premier League Reels
    {
      id: 'salah-first-goal',
      render: (active: boolean) => {
        return (
          <div className="relative h-app w-full">
            <div className="absolute inset-0 z-0">
              <LiquidEther
                colors={['#dc2626', '#1e40af', '#059669']}
                mouseForce={25}
                cursorSize={120}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.6}
                isBounce={false}
                autoDemo={true}
                autoSpeed={0.8}
                autoIntensity={2.5}
                takeoverDuration={0.3}
                autoResumeDelay={2000}
                autoRampDuration={0.8}
              />
            </div>
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Logo - Top Left */}
            <div className="absolute top-4 left-4 z-30">
              <Image
                src="/flaame.png"
                alt="BetBolt Logo"
                width={60}
                height={60}
              />
            </div>

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
                <button 
                  onClick={() => setIsBetSlipOpen(true)}
                  className="relative"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {legs.length > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                        <span className="text-white text-xs font-bold">{legs.length}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>My Bets</span>
                </button>
              </div>
            </div>

            {/* Main Content - Bottom Left */}
            <div className="absolute bottom-24 left-6 right-6 z-20">
              {/* Match Header */}
              <div className="mb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Image
                    src="/Premier League.svg"
                    alt="Premier League"
                    width={20}
                    height={20}
                    className="opacity-80"
                  />
                  <span className="text-white/60 text-xs">Premier League • Matchday 18</span>
                </div>
                <div className="text-white/80 text-xs mb-2">Today 3:00 PM GMT</div>
                <div className="flex items-center space-x-3">
                  <div className="text-white text-lg font-bold">Liverpool</div>
                  <div className="text-white/40 text-sm">vs</div>
                  <div className="text-white text-lg font-bold">Arsenal</div>
                </div>
              </div>

              {/* Stats & Markets Row */}
              <div className="flex items-center space-x-4 mb-3">
                {/* Stats */}
                <button 
                  onClick={() => setIsStatsDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-white/70 text-xs">Stats</span>
                </button>

                {/* More Markets */}
                <button 
                  onClick={() => setIsMarketsDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-white/70 text-xs">+34</span>
                </button>
              </div>

              {/* Break Line */}
              <div className="w-8 h-px bg-white/30 mb-3"></div>

              {/* Bet Info */}
              <div className="space-y-1 mb-3">
                <div className="text-white/80 text-sm font-medium">First Goalscorer</div>
                <div className="text-white text-xl font-bold">Mohamed Salah</div>
              </div>

              {/* CTA */}
              <button 
                onClick={() => {
                  setCurrentBet({
                    match: "Liverpool vs Arsenal",
                    market: "First Goalscorer",
                    selection: "Mohamed Salah",
                    odds: 450
                  });
                  setIsBettingOverlayOpen(true);
                }}
                className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95 mb-2"
              >
                Bet Now +450
              </button>

            </div>
          </div>
        );
      },
    },
    {
      id: 'chiefs-parlay',
      render: (active: boolean) => {
        return (
          <div className="relative h-app w-full">
            {/* Liquid Background */}
            <div className="absolute inset-0 z-0">
              <LiquidEther
                colors={['#7c3aed', '#eab308', '#3b82f6']}
                mouseForce={25}
                cursorSize={120}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.6}
                isBounce={false}
                autoDemo={true}
                autoSpeed={0.8}
                autoIntensity={2.5}
                takeoverDuration={0.3}
                autoResumeDelay={2000}
                autoRampDuration={0.8}
              />
            </div>
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Logo - Top Left */}
            <div className="absolute top-4 left-4 z-30">
              <Image
                src="/flaame.png"
                alt="BetBolt Logo"
                width={60}
                height={60}
              />
            </div>

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
                <button 
                  onClick={() => setIsBetSlipOpen(true)}
                  className="relative"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {legs.length > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                        <span className="text-white text-xs font-bold">{legs.length}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>My Bets</span>
                </button>
              </div>
            </div>

            {/* Main Content - Bottom Left */}
            <div className="absolute bottom-24 left-6 right-6 z-20">
              {/* Match Header */}
              <div className="mb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Image
                    src="/NFL.svg"
                    alt="NFL"
                    width={20}
                    height={20}
                    className="opacity-80"
                  />
                  <span className="text-white/60 text-xs">NFL • Week 15</span>
                </div>
                <div className="text-white/80 text-xs mb-2">Today 8:20 PM EST</div>
                <div className="flex items-center space-x-3">
                  <div className="text-white text-lg font-bold">Chiefs</div>
                  <div className="text-white/40 text-sm">vs</div>
                  <div className="text-white text-lg font-bold">Bills</div>
                </div>
              </div>

              {/* Stats & Markets Row */}
              <div className="flex items-center space-x-4 mb-3">
                {/* Stats */}
                <button 
                  onClick={() => setIsStatsDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-white/70 text-xs">Stats</span>
                </button>

                {/* More Markets */}
                <button 
                  onClick={() => setIsMarketsDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-white/70 text-xs">+34</span>
                </button>
              </div>

              {/* Break Line */}
              <div className="w-8 h-px bg-white/30 mb-3"></div>

              {/* Parlay Info */}
              <div className="space-y-2 mb-3">
                <div className="text-white/90 text-sm font-medium">Parlay Bundle</div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-white/70 text-xs">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                    <span>Chiefs to Win</span>
                  </div>
                  <div className="flex items-center text-white/70 text-xs">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                    <span>Travis Kelce 1+ TD</span>
                  </div>
                  <div className="flex items-center text-white/70 text-xs">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                    <span>Over 47.5 Total Points</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button 
                onClick={() => {
                  setCurrentBet({
                    match: "Chiefs vs Bills",
                    market: "Parlay",
                    selection: "Chiefs + Kelce TD + Over 47.5",
                    odds: 500
                  });
                  setIsBettingOverlayOpen(true);
                }}
                className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95 mb-2"
              >
                Bet Now +500
              </button>

            </div>
          </div>
        );
      },
    },
    {
      id: 'kelce-first-td',
      render: (active: boolean) => {
        return (
          <div className="relative h-app w-full">
            {/* Liquid Background */}
            <div className="absolute inset-0 z-0">
              <LiquidEther
                colors={['#dc2626', '#1e3a8a', '#059669']}
                mouseForce={25}
                cursorSize={120}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.6}
                isBounce={false}
                autoDemo={true}
                autoSpeed={0.8}
                autoIntensity={2.5}
                takeoverDuration={0.3}
                autoResumeDelay={2000}
                autoRampDuration={0.8}
              />
            </div>
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Logo - Top Left */}
            <div className="absolute top-4 left-4 z-30">
              <Image
                src="/flaame.png"
                alt="BetBolt Logo"
                width={60}
                height={60}
              />
            </div>

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
                <button 
                  onClick={() => setIsBetSlipOpen(true)}
                  className="relative"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {legs.length > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                        <span className="text-white text-xs font-bold">{legs.length}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>My Bets</span>
                </button>
              </div>
            </div>

            {/* Main Content - Bottom Left */}
            <div className="absolute bottom-24 left-6 right-6 z-20">
              {/* Match Header */}
              <div className="mb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Image
                    src="/NFL.svg"
                    alt="NFL"
                    width={20}
                    height={20}
                    className="opacity-80"
                  />
                  <span className="text-white/60 text-xs">NFL • Week 15</span>
                </div>
                <div className="text-white/80 text-xs mb-2">Today 8:20 PM EST</div>
                <div className="flex items-center space-x-3">
                  <div className="text-white text-lg font-bold">Chiefs</div>
                  <div className="text-white/40 text-sm">vs</div>
                  <div className="text-white text-lg font-bold">Bills</div>
                </div>
              </div>

              {/* Stats & Markets Row */}
              <div className="flex items-center space-x-4 mb-3">
                {/* Stats */}
                <button 
                  onClick={() => setIsStatsDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-white/70 text-xs">Stats</span>
                </button>

                {/* More Markets */}
                <button 
                  onClick={() => setIsMarketsDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-white/70 text-xs">+34</span>
                </button>
              </div>

              {/* Break Line */}
              <div className="w-8 h-px bg-white/30 mb-3"></div>

              {/* Bet Info */}
              <div className="space-y-1 mb-3">
                <div className="text-white/80 text-sm font-medium">First Touchdown</div>
                <div className="text-white text-xl font-bold">Travis Kelce</div>
              </div>

              {/* CTA */}
              <button 
                onClick={() => {
                  setCurrentBet({
                    match: "Chiefs vs Bills",
                    market: "First Touchdown",
                    selection: "Travis Kelce",
                    odds: 350
                  });
                  setIsBettingOverlayOpen(true);
                }}
                className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95 mb-2"
              >
                Bet Now +350
              </button>

            </div>
          </div>
        );
      },
    },
    
    // More Premier League
    {
      id: 'over-goals',
      render: (active: boolean) => {
        return (
          <div className="relative h-app w-full">
            <div className="absolute inset-0 z-0">
              <LiquidEther colors={['#059669', '#dc2626', '#7c3aed']} />
            </div>
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <div className="absolute top-4 left-4 z-30">
              <Image src="/flaame.png" alt="BetBolt Logo" width={60} height={60} />
            </div>
            <div className="absolute top-4 right-4 z-30">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-0.5">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">BB</span>
                </div>
              </div>
            </div>
            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
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
              <div className="flex flex-col items-center space-y-2">
                <button onClick={() => setIsBetSlipOpen(true)} className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {legs.length > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                        <span className="text-white text-xs font-bold">{legs.length}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>My Bets</span>
                </button>
              </div>
            </div>
            <div className="absolute bottom-24 left-6 right-6 z-20">
              <div className="mb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Image
                    src="/Premier League.svg"
                    alt="Premier League"
                    width={20}
                    height={20}
                    className="opacity-80"
                  />
                  <span className="text-white/60 text-xs">Premier League • Matchday 18</span>
                </div>
                <div className="text-white/80 text-xs mb-2">Today 3:00 PM GMT</div>
                <div className="flex items-center space-x-3">
                  <div className="text-white text-lg font-bold">Man City</div>
                  <div className="text-white/40 text-sm">vs</div>
                  <div className="text-white text-lg font-bold">Chelsea</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-3">
                <button onClick={() => setIsStatsDrawerOpen(true)} className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-white/70 text-xs">Stats</span>
                </button>
                <button onClick={() => setIsMarketsDrawerOpen(true)} className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-white/70 text-xs">+34</span>
                </button>
              </div>
              <div className="w-8 h-px bg-white/30 mb-3"></div>
              <div className="space-y-1 mb-3">
                <div className="text-white/80 text-sm font-medium">Total Goals</div>
                <div className="text-white text-xl font-bold">Over 3.1 Goals</div>
              </div>
              <button onClick={() => {
                setCurrentBet({
                  match: "Man City vs Chelsea",
                  market: "Total Goals",
                  selection: "Over 3.1",
                  odds: -110
                });
                setIsBettingOverlayOpen(true);
              }} className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95 mb-2">
                Bet Now -110
              </button>
            </div>
          </div>
        );
      },
    },
    
    // NBA Reel
    {
      id: 'lebron-points',
      render: (active: boolean) => {
        return (
          <div className="relative h-app w-full">
            <div className="absolute inset-0 z-0">
              <LiquidEther colors={['#f59e0b', '#dc2626', '#1e40af']} />
            </div>
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <div className="absolute top-4 left-4 z-30">
              <Image src="/flaame.png" alt="BetBolt Logo" width={60} height={60} />
            </div>
            <div className="absolute top-4 right-4 z-30">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-0.5">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">BB</span>
                </div>
              </div>
            </div>
            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
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
              <div className="flex flex-col items-center space-y-2">
                <button onClick={() => setIsBetSlipOpen(true)} className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {legs.length > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                        <span className="text-white text-xs font-bold">{legs.length}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>My Bets</span>
                </button>
              </div>
            </div>
            <div className="absolute bottom-24 left-6 right-6 z-20">
              <div className="mb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Image
                    src="/NBA.svg"
                    alt="NBA"
                    width={20}
                    height={20}
                    className="opacity-80"
                  />
                  <span className="text-white/60 text-xs">NBA • Regular Season</span>
                </div>
                <div className="text-white/80 text-xs mb-2">Tonight 8:00 PM EST</div>
                <div className="flex items-center space-x-3">
                  <div className="text-white text-lg font-bold">Lakers</div>
                  <div className="text-white/40 text-sm">vs</div>
                  <div className="text-white text-lg font-bold">Warriors</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-3">
                <button onClick={() => setIsStatsDrawerOpen(true)} className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-white/70 text-xs">Stats</span>
                </button>
                <button onClick={() => setIsMarketsDrawerOpen(true)} className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-white/70 text-xs">+34</span>
                </button>
              </div>
              <div className="w-8 h-px bg-white/30 mb-3"></div>
              <div className="space-y-1 mb-3">
                <div className="text-white/80 text-sm font-medium">Player Points</div>
                <div className="text-white text-xl font-bold">LeBron James 25+ Points</div>
              </div>
              <button onClick={() => {
                setCurrentBet({
                  match: "Lakers vs Warriors",
                  market: "Player Points",
                  selection: "LeBron James 25+",
                  odds: -120
                });
                setIsBettingOverlayOpen(true);
              }} className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95 mb-2">
                Bet Now -120
              </button>
            </div>
          </div>
        );
      },
    },
    
    // Casino Reel - Simple Blackjack
    {
      id: 'blackjack',
      render: (active: boolean) => {
        return (
          <div className="relative h-app w-full">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/david-lundmark-finnandtheswirlyspin-netent-1.jpg"
                alt="Finn and the Swirly Spin Background"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            
            {/* Logo - Top Left */}
            <div className="absolute top-4 left-4 z-30">
              <Image src="/flaame.png" alt="BetBolt Logo" width={60} height={60} />
            </div>

            {/* User Avatar - Top Right */}
            <div className="absolute top-4 right-4 z-30">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-0.5">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">BB</span>
                </div>
              </div>
            </div>

            {/* Game Tile - Left Aligned */}
            <div className="absolute top-1/2 left-6 transform -translate-y-1/2 z-20" style={{marginTop: '-40px'}}>
              <div className="relative">
                <Image
                  src="/bd1b8570d815a0a8_800x800ar.png"
                  alt="Casino Game"
                  width={120}
                  height={120}
                  className="rounded-lg shadow-2xl border-2 border-white/20"
                />
                {/* Glow effect around game tile */}
                <div className="absolute inset-0 rounded-lg shadow-2xl" style={{
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(139, 92, 246, 0.4)'
                }}></div>
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
                <button onClick={() => setIsBetSlipOpen(true)} className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {legs.length > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                        <span className="text-white text-xs font-bold">{legs.length}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>My Bets</span>
                </button>
              </div>
            </div>

            {/* Main Content - Bottom Left */}
            <div className="absolute bottom-24 left-6 right-6 z-20">
              {/* Game Header */}
              <div className="mb-2">
                <div className="text-white/60 text-xs mb-1">Slot Game • NetEnt</div>
                <div className="text-white text-lg font-bold">Finn and the Swirly Spin</div>
              </div>

              {/* Tournament & Jackpots Buttons */}
              <div className="flex items-center space-x-3 mb-3">
                <button 
                  onClick={() => setIsStatsDrawerOpen(true)}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="text-white/70 text-xs">Tournament</span>
                </button>
                
                <button 
                  onClick={() => setIsMarketsDrawerOpen(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 backdrop-blur-sm hover:from-yellow-500/40 hover:to-orange-500/40 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-yellow-400/30"
                >
                  <svg className="w-4 h-4 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="text-yellow-200 text-xs">Jackpots</span>
                </button>
              </div>

              {/* Break Line */}
              <div className="w-8 h-px bg-white/30 mb-3"></div>

              {/* Game Info */}
              <div className="space-y-1 mb-3">
                <div className="text-white/80 text-sm font-medium">Description</div>
                <div className="text-white text-xl font-bold">Adventure • Irish Theme</div>
                <div className="text-white/60 text-xs">RTP: 96.04% • 7x7 Reels • High Volatility</div>
              </div>

              {/* Play Now Button */}
              <button 
                onClick={() => {
                  setCurrentBet({
                    match: "Finn and the Swirly Spin",
                    market: "Casino",
                    selection: "Play Game",
                    odds: 100
                  });
                  setIsBettingOverlayOpen(true);
                }}
                className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95 mb-2"
              >
                Play Now
              </button>
            </div>
          </div>
        );
      },
    }
  ];

  return (
    <div
      className="relative safari-fullscreen"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: 1
      }}
    >
      <ReelsSwiper items={reels} />
      
      {/* Bet Slip Modal */}
      {isBetSlipOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
            <BetSlip365 onClose={() => setIsBetSlipOpen(false)} />
          </div>
        </div>
      )}

      {/* Betting Overlay */}
      {isBettingOverlayOpen && currentBet && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-white rounded-t-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">{currentBet.selection}</h2>
            <p className="text-gray-600 mb-4">{currentBet.match}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Odds: {currentBet.odds > 0 ? '+' : ''}{currentBet.odds}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setStake(s => Math.max(1, s - 5))}
                  className="bg-gray-200 text-gray-800 rounded-full p-2"
                >
                  -
                </button>
                <span className="text-lg font-semibold">${stake}</span>
                <button
                  onClick={() => setStake(s => s + 5)}
                  className="bg-gray-200 text-gray-800 rounded-full p-2"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-gray-700 text-sm mb-4">
              <span>Potential Win:</span>
              <span>${(stake * (currentBet.odds > 0 ? currentBet.odds / 100 : 100 / Math.abs(currentBet.odds))).toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                addLeg({
                  id: `${currentBet.match}-${currentBet.selection}`,
                  match: currentBet.match,
                  market: currentBet.market,
                  selection: currentBet.selection,
                  odds: currentBet.odds,
                  stake: stake,
                });
                setIsBettingOverlayOpen(false);
                setStake(5); // Reset stake
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              Add to Betslip
            </button>
            <button
              onClick={() => setIsBettingOverlayOpen(false)}
              className="w-full mt-2 text-gray-600 py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Stats Drawer */}
      {isStatsDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsStatsDrawerOpen(false)}></div>
          <div className="relative bg-white rounded-t-3xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Head-to-Head Stats</h2>
                <button 
                  onClick={() => setIsStatsDrawerOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Chiefs vs Bills</h3>
                  <div className="text-sm text-gray-600 mb-4">Last Meeting: Week 6, 2023</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">27</div>
                    <div className="text-sm text-gray-600">Chiefs Points</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">24</div>
                    <div className="text-sm text-gray-600">Bills Points</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Total Yards</span>
                    <div className="flex space-x-4">
                      <span className="font-semibold">Chiefs: 387</span>
                      <span className="font-semibold">Bills: 342</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Passing Yards</span>
                    <div className="flex space-x-4">
                      <span className="font-semibold">Chiefs: 298</span>
                      <span className="font-semibold">Bills: 245</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Rushing Yards</span>
                    <div className="flex space-x-4">
                      <span className="font-semibold">Chiefs: 89</span>
                      <span className="font-semibold">Bills: 97</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Turnovers</span>
                    <div className="flex space-x-4">
                      <span className="font-semibold">Chiefs: 1</span>
                      <span className="font-semibold">Bills: 2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* More Markets Drawer */}
      {isMarketsDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMarketsDrawerOpen(false)}></div>
          <div className="relative bg-white rounded-t-3xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">More Markets</h2>
                <button 
                  onClick={() => setIsMarketsDrawerOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Chiefs vs Bills</h3>
                  <div className="text-sm text-gray-600 mb-6">Today 8:20 PM EST</div>
                </div>

                {/* Moneyline */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Moneyline</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => {
                        setCurrentBet({
                          match: "Chiefs vs Bills",
                          market: "Moneyline",
                          selection: "Chiefs",
                          odds: -120
                        });
                        setIsBettingOverlayOpen(true);
                        setIsMarketsDrawerOpen(false);
                      }}
                      className="bg-white border border-gray-200 rounded-lg p-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-semibold text-gray-900">Chiefs</div>
                      <div className="text-blue-600 font-bold">-120</div>
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentBet({
                          match: "Chiefs vs Bills",
                          market: "Moneyline",
                          selection: "Bills",
                          odds: +110
                        });
                        setIsBettingOverlayOpen(true);
                        setIsMarketsDrawerOpen(false);
                      }}
                      className="bg-white border border-gray-200 rounded-lg p-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-semibold text-gray-900">Bills</div>
                      <div className="text-blue-600 font-bold">+110</div>
                    </button>
                  </div>
                </div>

                {/* Spread */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Spread</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => {
                        setCurrentBet({
                          match: "Chiefs vs Bills",
                          market: "Spread",
                          selection: "Chiefs -3.5",
                          odds: -110
                        });
                        setIsBettingOverlayOpen(true);
                        setIsMarketsDrawerOpen(false);
                      }}
                      className="bg-white border border-gray-200 rounded-lg p-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-semibold text-gray-900">Chiefs -3.5</div>
                      <div className="text-blue-600 font-bold">-110</div>
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentBet({
                          match: "Chiefs vs Bills",
                          market: "Spread",
                          selection: "Bills +3.5",
                          odds: -110
                        });
                        setIsBettingOverlayOpen(true);
                        setIsMarketsDrawerOpen(false);
                      }}
                      className="bg-white border border-gray-200 rounded-lg p-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-semibold text-gray-900">Bills +3.5</div>
                      <div className="text-blue-600 font-bold">-110</div>
                    </button>
                  </div>
                </div>

                {/* Total Points */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Total Points</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => {
                        setCurrentBet({
                          match: "Chiefs vs Bills",
                          market: "Total Points",
                          selection: "Over 47.5",
                          odds: -105
                        });
                        setIsBettingOverlayOpen(true);
                        setIsMarketsDrawerOpen(false);
                      }}
                      className="bg-white border border-gray-200 rounded-lg p-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-semibold text-gray-900">Over 47.5</div>
                      <div className="text-blue-600 font-bold">-105</div>
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentBet({
                          match: "Chiefs vs Bills",
                          market: "Total Points",
                          selection: "Under 47.5",
                          odds: -115
                        });
                        setIsBettingOverlayOpen(true);
                        setIsMarketsDrawerOpen(false);
                      }}
                      className="bg-white border border-gray-200 rounded-lg p-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-semibold text-gray-900">Under 47.5</div>
                      <div className="text-blue-600 font-bold">-115</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}