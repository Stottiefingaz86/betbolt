"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Crown, Star, Gift, Trophy, Target, Clock, Zap, Shield, Users, Award, TrendingUp } from "lucide-react";

// Mission data defined outside component to avoid initialization issues
const missions = [
  {
    id: 'daily-spinner',
    title: 'Daily Spinner',
    description: 'Complete 25 slot machine spins to earn your daily reward',
    difficulty: 'Easy',
    category: 'slots',
    status: 'inactive' as const,
    progress: 0,
    target: 25,
    reward: '500 XP + $10 Bonus',
    timeLeft: '2 days',
  },
  {
    id: 'underdog-bet',
    title: 'Underdog Victory',
    description: 'Place 3 bets on underdogs with odds +200 or higher',
    difficulty: 'Medium',
    category: 'sports',
    status: 'active' as const,
    progress: 1,
    target: 3,
    reward: '750 XP + $25 Bonus',
    timeLeft: '1 day',
  },
  {
    id: 'casino-master',
    title: 'Casino Master',
    description: 'Win 5 consecutive casino games',
    difficulty: 'Hard',
    category: 'casino',
    status: 'inactive' as const,
    progress: 0,
    target: 5,
    reward: '1000 XP + $50 Bonus',
    timeLeft: '3 days',
  },
  {
    id: 'loyalty-streak',
    title: 'Loyalty Streak',
    description: 'Login for 7 consecutive days',
    difficulty: 'Easy',
    category: 'general',
    status: 'active' as const,
    progress: 4,
    target: 7,
    reward: '300 XP + $5 Bonus',
    timeLeft: '5 days',
  },
];

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isBalanceDrawerOpen, setIsBalanceDrawerOpen] = useState(false);
  const [missionFilter, setMissionFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [missionStates, setMissionStates] = useState(missions);

  const activateMission = (missionId: string) => {
    setMissionStates(prev => prev.map(mission => 
      mission.id === missionId 
        ? { ...mission, status: 'active' as const }
        : mission
    ));
  };

  useEffect(() => {
    // Force override body styles for rewards page - must be visible and scrollable
    const html = document.documentElement;
    const body = document.body;
    const nextRoot = document.getElementById('__next');
    
    // Remove all scroll prevention classes and styles
    if (html) {
      html.style.overflow = 'auto !important';
      html.style.position = 'static !important';
      html.style.height = 'auto !important';
      html.style.maxHeight = 'none !important';
      html.style.overscrollBehavior = 'auto !important';
      html.style.touchAction = 'auto !important';
      html.classList.remove('no-overscroll', 'overflow-hidden');
    }
    
    if (body) {
      body.style.overflow = 'auto !important';
      body.style.position = 'static !important';
      body.style.height = 'auto !important';
      body.style.maxHeight = 'none !important';
      body.style.overscrollBehavior = 'auto !important';
      body.style.touchAction = 'auto !important';
      body.classList.remove('no-overscroll', 'overflow-hidden');
    }
    
    if (nextRoot) {
      nextRoot.style.overflow = 'auto !important';
      nextRoot.style.position = 'static !important';
      nextRoot.style.height = 'auto !important';
      nextRoot.style.maxHeight = 'none !important';
      nextRoot.style.overscrollBehavior = 'auto !important';
      nextRoot.style.touchAction = 'auto !important';
    }

    // Cleanup function to restore original styles if needed
    return () => {
      // Note: We don't restore original styles on cleanup to maintain scrollability
    };
  }, []);

  // User data - would come from your auth system
  const userData = {
    level: 'Silver',
    currentXP: 3000,
    nextTierXP: 4000,
    progress: 75,
    tierColor: '#C0C0C0',
    nextTier: 'Gold',
    xpNeeded: 1000
  };

  const lootBoxes = [
    {
      id: 'bronze-1',
      type: 'Bronze',
      title: 'Bronze Loot Box',
      description: 'Contains small rewards and XP boosts',
      price: 'Free',
      rarity: 'Common'
    },
    {
      id: 'silver-1',
      type: 'Silver',
      title: 'Silver Loot Box',
      description: 'Contains medium rewards and bonus cash',
      price: 'Free',
      rarity: 'Uncommon'
    },
    {
      id: 'gold-1',
      type: 'Gold',
      title: 'Gold Loot Box',
      description: 'Contains large rewards and special bonuses',
      price: 'Free',
      rarity: 'Rare'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rewards-page">
      {/* Header - Same as Casino */}
      <div className="relative z-50">
        <div className="absolute top-0 left-0 right-0 z-50">
          <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
            <div className="px-4 py-3 flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/flaame.png" alt="BetBolt" width={32} height={32} />
                <span className="text-white font-bold text-lg">BetBolt</span>
              </Link>

              {/* Balance */}
              <button 
                onClick={() => setIsBalanceDrawerOpen(true)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white font-medium">$1,247.50</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 px-4 pb-24">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-white/5 backdrop-blur-sm rounded-lg p-1">
          {['dashboard', 'missions', 'loot-boxes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-white text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Level Progress Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{ backgroundColor: userData.tierColor + '20' }}>
                    <Crown className={`w-6 h-6`} style={{ color: userData.tierColor }} />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-xl">{userData.level} Tier</h2>
                    <p className="text-white/70 text-sm">{userData.currentXP} / {userData.nextTierXP} XP</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg">{userData.progress}%</p>
                  <p className="text-white/70 text-sm">to {userData.nextTier}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${userData.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-transparent border border-white/20 text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors">
                  My Benefits
                </button>
                <button className="flex-1 bg-white text-black py-2 px-4 rounded-lg hover:bg-white/90 transition-colors">
                  Levels
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* My Missions - Clickable */}
              <button 
                onClick={() => setActiveTab('missions')}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-bold text-lg mb-1">My Missions</p>
                <p className="text-white/70 text-sm">{missionStates.filter(m => m.status === 'active').length} in progress</p>
              </button>

              {/* Available Loot Boxes - Clickable */}
              <button 
                onClick={() => setActiveTab('loot-boxes')}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-bold text-lg mb-1">Loot Boxes</p>
                <p className="text-white/70 text-sm">{lootBoxes.length} available</p>
              </button>

              {/* Current Streak */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-bold text-lg mb-1">Current Streak</p>
                <p className="text-white/70 text-sm">7 days</p>
              </div>

              {/* Total Rewards */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-bold text-lg mb-1">Total Rewards</p>
                <p className="text-white/70 text-sm">$247.50</p>
              </div>
            </div>
          </div>
        )}

        {/* Missions Tab */}
        {activeTab === 'missions' && (
          <div className="space-y-6">
            {/* Filter Section - Collapsible */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between text-white"
              >
                <span className="font-medium">Filters</span>
                <span className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {showFilters && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Category</label>
                    <select
                      value={missionFilter}
                      onChange={(e) => setMissionFilter(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                    >
                      <option value="all">All Categories</option>
                      <option value="slots">Slots</option>
                      <option value="sports">Sports</option>
                      <option value="casino">Casino</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                  
                  {/* Difficulty Filter */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Difficulty</label>
                    <select
                      value={difficultyFilter}
                      onChange={(e) => setDifficultyFilter(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                    >
                      <option value="all">All Difficulties</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
              )}
              
              {/* Active Filters Display */}
              {!showFilters && (missionFilter !== 'all' || difficultyFilter !== 'all') && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {missionFilter !== 'all' && (
                    <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">
                      {missionFilter}
                    </span>
                  )}
                  {difficultyFilter !== 'all' && (
                    <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">
                      {difficultyFilter}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Filtered Missions - Active First */}
            <div className="space-y-4">
              {missionStates
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
                      <p className="text-white/70 text-sm mb-2">{mission.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-white/60">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{mission.timeLeft}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Target className="w-3 h-3" />
                          <span>{mission.progress}/{mission.target}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  {mission.status === 'active' && (
                    <div className="mb-3">
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(mission.progress / mission.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-white text-sm">{mission.reward}</span>
                    </div>
                    <button 
                      onClick={() => mission.status !== 'active' && activateMission(mission.id)}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        mission.status === 'active' 
                          ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white cursor-default' 
                          : 'bg-white text-black hover:bg-white/90 cursor-pointer'
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
                  <div className="flex items-center space-x-4">
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
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-bold text-white">{box.title}</h3>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          box.type === 'Bronze' ? 'bg-orange-500/20 text-orange-400' :
                          box.type === 'Silver' ? 'bg-gray-500/20 text-gray-400' :
                          box.type === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {box.type}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm mb-2">{box.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-white/60">
                        <span className="flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>{box.rarity}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>{box.price}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                  Open Loot Box
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation - Glass Module */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-black/20 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-around">
              <Link href="/" className="flex flex-col items-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">H</span>
                </div>
                <span className="text-white text-xs">Home</span>
              </Link>
              
              <Link href="/casino" className="flex flex-col items-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">C</span>
                </div>
                <span className="text-white text-xs">Casino</span>
              </Link>
              
              <div className="flex flex-col items-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">R</span>
                </div>
                <span className="text-white text-xs">Rewards</span>
              </div>
              
              <Link href="/rg" className="flex flex-col items-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">RG</span>
                </div>
                <span className="text-white text-xs">RG</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
