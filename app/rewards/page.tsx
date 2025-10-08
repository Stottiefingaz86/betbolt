"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Crown, Star, Gift, Trophy, Target, Clock, Zap, Shield, Users, Award, TrendingUp, DollarSign, Coins, Dice1, Sparkles } from "lucide-react";

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
  const [isBenefitsDrawerOpen, setIsBenefitsDrawerOpen] = useState(false);
  const [isLevelsDrawerOpen, setIsLevelsDrawerOpen] = useState(false);
  const [isLootBoxOpen, setIsLootBoxOpen] = useState(false);
  const [lootBoxAnimation, setLootBoxAnimation] = useState(false);
  const [lootBoxPrize, setLootBoxPrize] = useState<any>(null);
  const [reelPosition, setReelPosition] = useState(0);
  const [isNudging, setIsNudging] = useState(false);
  const [isTournamentsDrawerOpen, setIsTournamentsDrawerOpen] = useState(false);
  const [activeTournamentTab, setActiveTournamentTab] = useState('daily-races');

  const activateMission = (missionId: string) => {
    setMissionStates(prev => prev.map(mission => 
      mission.id === missionId 
        ? { ...mission, status: 'active' as const }
        : mission
    ));
  };

  const openLootBox = (boxType: string) => {
    setIsLootBoxOpen(true);
    setLootBoxPrize(null);
    setLootBoxAnimation(true);
    setReelPosition(0);

    // Start the spinning animation
    const startTime = Date.now();
    const spinDuration = Math.random() * 2000 + 2500; // Random 2.5-4.5 seconds
    
    // Random spin characteristics
    const baseSpins = Math.random() * 6 + 4; // 4-10 full rotations (more reasonable)
    const slotHeight = 80;
    const totalSlots = 50; // Match the number of slots we generate
    const maxSlotsToMove = Math.min(totalSlots - 10, baseSpins * 6 + Math.random() * 6); // Ensure we don't go past the end
    const maxPosition = maxSlotsToMove * slotHeight;
    
    const spinInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      // Create a more realistic deceleration curve with slight bounce
      const easeOut = 1 - Math.pow(1 - progress, 2.5);
      
      // Add some randomness to the position for more natural feel
      const randomOffset = Math.sin(elapsed * 0.01) * 2; // Subtle wobble
      const currentPosition = (maxPosition * easeOut) + randomOffset;
      setReelPosition(currentPosition);
      
      if (progress >= 1) {
        clearInterval(spinInterval);
        
        // Generate random prize first
        const prizes = {
          'Bronze': [
            { type: 'Cash', value: '$5', iconComponent: Coins, bgColor: 'bg-green-50/50', borderColor: 'border-green-200/50', textColor: 'text-green-700', iconColor: 'text-green-600' },
            { type: 'Free Spins', value: '10 Free Spins', iconComponent: Dice1, bgColor: 'bg-purple-50/50', borderColor: 'border-purple-200/50', textColor: 'text-purple-700', iconColor: 'text-purple-600' },
            { type: 'Risk Free Bet', value: '$10 Risk Free', iconComponent: Shield, bgColor: 'bg-blue-50/50', borderColor: 'border-blue-200/50', textColor: 'text-blue-700', iconColor: 'text-blue-600' },
            { type: 'Special Mission', value: 'Daily Mission', iconComponent: Target, bgColor: 'bg-orange-50/50', borderColor: 'border-orange-200/50', textColor: 'text-orange-700', iconColor: 'text-orange-600' },
            { type: 'Loot Box', value: 'Bronze Box', iconComponent: Gift, bgColor: 'bg-amber-50/50', borderColor: 'border-amber-200/50', textColor: 'text-amber-700', iconColor: 'text-amber-600' }
          ],
          'Silver': [
            { type: 'Cash', value: '$25', iconComponent: Coins, bgColor: 'bg-green-50/50', borderColor: 'border-green-200/50', textColor: 'text-green-700', iconColor: 'text-green-600' },
            { type: 'Free Spins', value: '50 Free Spins', iconComponent: Dice1, bgColor: 'bg-purple-50/50', borderColor: 'border-purple-200/50', textColor: 'text-purple-700', iconColor: 'text-purple-600' },
            { type: 'Risk Free Bet', value: '$25 Risk Free', iconComponent: Shield, bgColor: 'bg-blue-50/50', borderColor: 'border-blue-200/50', textColor: 'text-blue-700', iconColor: 'text-blue-600' },
            { type: 'Special Mission', value: 'Weekly Mission', iconComponent: Target, bgColor: 'bg-orange-50/50', borderColor: 'border-orange-200/50', textColor: 'text-orange-700', iconColor: 'text-orange-600' },
            { type: 'Loot Box', value: 'Silver Box', iconComponent: Gift, bgColor: 'bg-amber-50/50', borderColor: 'border-amber-200/50', textColor: 'text-amber-700', iconColor: 'text-amber-600' },
            { type: 'Cash', value: '$15', iconComponent: Coins, bgColor: 'bg-green-50/50', borderColor: 'border-green-200/50', textColor: 'text-green-700', iconColor: 'text-green-600' }
          ],
          'Gold': [
            { type: 'Cash', value: '$100', iconComponent: Coins, bgColor: 'bg-green-50/50', borderColor: 'border-green-200/50', textColor: 'text-green-700', iconColor: 'text-green-600' },
            { type: 'Free Spins', value: '100 Free Spins', iconComponent: Dice1, bgColor: 'bg-purple-50/50', borderColor: 'border-purple-200/50', textColor: 'text-purple-700', iconColor: 'text-purple-600' },
            { type: 'Risk Free Bet', value: '$50 Risk Free', iconComponent: Shield, bgColor: 'bg-blue-50/50', borderColor: 'border-blue-200/50', textColor: 'text-blue-700', iconColor: 'text-blue-600' },
            { type: 'Special Mission', value: 'VIP Mission', iconComponent: Target, bgColor: 'bg-orange-50/50', borderColor: 'border-orange-200/50', textColor: 'text-orange-700', iconColor: 'text-orange-600' },
            { type: 'Loot Box', value: 'Gold Box', iconComponent: Gift, bgColor: 'bg-amber-50/50', borderColor: 'border-amber-200/50', textColor: 'text-amber-700', iconColor: 'text-amber-600' },
            { type: 'Cash', value: '$50', iconComponent: Coins, bgColor: 'bg-green-50/50', borderColor: 'border-green-200/50', textColor: 'text-green-700', iconColor: 'text-green-600' }
          ]
        };

        const boxPrizes = prizes[boxType as keyof typeof prizes] || prizes['Bronze'];
        const randomPrize = boxPrizes[Math.floor(Math.random() * boxPrizes.length)];
        
        // Calculate the exact current slot position
        const currentSlot = Math.round(currentPosition / slotHeight);
        
        // Find the nearest slot to the current position (more precise)
        const nearestSlot = Math.max(5, Math.min(totalSlots - 15, currentSlot));
        const nearestPosition = nearestSlot * slotHeight;
        
        // Start nudge effect - first pause, then nudge to nearest item
        setIsNudging(true);
        
        // Pause briefly at current position
        setTimeout(() => {
          // Nudge to the nearest slot with smooth transition
          setReelPosition(nearestPosition);
          
          // Wait longer before showing prize to build suspense
          setTimeout(() => {
            setLootBoxPrize(randomPrize);
            setLootBoxAnimation(false);
            setIsNudging(false);
          }, 800); // Increased delay for more suspense
        }, 500); // Increased pause time
      }
    }, 16); // ~60fps
  };

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

  // Levels data - like Stake's VIP system
  const levels = [
    { tier: 'Bronze', xpRequired: 0, color: '#CD7F32', benefits: ['Basic Support', 'Daily Missions'] },
    { tier: 'Silver', xpRequired: 2000, color: '#C0C0C0', benefits: ['Priority Support', '100 Bonus Cap', 'Daily Missions'], current: true },
    { tier: 'Gold', xpRequired: 4000, color: '#FFD700', benefits: ['Priority Support', '150 Bonus Cap', 'Priority Withdrawals', 'Exclusive Missions'] },
    { tier: 'Platinum', xpRequired: 8000, color: '#E5E4E2', benefits: ['VIP Support', '200 Bonus Cap', 'Priority Withdrawals', 'Exclusive Missions', 'Monthly Bonuses'] },
    { tier: 'Diamond', xpRequired: 15000, color: '#B9F2FF', benefits: ['Dedicated Support', '300 Bonus Cap', 'Priority Withdrawals', 'Exclusive Missions', 'Monthly Bonuses', 'Level Up Bonuses'] },
    { tier: 'Black', xpRequired: 25000, color: '#000000', benefits: ['Personal Manager', '500 Bonus Cap', 'Instant Withdrawals', 'Exclusive Missions', 'Monthly Bonuses', 'Level Up Bonuses', 'Bespoke Bonuses'] }
  ];

  // Removed duplicate missions array - using the one defined at top of file

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
                  <button 
                    onClick={() => setIsBenefitsDrawerOpen(true)}
                    className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
                  >
                    My Benefits
                  </button>
                  <button 
                    onClick={() => setIsLevelsDrawerOpen(true)}
                    className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors"
                  >
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
                          <span>Progress: {mission.progress}/{mission.target}</span>
                          <span>{mission.timeLeft}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
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
                  
                  <button 
                    onClick={() => openLootBox(box.type)}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Open Loot Box</span>
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

          {/* Tournaments Icon */}
          <button 
            onClick={() => setIsTournamentsDrawerOpen(true)}
            className="p-2 hover:bg-white/10 transition-all duration-200 rounded-full"
          >
            <Trophy className="w-5 h-5 text-white" />
          </button>
         </div>
       </div>

       {/* Benefits Drawer Modal */}
       {isBenefitsDrawerOpen && (
         <div className="fixed inset-0 z-50">
           <div 
             className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
             onClick={() => setIsBenefitsDrawerOpen(false)}
           ></div>
           <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-2xl max-h-[90vh] overflow-hidden border-t border-white/20 flex flex-col">
             {/* Handle */}
             <div className="flex justify-center pt-2 pb-1">
               <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
             </div>

             {/* Header */}
             <div className="px-4 py-3 border-b border-gray-200/50">
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                     <Crown className="w-4 h-4 text-gray-600" />
                   </div>
                   <h2 className="text-lg font-bold text-gray-900">Silver Benefits</h2>
                 </div>
                 <button
                   onClick={() => setIsBenefitsDrawerOpen(false)}
                   className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 flex items-center justify-center transition-colors"
                 >
                   <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
               </div>
             </div>

             {/* Content */}
             <div className="px-4 py-4 overflow-y-auto flex-1 min-h-0">
               {/* Current Tier Card */}
               <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6 border border-gray-200">
                 <div className="flex items-center space-x-4 mb-4">
                   <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg" style={{ backgroundColor: userLevel.tierColor }}>
                     <Crown className="w-8 h-8 text-white" />
                   </div>
                   <div className="flex-1">
                     <div className="flex items-center space-x-2 mb-1">
                       <span className="px-3 py-1 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: userLevel.tierColor }}>
                         {userLevel.currentTier}
                       </span>
                       <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                         Current
                       </span>
                     </div>
                     <p className="text-gray-600 text-sm">Your current tier benefits</p>
                   </div>
                 </div>
               </div>

               {/* Benefits Timeline */}
               <div className="space-y-4">
                 {/* Active Benefits Section */}
                 <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                   <div className="flex items-center space-x-2 mb-4">
                     <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                     </div>
                     <h3 className="text-lg font-bold text-gray-900">Active Benefits</h3>
                   </div>
                   
                   <div className="space-y-3">
                     <div className="bg-white rounded-lg p-3 border border-green-100">
                       <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                           <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                           </svg>
                         </div>
                         <div className="flex-1">
                           <div className="font-medium text-gray-900">100 Bonus Cap</div>
                           <div className="text-sm text-gray-600">Maximum bonus amount per transaction</div>
                         </div>
                       </div>
                     </div>
                     
                     <div className="bg-white rounded-lg p-3 border border-green-100">
                       <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                           <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                           </svg>
                         </div>
                         <div className="flex-1">
                           <div className="font-medium text-gray-900">Priority Support</div>
                           <div className="text-sm text-gray-600">Faster response times for support requests</div>
                         </div>
                       </div>
                     </div>
                     
                     <div className="bg-white rounded-lg p-3 border border-green-100">
                       <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                           <Target className="w-4 h-4 text-green-600" />
                         </div>
                         <div className="flex-1">
                           <div className="font-medium text-gray-900">Daily Missions</div>
                           <div className="text-sm text-gray-600">Complete daily tasks to earn rewards</div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Next Tier Preview */}
                 <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                   <div className="flex items-center space-x-2 mb-4">
                     <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                       <Star className="w-4 h-4 text-white" />
                     </div>
                     <h3 className="text-lg font-bold text-gray-900">Unlock with Gold</h3>
                     <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                       {userLevel.xpNeeded.toLocaleString()} XP to unlock
                     </span>
                   </div>
                   
                   <div className="space-y-3">
                     <div className="bg-white rounded-lg p-3 border border-yellow-100">
                       <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                           <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                           </svg>
                         </div>
                         <div className="flex-1">
                           <div className="font-medium text-gray-900">150 Bonus Cap</div>
                           <div className="text-sm text-gray-600">Higher bonus limits + all Silver benefits</div>
                         </div>
                       </div>
                     </div>
                     
                     <div className="bg-white rounded-lg p-3 border border-yellow-100">
                       <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                           <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                         </div>
                         <div className="flex-1">
                           <div className="font-medium text-gray-900">Priority Withdrawals</div>
                           <div className="text-sm text-gray-600">Withdrawals processed within 24 hours</div>
                         </div>
                       </div>
                     </div>
                     
                     <div className="bg-white rounded-lg p-3 border border-yellow-100">
                       <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                           <Target className="w-4 h-4 text-yellow-600" />
                         </div>
                         <div className="flex-1">
                           <div className="font-medium text-gray-900">Exclusive Missions</div>
                           <div className="text-sm text-gray-600">Special high-reward missions only for Gold+</div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}

       {/* Levels Drawer Modal */}
       {isLevelsDrawerOpen && (
         <div className="fixed inset-0 z-50">
           <div 
             className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
             onClick={() => setIsLevelsDrawerOpen(false)}
           ></div>
           <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-2xl max-h-[90vh] overflow-hidden border-t border-white/20 flex flex-col">
             {/* Handle */}
             <div className="flex justify-center pt-2 pb-1">
               <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
             </div>

             {/* Header */}
             <div className="px-4 py-3 border-b border-gray-200/50">
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                     <Trophy className="w-4 h-4 text-gray-600" />
                   </div>
                   <h2 className="text-lg font-bold text-gray-900">Levels & Rewards</h2>
                 </div>
                 <button
                   onClick={() => setIsLevelsDrawerOpen(false)}
                   className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 flex items-center justify-center transition-colors"
                 >
                   <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
               </div>
             </div>

             {/* Content */}
             <div className="px-4 py-4 overflow-y-auto flex-1 min-h-0">

               {/* Progress Timeline */}
               <div className="relative mb-8">
                 {/* Timeline Line */}
                 <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                 
                 {/* Timeline Items */}
                 <div className="space-y-6">
                   {levels.map((level, index) => (
                     <div key={level.tier} className="relative flex items-start">
                       {/* Timeline Icon */}
                       <div 
                         className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                           level.current 
                             ? 'border-white shadow-lg' 
                             : userLevel.currentXP >= level.xpRequired 
                               ? 'border-white shadow-lg' 
                               : 'border-gray-300'
                         }`}
                         style={{ backgroundColor: level.color }}
                       >
                         <Crown className={`w-6 h-6 ${
                           level.current || userLevel.currentXP >= level.xpRequired 
                             ? 'text-white' 
                             : 'text-gray-400'
                         }`} />
                         {level.current && (
                           <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                             <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                             </svg>
                           </div>
                         )}
                       </div>

                       {/* Content */}
                       <div className="ml-4 flex-1">
                         <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                           {/* Tier Header */}
                           <div className="flex items-center justify-between mb-3">
                             <div className="flex items-center space-x-2">
                               <span 
                                 className="px-3 py-1 rounded-lg text-xs font-medium text-white"
                                 style={{ backgroundColor: level.color }}
                               >
                                 {level.tier}
                               </span>
                               {level.current && (
                                 <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                   Current
                                 </span>
                               )}
                             </div>
                             <div className="text-right">
                               <div className="text-lg font-bold text-gray-900">
                                 {level.xpRequired.toLocaleString()} XP
                               </div>
                               {index < levels.length - 1 && (
                                 <div className="text-xs text-gray-500">
                                   Next: {(levels[index + 1].xpRequired - level.xpRequired).toLocaleString()} XP
                                 </div>
                               )}
                             </div>
                           </div>

                           {/* Benefits */}
                           <div className="space-y-2">
                             <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Benefits</div>
                             <div className="grid grid-cols-1 gap-1">
                               {level.benefits.map((benefit, benefitIndex) => (
                                 <div key={benefitIndex} className="flex items-center space-x-2">
                                   <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: level.color + '20' }}>
                                     <svg className="w-2 h-2" style={{ color: level.color }} fill="currentColor" viewBox="0 0 20 20">
                                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                     </svg>
                                   </div>
                                   <span className="text-sm text-gray-700">{benefit}</span>
                                 </div>
                               ))}
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

             </div>
           </div>
         </div>
       )}

       {/* Loot Box Opening Drawer */}
       {isLootBoxOpen && (
         <div className="fixed inset-0 z-50">
           <div 
             className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
             onClick={() => setIsLootBoxOpen(false)}
           ></div>
           <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-2xl max-h-[90vh] overflow-hidden border-t border-white/20 flex flex-col">
             {/* Handle */}
             <div className="flex justify-center pt-2 pb-1">
               <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
             </div>

             {/* Header */}
             <div className="px-4 py-3 border-b border-gray-200/50">
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                     <Gift className="w-4 h-4 text-gray-600" />
                   </div>
                   <h2 className="text-lg font-bold text-gray-900">Loot Box Opening</h2>
                 </div>
                 <button
                   onClick={() => setIsLootBoxOpen(false)}
                   className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 flex items-center justify-center transition-colors"
                 >
                   <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
               </div>
             </div>

             {/* Content */}
             <div className="flex-1 px-4 py-4 overflow-y-auto flex flex-col items-center justify-center min-h-0">
               {lootBoxAnimation ? (
                 /* Spin Reel Animation */
                 <div className="w-full max-w-sm">
                   <div className="relative mb-8">
                     {/* Reel Container */}
                     <div className="relative h-80 bg-gray-50 rounded-2xl border-2 border-gray-200 overflow-hidden shadow-inner">
                       {/* Spinning Reel */}
                       <div 
                         className="absolute inset-0 flex flex-col"
                         style={{
                           transform: `translateY(-${reelPosition}px)`,
                           transition: lootBoxAnimation ? 'none' : 'transform 0.5s ease-out'
                         }}
                       >
                         {/* Generate multiple prize slots for smooth scrolling */}
                         {Array.from({ length: 50 }, (_, i) => {
                           const prizeIndex = i % 6;
                           const prizes = [
                             { value: '$25', type: 'Cash', iconComponent: Coins, bgColor: 'bg-green-50/50', borderColor: 'border-green-200/50', textColor: 'text-green-700', iconColor: 'text-green-600' },
                             { value: '50 Free Spins', type: 'Free Spins', iconComponent: Dice1, bgColor: 'bg-purple-50/50', borderColor: 'border-purple-200/50', textColor: 'text-purple-700', iconColor: 'text-purple-600' },
                             { value: '$25 Risk Free', type: 'Risk Free Bet', iconComponent: Shield, bgColor: 'bg-blue-50/50', borderColor: 'border-blue-200/50', textColor: 'text-blue-700', iconColor: 'text-blue-600' },
                             { value: 'Weekly Mission', type: 'Special Mission', iconComponent: Target, bgColor: 'bg-orange-50/50', borderColor: 'border-orange-200/50', textColor: 'text-orange-700', iconColor: 'text-orange-600' },
                             { value: 'Silver Box', type: 'Loot Box', iconComponent: Gift, bgColor: 'bg-amber-50/50', borderColor: 'border-amber-200/50', textColor: 'text-amber-700', iconColor: 'text-amber-600' },
                             { value: '$15', type: 'Cash', iconComponent: Coins, bgColor: 'bg-green-50/50', borderColor: 'border-green-200/50', textColor: 'text-green-700', iconColor: 'text-green-600' }
                           ];
                           const prize = prizes[prizeIndex];
                           const IconComponent = prize.iconComponent;
                           
                           return (
                             <div key={i} className="h-20 flex items-center justify-center border-b border-gray-100">
                               <div className={`flex items-center space-x-4 px-6 py-3 rounded-xl backdrop-blur-sm border shadow-sm w-11/12 ${prize.bgColor} ${prize.borderColor}`}>
                                 <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center shadow-sm border border-white/50">
                                   <IconComponent className={`w-6 h-6 ${prize.iconColor}`} />
                                 </div>
                                 <div className="flex-1">
                                   <div className={`font-bold text-lg ${prize.textColor}`}>{prize.value}</div>
                                   <div className="text-sm text-gray-600">{prize.type}</div>
                                 </div>
                               </div>
                             </div>
                           );
                         })}
                       </div>
                       
                       {/* Selection Indicator */}
                       <div className="absolute top-1/2 left-0 right-0 h-20 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-y-1/2 border-y-2 border-gray-300 shadow-lg"></div>
                       <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                         <div className="w-0 h-0 border-l-8 border-l-gray-400 border-t-4 border-t-transparent border-b-4 border-b-transparent shadow-lg"></div>
                       </div>
                     </div>
                   </div>
                   
                   <div className="text-center">
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Opening Loot Box...</h3>
                     <p className="text-gray-600 text-sm mb-4">Good luck!</p>
                     <div className="flex space-x-2 justify-center">
                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                     </div>
                   </div>
                 </div>
               ) : lootBoxPrize ? (
                 /* Prize Reveal Phase */
                 <div className="text-center w-full max-w-sm">
                   {/* Prize Display */}
                   <div className="relative mb-8">
                     <div className="w-32 h-32 mx-auto bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-gray-200">
                       {(() => {
                         const IconComponent = lootBoxPrize.iconComponent;
                         return IconComponent ? <IconComponent className="w-16 h-16 text-gray-600" /> : null;
                       })()}
                     </div>
                     
                     {/* Subtle Glow Effect */}
                     <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg opacity-30 scale-110"></div>
                   </div>
                   
                   <div className="space-y-6">
                     <h3 className="text-2xl font-bold text-gray-900">Congratulations!</h3>
                     
                     <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm">
                       <div className="text-3xl font-bold text-gray-900 mb-2">{lootBoxPrize.value}</div>
                       <div className="text-gray-600 text-lg">{lootBoxPrize.type}</div>
                     </div>
                     
                     <button 
                       onClick={() => setIsLootBoxOpen(false)}
                       className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
                     >
                       Claim Reward
                     </button>
                   </div>
                 </div>
               ) : null}
             </div>
           </div>
         </div>
       )}

       {/* Tournaments Drawer Modal */}
       {isTournamentsDrawerOpen && (
         <div className="fixed inset-0 z-50">
           <div 
             className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
             onClick={() => setIsTournamentsDrawerOpen(false)}
           ></div>
           <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-2xl max-h-[90vh] overflow-hidden border-t border-white/20 flex flex-col">
             {/* Handle */}
             <div className="flex justify-center pt-2 pb-1">
               <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
             </div>

             {/* Header */}
             <div className="px-4 py-3 border-b border-gray-200/50">
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                     <Trophy className="w-4 h-4 text-gray-600" />
                   </div>
                   <h2 className="text-lg font-bold text-gray-900">Tournaments</h2>
                 </div>
                 <button
                   onClick={() => setIsTournamentsDrawerOpen(false)}
                   className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 flex items-center justify-center transition-colors"
                 >
                   <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
               </div>
             </div>

             {/* Tab Navigation */}
             <div className="px-4 py-3 border-b border-gray-200/50">
               <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                 <button
                   onClick={() => setActiveTournamentTab('daily-races')}
                   className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                     activeTournamentTab === 'daily-races'
                       ? 'bg-white text-gray-900 shadow-sm'
                       : 'text-gray-600 hover:text-gray-900'
                   }`}
                 >
                   Daily Races
                 </button>
                 <button
                   onClick={() => setActiveTournamentTab('tournaments')}
                   className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                     activeTournamentTab === 'tournaments'
                       ? 'bg-white text-gray-900 shadow-sm'
                       : 'text-gray-600 hover:text-gray-900'
                   }`}
                 >
                   Tournaments
                 </button>
               </div>
             </div>

             {/* Content */}
             <div className="flex-1 px-4 py-4 overflow-y-auto flex flex-col min-h-0">
               {activeTournamentTab === 'daily-races' ? (
                 /* Daily Races Tab */
                 <div className="space-y-6">
                   {/* Daily Race Card */}
                   <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                     <div className="flex items-start space-x-4">
                       <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                         <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                         </svg>
                       </div>
                       <div className="flex-1">
                         <h3 className="text-xl font-bold text-gray-900 mb-2">$15,000 Daily Cash Race</h3>
                         <p className="text-gray-600 text-sm mb-4">Daily Races Every 24 Hours</p>
                         <p className="text-gray-700 text-sm mb-4">
                           Join our $15,000 Daily Cash Race! Every bet placed in Sports, Casino, Racebook, or Esports will help you climb to the top every 24 hours.
                         </p>
                         <button className="bg-white border border-gray-300 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                           LEARN MORE
                         </button>
                       </div>
                     </div>
                   </div>

                   {/* Countdown Timer */}
                   <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                     <h4 className="text-lg font-bold text-gray-900 mb-4">Time Remaining</h4>
                     <div className="grid grid-cols-4 gap-4">
                       <div className="text-center">
                         <div className="bg-gray-100 rounded-lg p-3 mb-2">
                           <div className="text-2xl font-bold text-gray-900">00</div>
                         </div>
                         <div className="text-xs text-gray-600">DAYS</div>
                       </div>
                       <div className="text-center">
                         <div className="bg-gray-100 rounded-lg p-3 mb-2">
                           <div className="text-2xl font-bold text-gray-900">15</div>
                         </div>
                         <div className="text-xs text-gray-600">HOURS</div>
                       </div>
                       <div className="text-center">
                         <div className="bg-gray-100 rounded-lg p-3 mb-2">
                           <div className="text-2xl font-bold text-gray-900">45</div>
                         </div>
                         <div className="text-xs text-gray-600">MINUTES</div>
                       </div>
                       <div className="text-center">
                         <div className="bg-gray-100 rounded-lg p-3 mb-2">
                           <div className="text-2xl font-bold text-gray-900">22</div>
                         </div>
                         <div className="text-xs text-gray-600">SECONDS</div>
                       </div>
                     </div>
                   </div>

                   {/* Your Stats */}
                   <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                     <h4 className="text-lg font-bold text-gray-900 mb-4">Your Stats</h4>
                     <div className="grid grid-cols-3 gap-4">
                       <div className="text-center">
                         <div className="text-2xl font-bold text-gray-900">9683rd</div>
                         <div className="text-xs text-gray-600">Your Position</div>
                       </div>
                       <div className="text-center">
                         <div className="text-2xl font-bold text-green-600">$0.00</div>
                         <div className="text-xs text-gray-600">Current Prize</div>
                       </div>
                       <div className="text-center">
                         <div className="text-2xl font-bold text-blue-600">$3.00</div>
                         <div className="text-xs text-gray-600">Wagered</div>
                       </div>
                     </div>
                   </div>

                   {/* Leaderboard */}
                   <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                     <h4 className="text-lg font-bold text-gray-900 mb-4">Top Players</h4>
                     <div className="space-y-3">
                       {[
                         { rank: 1, player: "B3418**", wagered: "$12,450", prize: "$800", trophy: "🥇" },
                         { rank: 2, player: "B5561**", wagered: "$9,820", prize: "$600", trophy: "🥈" },
                         { rank: 3, player: "B102**", wagered: "$8,150", prize: "$500", trophy: "🥉" },
                         { rank: 4, player: "W2748**", wagered: "$7,230", prize: "$450", trophy: "" },
                         { rank: 5, player: "B4928**", wagered: "$6,890", prize: "$300", trophy: "" }
                       ].map((player) => (
                         <div key={player.rank} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                           <div className="flex items-center space-x-3">
                             <span className="text-lg">{player.trophy}</span>
                             <span className="font-medium text-gray-900">{player.rank}.</span>
                             <span className="text-gray-700">{player.player}</span>
                           </div>
                           <div className="flex items-center space-x-4">
                             <span className="text-sm text-gray-600">{player.wagered}</span>
                             <span className="text-sm font-bold text-green-600">{player.prize}</span>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               ) : (
                 /* Tournaments Tab */
                 <div className="space-y-6">
                   {/* Tournament Cards */}
                   {[
                     {
                       id: 1,
                       title: "Kings of War Tourney",
                       prize: "$5,000",
                       type: "Most Points Won",
                       rounds: "Time Based",
                       timeLeft: "4 days, 15 hours",
                       gameId: "13909"
                     },
                     {
                       id: 2,
                       title: "Casino Cash Rush",
                       prize: "$2,500",
                       type: "Highest Win",
                       rounds: "Daily",
                       timeLeft: "1 day, 8 hours",
                       gameId: "13910"
                     },
                     {
                       id: 3,
                       title: "Slots Championship",
                       prize: "$1,000",
                       type: "Total Spins",
                       rounds: "Weekly",
                       timeLeft: "6 days, 12 hours",
                       gameId: "13911"
                     }
                   ].map((tournament) => (
                     <div key={tournament.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                       <div className="flex items-start justify-between mb-4">
                         <div className="flex-1">
                           <h3 className="text-lg font-bold text-gray-900 mb-2">{tournament.title}</h3>
                           <div className="grid grid-cols-2 gap-4 text-sm">
                             <div>
                               <span className="text-gray-600">Type:</span>
                               <span className="ml-2 font-medium text-gray-900">{tournament.type}</span>
                             </div>
                             <div>
                               <span className="text-gray-600">Rounds:</span>
                               <span className="ml-2 font-medium text-gray-900">{tournament.rounds}</span>
                             </div>
                             <div>
                               <span className="text-gray-600">Time Left:</span>
                               <span className="ml-2 font-medium text-gray-900">{tournament.timeLeft}</span>
                             </div>
                             <div>
                               <span className="text-gray-600">Game ID:</span>
                               <span className="ml-2 font-medium text-gray-900">{tournament.gameId}</span>
                             </div>
                           </div>
                         </div>
                         <div className="text-right">
                           <div className="text-2xl font-bold text-green-600">{tournament.prize}</div>
                           <div className="text-sm text-gray-600">Prize Pool</div>
                         </div>
                       </div>
                       <div className="flex space-x-2">
                         <button className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                           PLAY NOW
                         </button>
                         <button className="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                           RULES
                         </button>
                         <button className="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                           SEE PRIZES
                         </button>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
             </div>
           </div>
         </div>
       )}

       {/* Balance Drawer */}
       {isBalanceDrawerOpen && (
         <div className="fixed inset-0 z-50">
           <div 
             className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
             onClick={() => setIsBalanceDrawerOpen(false)}
           ></div>
           <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-2xl max-h-[80vh] overflow-hidden border-t border-white/20">
             {/* Handle */}
             <div className="flex justify-center pt-2 pb-1">
               <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
             </div>

             {/* Header */}
             <div className="px-4 py-3 border-b border-gray-200/50">
               <div className="flex items-center justify-between">
                 <h2 className="text-lg font-bold text-gray-900">My Account</h2>
                 <button
                   onClick={() => setIsBalanceDrawerOpen(false)}
                   className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 flex items-center justify-center transition-colors"
                 >
                   <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
               </div>
             </div>

             {/* Content */}
             <div className="px-4 py-4 space-y-4 overflow-y-auto max-h-[60vh]">
               {/* User Info - Compact */}
               <div className="flex items-center space-x-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                 <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                   <span className="text-white text-sm font-bold">BB</span>
                 </div>
                 <div className="flex-1 flex items-center space-x-3">
                   <div>
                     <div className="flex items-center space-x-2">
                       <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                         <span className="text-white text-xs font-bold">BB</span>
                       </div>
                       <h3 className="text-base font-semibold text-gray-900">BetBolt User</h3>
                     </div>
                     <p className="text-gray-500 text-xs">user@betbolt.com</p>
                   </div>
                 </div>
               </div>

               {/* Balance - Compact */}
               <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                 <div className="flex items-center justify-between mb-3">
                   <div>
                     <p className="text-gray-600 text-xs">Available Balance</p>
                     <p className="text-xl font-bold text-gray-900">$1,250.00</p>
                   </div>
                 </div>
                 <div className="flex space-x-2">
                   <button className="flex-1 bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95">
                     <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                     </svg>
                     Deposit
                   </button>
                   <button className="flex-1 bg-white/5 backdrop-blur-sm hover:bg-white/15 text-gray-700 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border border-white/20 hover:border-white/30 active:scale-95 shadow-[0_0_0_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_0_2px_rgba(255,255,255,0.3)]">
                     <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4m0 0l6-6m-6 6l6 6" />
                     </svg>
                     Withdraw
                   </button>
                 </div>
               </div>

               {/* Loyalty Progress - Fixed */}
               <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                 <div className="flex items-center justify-between mb-2">
                   <div className="flex items-center space-x-2">
                     <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.7-2h8.6l.9-5.4L12 8.5 6.8 8.6L7.7 14z"/>
                     </svg>
                     <span className="font-semibold text-gray-900 text-sm">VIP Level</span>
                   </div>
                   <span className="text-sm font-medium text-gray-700 bg-yellow-100 px-2 py-1 rounded-full flex items-center">
                     <svg className="w-3 h-3 mr-1 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.7-2h8.6l.9-5.4L12 8.5 6.8 8.6L7.7 14z"/>
                     </svg>
                     Silver
                   </span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                   <div className="bg-gradient-to-r from-gray-300 to-silver-400 h-2 rounded-full" style={{width: '65%'}}></div>
                 </div>
                 <p className="text-xs text-gray-600">650 / 1000 points to Gold</p>
               </div>

               {/* Menu Items - Compact */}
               <div className="space-y-2">
                 {/* Transaction History */}
                 <button className="w-full flex items-center space-x-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all border border-white/20 text-left">
                   <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                     <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                     </svg>
                   </div>
                   <div>
                     <div className="font-semibold text-gray-900 text-sm">Transaction History</div>
                     <div className="text-xs text-gray-500">View all deposits & withdrawals</div>
                   </div>
                 </button>

                 {/* My Bets */}
                 <button className="w-full flex items-center space-x-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all border border-white/20 text-left">
                   <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                     <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                     </svg>
                   </div>
                   <div>
                     <div className="font-semibold text-gray-900 text-sm">My Bets</div>
                     <div className="text-xs text-gray-500">View betting history</div>
                   </div>
                 </button>

                 {/* Edit Profile */}
                 <button className="w-full flex items-center space-x-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all border border-white/20 text-left">
                   <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                     <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                   </div>
                   <div>
                     <div className="font-semibold text-gray-900 text-sm">Edit Profile</div>
                     <div className="text-xs text-gray-500">Update personal information</div>
                   </div>
                 </button>

                 {/* Refer a Friend */}
                 <button className="w-full flex items-center space-x-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all border border-white/20 text-left">
                   <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                     <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                     </svg>
                   </div>
                   <div>
                     <div className="font-semibold text-gray-900 text-sm">Refer a Friend</div>
                     <div className="text-xs text-gray-500">Earn rewards for referrals</div>
                   </div>
                 </button>
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 }