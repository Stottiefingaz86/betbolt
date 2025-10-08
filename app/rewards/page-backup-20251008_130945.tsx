"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Crown, Star, Gift, Trophy, Target, Clock, Zap, Shield, Users, Award, TrendingUp } from "lucide-react";

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isBalanceDrawerOpen, setIsBalanceDrawerOpen] = useState(false);
  const [missionFilter, setMissionFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Force override body styles for rewards page - must be visible and scrollable
    const html = document.documentElement;
    const body = document.body;
    const nextRoot = document.getElementById('__next');
    
    // Store original styles
    const originalBodyOverflow = body.style.overflow;
    const originalBodyPosition = body.style.position;
    const originalBodyHeight = body.style.height;
    const originalHtmlOverflow = html.style.overflow;
    const originalBodyMaxHeight = body.style.maxHeight;
    
    // Force scrollable state - use setProperty with important flag
    body.style.setProperty('overflow', 'auto', 'important');
    body.style.setProperty('position', 'static', 'important');
    body.style.setProperty('height', 'auto', 'important');
    body.style.setProperty('max-height', 'none', 'important');
    html.style.setProperty('overflow', 'auto', 'important');
    
    // Force Next.js root to be scrollable
    if (nextRoot) {
      nextRoot.style.setProperty('overflow', 'auto', 'important');
      nextRoot.style.setProperty('height', 'auto', 'important');
      nextRoot.style.setProperty('max-height', 'none', 'important');
    }
    
    // Also remove any classes that might prevent scrolling
    body.classList.remove('overflow-hidden', 'h-screen', 'max-h-screen');
    html.classList.remove('overflow-hidden', 'h-screen', 'max-h-screen');
    if (nextRoot) {
      nextRoot.classList.remove('overflow-hidden', 'h-screen', 'max-h-screen');
    }
    
    // Add a style element to force scrolling with targeted overrides
    const style = document.createElement('style');
    style.id = 'rewards-scroll-fix';
    style.textContent = `
      html, body { 
        overflow: auto !important; 
        position: static !important; 
        height: auto !important; 
        max-height: none !important;
        overscroll-behavior: auto !important;
        touch-action: auto !important;
      }
      #__next {
        height: auto !important;
        max-height: none !important;
        overflow: auto !important;
        position: static !important;
        overscroll-behavior: auto !important;
        touch-action: auto !important;
      }
      .rewards-page {
        height: auto !important;
        min-height: 100vh !important;
        overflow: visible !important;
        position: static !important;
        touch-action: auto !important;
      }
      /* Only override scroll prevention, not layout */
      [style*="overflow: hidden"] {
        overflow: auto !important;
      }
      [style*="height: 100vh"] {
        height: auto !important;
        max-height: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Force scroll to top when component mounts
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    return () => {
      // Restore original styles on cleanup
      body.style.overflow = originalBodyOverflow;
      body.style.position = originalBodyPosition;
      body.style.height = originalBodyHeight;
      body.style.maxHeight = originalBodyMaxHeight;
      html.style.overflow = originalHtmlOverflow;
      
      if (nextRoot) {
        nextRoot.style.overflow = '';
        nextRoot.style.height = '';
        nextRoot.style.maxHeight = '';
      }
      
      // Remove the style element
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Mock user data - in real app this would come from API/store
  const userLevel = {
    currentTier: 'Silver',
    currentXP: 3000,
    nextTierXP: 4000,
    progress: 75,
    tierColor: '#C0C0C0',
    nextTier: 'Gold',
    xpNeeded: 1000
  };

  const missions = [
    {
      id: 'daily-spinner',
      title: 'Daily Spinner',
      description: 'Complete 25 slot machine spins to earn your daily reward',
      difficulty: 'Easy',
      timeLeft: '2d 14h',
      reward: '200 XP',
      rewardType: 'xp',
      progress: 12,
      maxProgress: 25,
      category: 'Casino',
      status: 'active'
    },
    {
      id: 'underdog-bet',
      title: 'Underdog Victory',
      description: 'Bet on an underdog to win in any sport',
      difficulty: 'Medium',
      timeLeft: '5d 8h',
      reward: '500 XP + $10 Bonus',
      rewardType: 'mixed',
      progress: 0,
      maxProgress: 1,
      category: 'Sports',
      status: 'inactive'
    },
    {
      id: 'casino-master',
      title: 'Casino Master',
      description: 'Play 50 hands of blackjack',
      difficulty: 'Hard',
      timeLeft: '7d 12h',
      reward: '1000 XP + Loot Box',
      rewardType: 'mixed',
      progress: 23,
      maxProgress: 50,
      category: 'Casino',
      status: 'active'
    },
    {
      id: 'football-fan',
      title: 'Football Fan',
      description: 'Place 10 bets on football matches',
      difficulty: 'Easy',
      timeLeft: '3d 6h',
      reward: '300 XP',
      rewardType: 'xp',
      progress: 7,
      maxProgress: 10,
      category: 'Sports',
      status: 'inactive'
    },
    {
      id: 'high-roller',
      title: 'High Roller',
      description: 'Make 5 bets over $100',
      difficulty: 'Hard',
      timeLeft: '1d 18h',
      reward: '800 XP + $25 Bonus',
      rewardType: 'mixed',
      progress: 2,
      maxProgress: 5,
      category: 'Sports',
      status: 'inactive'
    },
    {
      id: 'slot-champion',
      title: 'Slot Champion',
      description: 'Win 3 jackpots on slot games',
      difficulty: 'Medium',
      timeLeft: '4d 12h',
      reward: '600 XP + Bronze Loot Box',
      rewardType: 'mixed',
      progress: 1,
      maxProgress: 3,
      category: 'Casino',
      status: 'inactive'
    }
  ];

  const lootBoxes = [
    {
      id: 'bronze-1',
      type: 'Bronze',
      acquired: 'Oct 8, 12:09 PM',
      source: 'Welcome Bonus',
      description: 'Contains basic rewards and common items'
    },
    {
      id: 'silver-1',
      type: 'Silver',
      acquired: 'Oct 7, 3:45 PM',
      source: 'Level Up Reward',
      description: 'Contains better rewards and rare items'
    }
  ];

  const tiers = [
    { name: 'Bronze', color: '#CD7F32', xp: 0, icon: '🥉' },
    { name: 'Silver', color: '#C0C0C0', xp: 2000, icon: '🥈', current: true },
    { name: 'Gold', color: '#FFD700', xp: 4000, icon: '🥇' },
    { name: 'Platinum', color: '#E5E4E2', xp: 6000, icon: '💎' },
    { name: 'Diamond', color: '#B9F2FF', xp: 8000, icon: '💠' },
    { name: 'Black', color: '#000000', xp: 10000, icon: '⚫' }
  ];

  const subNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'missions', label: 'Missions', icon: Target },
    { id: 'loot-boxes', label: 'Loot Boxes', icon: Gift },
  ];

  const getTierIndex = (tierName: string) => {
    return tiers.findIndex(tier => tier.name === tierName);
  };

  const currentTierIndex = getTierIndex(userLevel.currentTier);
  const nextTier = tiers[currentTierIndex + 1];

  return (
    <div 
      className="rewards-page bg-gradient-to-br from-purple-900/30 via-black to-purple-800/20 text-white min-h-screen"
      style={{
        position: 'relative',
        overflow: 'auto',
        height: 'auto',
        minHeight: '100vh',
        width: '100%',
        top: 'auto',
        left: 'auto',
        margin: 0,
        padding: 0
      }}
    >
      {/* Header - Logo and Balance (Same as Casino) */}
      <div className="relative top-0 left-0 right-0 z-40 pt-4" style={{background: 'transparent'}}>
        <div className="flex items-center justify-between px-4 pb-4" style={{background: 'transparent'}}>
          {/* Back Arrow and Logo - Top Left */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h17" />
              </svg>
            </Link>
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/flaame.png"
                alt="BetBolt Logo"
                width={60}
                height={60}
              />
            </Link>
          </div>

          {/* User Avatar & Balance - Top Right */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsBalanceDrawerOpen(true)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-2 flex items-center space-x-3 hover:bg-white/20 transition-all duration-200"
            >
              {/* User Avatar */}
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold">BB</span>
              </div>
              
              {/* Divider */}
              <div className="w-px h-4 bg-white/30"></div>
              
              {/* Balance */}
              <div className="flex items-baseline space-x-1">
                <span className="text-white/60 text-xs">$</span>
                <span className="text-white text-sm font-bold">1,250.00</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation (Same as Casino) */}
      <div className="sticky top-0 z-50 px-2 mb-6">
        <div className="flex space-x-1 bg-black/20 backdrop-blur-md border border-white/20 p-1 rounded-lg overflow-x-auto scrollbar-hide">
          {subNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-white text-black font-medium'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={16} />
                <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-2 pb-32">
        <div className="space-y-6">

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <>
              {/* Level Progress Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                {/* Level Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Crown className="w-6 h-6" style={{ color: userLevel.tierColor }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{userLevel.currentTier} Tier</h2>
                      <p className="text-white/70">{userLevel.currentXP.toLocaleString()} / {userLevel.nextTierXP.toLocaleString()} XP</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-sm">Next Tier</p>
                    <p className="text-white font-semibold">{nextTier?.name}</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative mb-4">
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${userLevel.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-white/70 text-sm">{userLevel.progress}% to {nextTier?.name}</span>
                    <span className="text-white/70 text-sm">{userLevel.xpNeeded.toLocaleString()} XP needed</span>
                  </div>
                </div>

                {/* Buttons - Below the level info */}
                <div className="flex items-center justify-between">
                  <button className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors">
                    My Benefits
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors">
                    Levels
                  </button>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* My Missions */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-bold text-lg mb-1">My Missions</p>
                  <p className="text-white/70 text-sm">{missions.filter(m => m.status === 'active').length} in progress</p>
                </div>

                {/* Available Loot Boxes */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-bold text-lg mb-1">Loot Boxes</p>
                  <p className="text-white/70 text-sm">{lootBoxes.length} available</p>
                </div>

                {/* Current Streak */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-bold text-lg mb-1">Daily Streak</p>
                  <p className="text-white/70 text-sm">7 days</p>
                </div>

                {/* Total Rewards */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-bold text-lg mb-1">Total Rewards</p>
                  <p className="text-white/70 text-sm">$250 earned</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">Mission Completed</div>
                        <div className="text-white/60 text-sm">Daily Spinner</div>
                      </div>
                    </div>
                    <div className="text-green-400 font-bold">+200 XP</div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <Gift className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">Loot Box Opened</div>
                        <div className="text-white/60 text-sm">Bronze Box</div>
                      </div>
                    </div>
                    <div className="text-purple-400 font-bold">$50</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Missions Tab */}
          {activeTab === 'missions' && (
            <div className="space-y-4">
              {/* Compact Filter Toggle */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-white/70 text-sm">Filters:</span>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-lg text-xs ${
                        missionFilter === 'all' ? 'bg-white text-black' : 'bg-white/10 text-white/70'
                      }`}>
                        {missionFilter === 'all' ? 'All Categories' : missionFilter}
                      </span>
                      <span className={`px-2 py-1 rounded-lg text-xs ${
                        difficultyFilter === 'all' ? 'bg-white text-black' : 'bg-white/10 text-white/70'
                      }`}>
                        {difficultyFilter === 'all' ? 'All Difficulty' : difficultyFilter}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <svg 
                      className={`w-4 h-4 text-white/70 transition-transform ${showFilters ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Category Filter */}
                      <div>
                        <label className="text-white/70 text-xs mb-2 block">Category</label>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setMissionFilter('all')}
                            className={`px-2 py-1 rounded text-xs transition-colors ${
                              missionFilter === 'all' 
                                ? 'bg-white text-black font-medium' 
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            All
                          </button>
                          <button
                            onClick={() => setMissionFilter('casino')}
                            className={`px-2 py-1 rounded text-xs transition-colors ${
                              missionFilter === 'casino' 
                                ? 'bg-white text-black font-medium' 
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            Casino
                          </button>
                          <button
                            onClick={() => setMissionFilter('sports')}
                            className={`px-2 py-1 rounded text-xs transition-colors ${
                              missionFilter === 'sports' 
                                ? 'bg-white text-black font-medium' 
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            Sports
                          </button>
                        </div>
                      </div>

                      {/* Difficulty Filter */}
                      <div>
                        <label className="text-white/70 text-xs mb-2 block">Difficulty</label>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setDifficultyFilter('all')}
                            className={`px-2 py-1 rounded text-xs transition-colors ${
                              difficultyFilter === 'all' 
                                ? 'bg-white text-black font-medium' 
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            All
                          </button>
                          <button
                            onClick={() => setDifficultyFilter('easy')}
                            className={`px-2 py-1 rounded text-xs transition-colors ${
                              difficultyFilter === 'easy' 
                                ? 'bg-white text-black font-medium' 
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            Easy
                          </button>
                          <button
                            onClick={() => setDifficultyFilter('medium')}
                            className={`px-2 py-1 rounded text-xs transition-colors ${
                              difficultyFilter === 'medium' 
                                ? 'bg-white text-black font-medium' 
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            Med
                          </button>
                          <button
                            onClick={() => setDifficultyFilter('hard')}
                            className={`px-2 py-1 rounded text-xs transition-colors ${
                              difficultyFilter === 'hard' 
                                ? 'bg-white text-black font-medium' 
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            Hard
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Filtered Missions - Active First */}
              <div className="space-y-4">
                {missions
                  .filter(mission => {
                    const categoryMatch = missionFilter === 'all' || mission.category.toLowerCase() === missionFilter;
                    const difficultyMatch = difficultyFilter === 'all' || mission.difficulty.toLowerCase() === difficultyFilter;
                    return categoryMatch && difficultyMatch;
                  })
                  .sort((a, b) => {
                    // Sort active missions first
                    if (a.status === 'active' && b.status !== 'active') return -1;
                    if (b.status === 'active' && a.status !== 'active') return 1;
                    return 0;
                  })
                  .map((mission) => (
                  <div key={mission.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-bold text-white">{mission.title}</h3>
                          {mission.status === 'active' && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-white/70 text-sm">{mission.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ml-2 ${
                        mission.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        mission.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {mission.difficulty}
                      </span>
                    </div>
                    
                    {mission.status === 'active' && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-white/70 mb-2">
                          <span>Progress: {mission.progress}/{mission.maxProgress}</span>
                          <span>{mission.timeLeft}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: `${(mission.progress / mission.maxProgress) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white text-sm">{mission.reward}</span>
                      </div>
                      <button className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        mission.status === 'active' 
                          ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white' 
                          : 'bg-white text-black hover:bg-white/90'
                      }`}>
                        {mission.status === 'active' ? 'In Progress' : 'Activate'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loot Boxes Tab */}
          {activeTab === 'loot-boxes' && (
            <div className="space-y-4">
              {lootBoxes.map((box) => (
                <div key={box.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        box.type === 'Bronze' ? 'bg-gradient-to-br from-orange-500/20 to-amber-500/20' :
                        box.type === 'Silver' ? 'bg-gradient-to-br from-gray-400/20 to-gray-300/20' :
                        box.type === 'Gold' ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-400/20' :
                        'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                      }`}>
                        <Gift className={`w-8 h-8 ${
                          box.type === 'Bronze' ? 'text-orange-400' :
                          box.type === 'Silver' ? 'text-gray-400' :
                          box.type === 'Gold' ? 'text-yellow-400' :
                          'text-purple-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{box.type} Loot Box</h3>
                        <p className="text-white/70 text-sm">{box.description}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ml-4 flex-shrink-0 ${
                      box.type === 'Bronze' ? 'bg-orange-500/20 text-orange-400' :
                      box.type === 'Silver' ? 'bg-gray-500/20 text-gray-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {box.type} Box
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-white/50" />
                      <p className="text-white/50 text-xs">Acquired {box.acquired}</p>
                    </div>
                    <p className="text-white/50 text-xs">From: {box.source}</p>
                  </div>
                  
                  <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-3 text-white font-medium transition-colors flex items-center justify-center space-x-2">
                    <Gift className="w-4 h-4" />
                    <span>Open</span>
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Bottom Glass Module (Same as Casino) */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-full px-4 py-3 flex items-center space-x-6">
          {/* Back to Top Icon */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 hover:bg-white/10 transition-all duration-200 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>

          {/* Rewards Icon */}
          <button className="p-2 hover:bg-white/10 transition-all duration-200 rounded-full">
            <Trophy className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}