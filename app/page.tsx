"use client";
import { useViewportHeight } from "@/hooks/useViewportHeight";
import ReelsSwiper from "@/components/ReelsSwiper";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BetSlip365 } from "@/components/betslip/BetSlip365";
import { useBetSlipStore } from "@/lib/store/bet-slip";
import LiquidEther from "@/components/LiquidEther";
import { Receipt, CheckCircle2, Dice6, Share2, Menu, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BetterWheel, { BetterWheelRef } from "@/components/BetterWheel";
import { SimpleConfetti } from "@/lib/confetti";
import ShinyText from "@/components/ShinyText";

export default function Page() {
  useViewportHeight();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false);
  const [isBettingOverlayOpen, setIsBettingOverlayOpen] = useState(false);
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false);
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);
  const [currentMatchForAI, setCurrentMatchForAI] = useState<string | null>(null);

  // Update URL when reel changes
  const handleReelChange = (newIndex: number) => {
    setCurrentReelIndex(newIndex);
    // We'll get the reelId after the reels array is defined
  };

  // AI Insights data for different matches
  const getAIInsights = (matchData: string | null) => {
    const defaultInsight = {
      title: matchData || 'Match Analysis',
      league: 'Sports',
      time: 'Today',
      analysis: "AI analysis is being processed. Based on available data, this appears to be a competitive matchup with multiple factors influencing the outcome.",
      insights: [
        "Historical data suggests competitive matchup",
        "Multiple factors influencing outcome",
        "Recommend checking live updates"
      ],
      confidence: 65
    };

    if (!matchData) {
      return defaultInsight;
    }

    switch (matchData) {
      case 'Liverpool vs Arsenal':
        return {
          title: 'Liverpool vs Arsenal',
          league: 'Premier League',
          time: 'Today 3:00 PM GMT',
          analysis: "Based on recent form and head-to-head records, Liverpool has a 72% win probability. Key factors: Salah's home scoring record (8 goals in last 5), Arsenal's away struggles (1 win in last 4), and Liverpool's dominance at Anfield.",
          insights: [
            "Liverpool unbeaten in last 12 home matches vs Arsenal",
            "Salah has scored in 4 of last 5 meetings",
            "Arsenal conceded 6 goals in last 3 away games"
          ],
          confidence: 78
        };
      
      case 'Chiefs vs Bills':
        return {
          title: 'Chiefs vs Bills',
          league: 'NFL',
          time: 'Today 8:20 PM EST',
          analysis: "Based on recent performance, team lineups, and historical data, the Chiefs have a 68% win probability. Key factors: Mahomes' home record (12-3 last 15), Bills' road struggles (3-4 this season), and weather conditions favoring passing game.",
          insights: [
            "Chiefs defense allowing 18.2 PPG at home (vs 24.1 away)",
            "Bills 0-3 ATS in last 3 road games vs AFC West",
            "Over 47.5 hit in 4 of last 5 meetings"
          ],
          confidence: 85
        };
      
      case 'Warriors vs Lakers':
        return {
          title: 'Warriors vs Lakers',
          league: 'NBA',
          time: 'Tonight 8:00 PM EST',
          analysis: "Warriors have a 64% win probability based on recent form and matchup advantages. Key factors: Curry's hot streak (31.2 PPG last 5 games), Lakers' defensive struggles (allowing 118 PPG), and home court advantage.",
          insights: [
            "Curry averaging 31.2 PPG in last 5 games",
            "Lakers allowing 118 PPG (4th worst in NBA)",
            "Warriors 8-2 at home this season"
          ],
          confidence: 72
        };
      
      case 'Man City vs Real Madrid':
        return {
          title: 'Man City vs Real Madrid',
          league: 'Champions League',
          time: 'Today 3:00 PM CET',
          analysis: "Man City has a 71% win probability based on current form and tactical matchups. Key factors: Haaland's scoring form (12 goals in 8 games), Real Madrid's defensive vulnerabilities, and City's home advantage.",
          insights: [
            "Haaland has 12 goals in last 8 matches",
            "Real Madrid conceded 8 goals in last 4 away games",
            "City unbeaten in last 10 home Champions League matches"
          ],
          confidence: 81
        };
      
      case 'Kentucky Derby':
        return {
          title: 'Kentucky Derby',
          league: 'Horse Racing',
          time: 'Today 6:57 PM EST',
          analysis: "Thunder Strike has a 23% win probability based on recent form and track conditions. Key factors: Strong finishing kick, good draw position (gate 7), and excellent training times leading up to the race.",
          insights: [
            "Thunder Strike won last 2 races by 4+ lengths",
            "Jockey has 3 Kentucky Derby wins",
            "Track conditions favor front-running horses"
          ],
          confidence: 67
        };
      
      case 'Masters Tournament':
        return {
          title: 'Masters Tournament',
          league: 'PGA Tour',
          time: 'Today 2:00 PM EST',
          analysis: "Tiger Woods has a 15% win probability based on his Augusta mastery and recent form. Key factors: 5-time Masters champion, excellent course knowledge, and strong putting performance this season.",
          insights: [
            "Tiger has 5 Masters victories (tied for 2nd all-time)",
            "Averaging 1.68 putts per hole this season",
            "Hasn't missed a cut at Augusta in 23 years"
          ],
          confidence: 58
        };
      
      case 'Monaco Grand Prix':
        return {
          title: 'Monaco Grand Prix',
          league: 'Formula 1',
          time: 'Today 3:00 PM CET',
          analysis: "Lewis Hamilton has a 28% win probability based on Monaco's unique demands and his experience. Key factors: 3-time Monaco winner, strong qualifying performance, and excellent tire management skills.",
          insights: [
            "Hamilton has 3 Monaco GP victories",
            "Qualified 2nd in 4 of last 5 Monaco races",
            "Mercedes strong in slow-speed corners"
          ],
          confidence: 69
        };
      
      case 'Arsenal vs Chelsea':
        return {
          title: 'Arsenal vs Chelsea',
          league: 'Premier League',
          time: 'Today 3:00 PM GMT',
          analysis: "Arsenal has a 66% win probability based on current form and home advantage. Key factors: Strong home record (8-1-1), Chelsea's defensive struggles, and Arsenal's attacking momentum.",
          insights: [
            "Arsenal 8-1-1 at home this season",
            "Chelsea conceded 12 goals in last 5 matches",
            "Arsenal scoring 2.3 goals per game at home"
          ],
          confidence: 74
        };
      
      default:
        return defaultInsight;
    }
  };
  const [isMarketsDrawerOpen, setIsMarketsDrawerOpen] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showBetNotification, setShowBetNotification] = useState(false);
  const [isCasinoGameOpen, setIsCasinoGameOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);
  const [showSportsLeagues, setShowSportsLeagues] = useState(false);
  const [isBalanceDrawerOpen, setIsBalanceDrawerOpen] = useState(false);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const [activeBetFilter, setActiveBetFilter] = useState<'pending' | 'graded'>('pending');
  const [currentBet, setCurrentBet] = useState<{
    match: string;
    market: string;
    selection: string;
    odds: number;
  } | null>(null);
  const [stake, setStake] = useState(5);
  const { legs, addLeg } = useBetSlipStore();

  // Wheel of Fortune state
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastResult, setLastResult] = useState<number | undefined>(undefined);
  const wheelRef = useRef<BetterWheelRef>(null);

  // Boxing interest state
  const [boxingAnswer, setBoxingAnswer] = useState<'yes' | 'no' | null>(null);

  // Onboarding state
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedCasino, setSelectedCasino] = useState<string[]>([]);

  // Personalization preferences
  const [preferences, setPreferences] = useState({
    football: true,
    basketball: true,
    tennis: true,
    boxing: true,
    mma: true,
    premierLeague: true,
    nfl: true,
    nba: true,
    championsLeague: true,
    laLiga: true,
    ufc: true,
  });
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [showFavourites, setShowFavourites] = useState(false);

  // Update theme color to transparent for all reels
  useEffect(() => {
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "rgba(0, 0, 0, 0.01)");
    }
  }, []);

  const reels = [
    // Onboarding / Landing Page (always first)
    {
      id: 'onboarding',
      render: (active: boolean, reelId: string) => {
        const sports = ['Football', 'Basketball', 'Tennis', 'Boxing', 'MMA', 'Soccer', 'Baseball', 'Hockey'];
        const casinoGames = ['Slots', 'Blackjack', 'Roulette', 'Poker', 'Baccarat', 'Live Casino'];

        const toggleSport = (sport: string) => {
          setSelectedSports(prev => 
            prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]
          );
        };

        const toggleCasino = (game: string) => {
          setSelectedCasino(prev => 
            prev.includes(game) ? prev.filter(g => g !== game) : [...prev, game]
          );
        };

        return (
          <div className="relative h-app w-full bg-black">
            <div className="absolute inset-0 z-0">
              <LiquidEther
                colors={['#ff0080', '#7000ff', '#0080ff']}
                mouseForce={25}
                cursorSize={120}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.6}
                isBounce={false}
                autoDemo={false}
                autoSpeed={0}
                autoIntensity={0}
                takeoverDuration={0.3}
                autoResumeDelay={0}
                autoRampDuration={0}
              />
            </div>

            {/* Side Menu - Right Side */}
            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M8 18h8" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Menu</span>
                </button>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => window.location.href = '/casino'}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
              </div>

            </div>

            {onboardingStep === 1 && (
              <div className="absolute bottom-24 left-6 z-20" style={{right: '100px'}}>
                <h1 className="text-xl font-black text-white mb-2">What sports are you interested in?</h1>
                <p className="text-white/70 text-sm mb-6 max-w-xs">Select your favorite sports to personalize your betting experience.</p>
                
                <div className="flex flex-wrap gap-3 mb-6 max-w-sm">
                  {sports.map(sport => (
                    <button
                      key={sport}
                      onClick={() => toggleSport(sport)}
                      className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                        selectedSports.includes(sport)
                          ? 'bg-white text-black'
                          : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
                      }`}
                    >
                      {sport}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setOnboardingStep(2)}
                  disabled={selectedSports.length === 0}
                  className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                    selectedSports.length === 0
                      ? 'bg-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  Continue
                </button>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="absolute bottom-24 left-6 z-20" style={{right: '100px'}}>
                <h1 className="text-xl font-black text-white mb-2">What about casino games?</h1>
                <p className="text-white/70 text-sm mb-6 max-w-xs">Choose the casino games you'd like to see.</p>
                
                <div className="flex flex-wrap gap-3 mb-6 max-w-sm">
                  {casinoGames.map(game => (
                    <button
                      key={game}
                      onClick={() => toggleCasino(game)}
                      className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                        selectedCasino.includes(game)
                          ? 'bg-white text-black'
                          : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
                      }`}
                    >
                      {game}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setOnboardingStep(3)}
                  disabled={selectedCasino.length === 0}
                  className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                    selectedCasino.length === 0
                      ? 'bg-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  Continue
                </button>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="absolute bottom-24 left-6 z-20" style={{right: '100px'}}>
                <h1 className="text-xl font-black text-white mb-2">Welcome to Flaame!</h1>
                <p className="text-white/80 text-sm mb-32 max-w-xs">Your personalized betting experience starts now</p>
                
                <div className="absolute bottom-0 left-0 flex flex-col items-start">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="animate-bounce">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-xs font-medium">Swipe down to see your betting reels</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      },
    },

    // Wheel of Fortune Reel (moved to 3rd position)
    {
      id: 'wheel-of-fortune',
      render: (active: boolean, reelId: string) => {
        return (
          <div className="relative h-app w-full">
            {/* Liquid Background */}
            <div className="absolute inset-0 z-0">
              <LiquidEther
                colors={['#8b5cf6', '#06b6d4', '#10b981']}
                mouseForce={25}
                cursorSize={120}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.6}
                isBounce={false}
                autoDemo={false}
                autoSpeed={0}
                autoIntensity={0}
                takeoverDuration={0.3}
                autoResumeDelay={0}
                autoRampDuration={0}
              />
            </div>
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Side Menu - Instagram Reels Style */}
            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">

              {/* Menu */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
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
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>

              {/* Casino */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => window.location.href = '/casino'}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
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
                {/* Share Button */}
                <button 
                  onClick={() => setIsShareDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.934-2.186 2.25 2.25 0 00-3.934 2.186z" />
                  </svg>
                </button>
                
                {/* AI Button */}
                <button 
                  onClick={() => {
                    setCurrentMatchForAI('Chiefs vs Bills');
                    setIsAIDrawerOpen(true);
                  }}
                  className="ai-icon-shimmer flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
                <ShinyText text="Mohamed Salah" speed={3} className="text-xl font-bold" />
              </div>

              {/* CTA */}
              <div className="flex items-center mb-2">
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
                  className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95"
                >
                  Bet Now <span className="font-bold">+450</span>
                </button>
                
              </div>

            </div>
          </div>
        );
      },
    },
    {
      id: 'chiefs-parlay',
      render: (active: boolean, reelId: string) => {
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
                autoDemo={false}
                autoSpeed={0}
                autoIntensity={0}
                takeoverDuration={0.3}
                autoResumeDelay={0}
                autoRampDuration={0}
              />
            </div>
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Side Menu - Instagram Reels Style */}
            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">

              {/* Menu */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
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
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>

              {/* Casino */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => window.location.href = '/casino'}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
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
                {/* Share Button */}
                <button 
                  onClick={() => setIsShareDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.934-2.186 2.25 2.25 0 00-3.934 2.186z" />
                  </svg>
                </button>
                
                {/* AI Button */}
                <button 
                  onClick={() => {
                    setCurrentMatchForAI('Chiefs vs Bills');
                    setIsAIDrawerOpen(true);
                  }}
                  className="ai-icon-shimmer flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
              <div className="flex items-center mb-2">
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
                  className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95"
                >
                  Bet Now <span className="font-bold">+500</span>
                </button>
                
              </div>

            </div>
          </div>
        );
      },
    },
    {
      id: 'kelce-first-td',
      render: (active: boolean, reelId: string) => {
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
                autoDemo={false}
                autoSpeed={0}
                autoIntensity={0}
                takeoverDuration={0.3}
                autoResumeDelay={0}
                autoRampDuration={0}
              />
            </div>
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Side Menu - Instagram Reels Style */}
            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">

              {/* Menu */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
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
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>

              {/* Casino */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => window.location.href = '/casino'}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
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
                {/* Share Button */}
                <button 
                  onClick={() => setIsShareDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.934-2.186 2.25 2.25 0 00-3.934 2.186z" />
                  </svg>
                </button>
                
                {/* AI Button */}
                <button 
                  onClick={() => {
                    setCurrentMatchForAI('Chiefs vs Bills');
                    setIsAIDrawerOpen(true);
                  }}
                  className="ai-icon-shimmer flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
                <ShinyText text="Travis Kelce" speed={3} className="text-xl font-bold" />
              </div>

              {/* CTA */}
              <div className="flex items-center mb-2">
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
                  className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95"
                >
                  Bet Now <span className="font-bold">+350</span>
                </button>
                
              </div>

            </div>
          </div>
        );
      },
    },
    
    // More Premier League
    {
      id: 'over-goals',
      render: (active: boolean, reelId: string) => {
        return (
          <div className="relative h-app w-full">
            <div className="absolute inset-0 z-0">
              <LiquidEther colors={['#059669', '#dc2626', '#7c3aed']} />
            </div>
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M8 18h8" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Menu</span>
                </button>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <button className="relative" onClick={() => window.location.href = "/casino"}>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
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
                {/* Share Button */}
                <button 
                  onClick={() => setIsShareDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.934-2.186 2.25 2.25 0 00-3.934 2.186z" />
                  </svg>
                </button>
                
                {/* AI Button */}
                <button onClick={() => {
                  setCurrentMatchForAI('Man City vs Chelsea');
                  setIsAIDrawerOpen(true);
                }} className="ai-icon-shimmer flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
                <ShinyText text="Over 3.1 Goals" speed={3} className="text-xl font-bold" />
              </div>
              <div className="flex items-center mb-2">
                <button onClick={() => {
                  setCurrentBet({
                    match: "Man City vs Chelsea",
                    market: "Total Goals",
                    selection: "Over 3.1",
                    odds: -110
                  });
                  setIsBettingOverlayOpen(true);
                }} className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95">
                  Bet Now <span className="font-bold">-110</span>
                </button>
                
              </div>
            </div>
          </div>
        );
      },
    },
    
    // Kentucky Derby Reel (moved up)
    {
      id: 'kentucky-derby',
      render: (active: boolean, reelId: string) => {
        return (
          <div className="relative h-app w-full">
            <div className="absolute inset-0 z-0">
              <LiquidEther colors={['#f59e0b', '#dc2626', '#1e40af']} />
            </div>
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M8 18h8" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Menu</span>
                </button>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <button className="relative" onClick={() => window.location.href = "/casino"}>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
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
                {/* Share Button */}
                <button 
                  onClick={() => setIsShareDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.934-2.186 2.25 2.25 0 00-3.934 2.186z" />
                  </svg>
                </button>
                
                {/* AI Button */}
                <button onClick={() => {
                  setCurrentMatchForAI('Warriors vs Lakers');
                  setIsAIDrawerOpen(true);
                }} className="ai-icon-shimmer flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
                <ShinyText text="LeBron James 25+ Points" speed={3} className="text-xl font-bold" />
              </div>
              <div className="flex items-center mb-2">
                <button onClick={() => {
                  setCurrentBet({
                    match: "Lakers vs Warriors",
                    market: "Player Points",
                    selection: "LeBron James 25+",
                    odds: -120
                  });
                  setIsBettingOverlayOpen(true);
                }} className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95">
                  Bet Now <span className="font-bold">-120</span>
                </button>
                
              </div>
            </div>
          </div>
        );
      },
    },
    
    // Masters Golf Reel (moved up)
    {
      id: 'masters-golf',
      render: (active: boolean, reelId: string) => {
        return (
          <div className="relative h-app w-full">
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
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
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
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>

              {/* Casino */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => window.location.href = '/casino'}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
              </div>


            </div>

            {/* Main Content - Bottom Left */}
            <div className="absolute bottom-24 left-6 right-6 z-20">
              {/* Game Header */}
              <div className="mb-2">
                <div className="text-white/60 text-xs mb-1">Slot Game • NetEnt</div>
                <div className="text-white text-lg font-bold">Finn and the Swirly Spin</div>
              </div>

              {/* Share & AI Buttons */}
              <div className="flex items-center space-x-3 mb-3">
                {/* Share Button */}
                <button 
                  onClick={() => setIsShareDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.934-2.186 2.25 2.25 0 00-3.934 2.186z" />
                  </svg>
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
              <div className="flex items-center mb-2">
                <button 
                  onClick={() => setIsCasinoGameOpen(true)}
                  className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95"
                >
                  Play Now
                </button>
                
              </div>
            </div>
          </div>
        );
      },
    },

    // 7. Premier League Parlay Bundle
    {
      id: 'premier-league-parlay',
      render: (active: boolean, reelId: string) => {
        return (
          <div className="relative h-app w-full">
            <div className="absolute inset-0 z-0">
              <LiquidEther
                colors={['#059669', '#dc2626', '#7c3aed']}
                mouseForce={25}
                cursorSize={120}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.6}
                isBounce={false}
                autoDemo={false}
                autoSpeed={0}
                autoIntensity={0}
                takeoverDuration={0.3}
                autoResumeDelay={0}
                autoRampDuration={0}
              />
            </div>
            
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            <div className="absolute top-4 left-4 z-30">
            </div>

            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M8 18h8" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Menu</span>
                </button>
              </div>

              <button 
                onClick={() => {
                  setLikedReels(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(reelId)) {
                      newSet.delete(reelId);
                    } else {
                      newSet.add(reelId);
                    }
                    return newSet;
                  });
                }}
                className="flex flex-col items-center space-y-1"
              >
                <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'}`}>
                  <svg className="w-6 h-6 text-white" fill={likedReels.has(reelId) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-white text-xs font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Like</span>
              </button>

              <div className="flex flex-col items-center space-y-2">
                <button className="relative" onClick={() => window.location.href = "/casino"}>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
              </div>


            </div>

            <div className="absolute bottom-24 left-6 right-6 z-20">
              <div className="mb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Image src="/Premier League.svg" alt="Premier League" width={20} height={20} className="opacity-80" />
                  <span className="text-white/60 text-xs">Premier League • Parlay Bundle</span>
                </div>
                <div className="text-white/80 text-xs mb-2">Today 3:00 PM GMT</div>
                <div className="text-white text-lg font-bold">Multi-Match Parlay</div>
              </div>

              <div className="flex items-center space-x-4 mb-3">
                {/* Share Button */}
                <button 
                  onClick={() => setIsShareDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.934-2.186 2.25 2.25 0 00-3.934 2.186z" />
                  </svg>
                </button>
                
                {/* AI Button */}
                <button onClick={() => {
                  setCurrentMatchForAI('Man City vs Real Madrid');
                  setIsAIDrawerOpen(true);
                }} className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
                <div className="text-white/80 text-sm font-medium">Parlay Bundle</div>
                <div className="text-white text-sm">
                  <div>• Man City to Win</div>
                  <div>• Arsenal Over 1.5 Goals</div>
                  <div>• Liverpool Clean Sheet</div>
                </div>
              </div>

              <div className="flex items-center mb-2">
                <button 
                  onClick={() => {
                    setCurrentBet({
                      match: "Premier League Parlay",
                      market: "Parlay Bundle",
                      selection: "Man City + Arsenal Goals + Liverpool Clean Sheet",
                      odds: 850
                    });
                    setIsBettingOverlayOpen(true);
                  }}
                  className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95"
                >
                  Bet Now <span className="font-bold">+850</span>
                </button>
                
              </div>
            </div>
          </div>
        );
      },
    },

    // 8. Rabid Randy Casino Reel (Every 4th reel)
    {
      id: 'rabid-randy-slot',
      render: (active: boolean, reelId: string) => {
        return (
          <div className="relative h-app w-full">
            {/* Casino Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/rabid_randy_background_2024_07_04.png"
                alt="Rabid Randy Background"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="absolute inset-0 bg-black/60 z-10"></div>

            <div className="absolute top-4 left-4 z-30">
            </div>

            {/* Casino Game Thumbnail - Left Aligned */}
            <div className="absolute top-1/2 left-6 transform -translate-y-1/2 z-20" style={{marginTop: '-40px'}}>
              <Image
                src="/rabid_randy_square_1080x_1080_2024_08_04.png"
                alt="Rabid Randy Slot"
                width={120}
                height={120}
                className="rounded-lg shadow-lg"
                style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
              />
            </div>

            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
              {/* Menu */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
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
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>

              {/* Casino */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => window.location.href = '/casino'}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
              </div>


            </div>

            <div className="absolute bottom-24 left-6 right-6 z-20">
              <div className="text-white text-2xl font-bold mb-2">Rabid Randy</div>

              <div className="flex items-center mb-3">
                <button className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm hover:from-yellow-500/30 hover:to-yellow-600/30 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-yellow-400/30">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                  </svg>
                  <span className="text-yellow-400 text-xs">Jackpots</span>
                </button>
              </div>

              <div className="w-8 h-px bg-white/30 mb-3"></div>

              <div className="space-y-1 mb-3">
                <div className="text-white/80 text-sm font-medium">Slot Game • Pragmatic Play</div>
                <div className="text-white text-xl font-bold">Wild West Adventure</div>
              </div>

              <button 
                onClick={() => setIsCasinoGameOpen(true)}
                className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95 mb-2"
              >
                Play Now
              </button>
            </div>
          </div>
        );
      },
    },

    // 9. NBA Reel - Curry 3-Pointers
    {
      id: 'curry-threes',
      render: (active: boolean, reelId: string) => {
        return (
          <div className="relative h-app w-full">
            <div className="absolute inset-0 z-0">
              <LiquidEther
                colors={['#1d4ed8', '#f59e0b', '#dc2626']}
                mouseForce={25}
                cursorSize={120}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.6}
                isBounce={false}
                autoDemo={false}
                autoSpeed={0}
                autoIntensity={0}
                takeoverDuration={0.3}
                autoResumeDelay={0}
                autoRampDuration={0}
              />
            </div>
            
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            <div className="absolute top-4 left-4 z-30">
            </div>

            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M8 18h8" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Menu</span>
                </button>
              </div>

              <button 
                onClick={() => {
                  setLikedReels(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(reelId)) {
                      newSet.delete(reelId);
                    } else {
                      newSet.add(reelId);
                    }
                    return newSet;
                  });
                }}
                className="flex flex-col items-center space-y-1"
              >
                <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'}`}>
                  <svg className="w-6 h-6 text-white" fill={likedReels.has(reelId) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-white text-xs font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Like</span>
              </button>

              <div className="flex flex-col items-center space-y-2">
                <button className="relative" onClick={() => window.location.href = "/casino"}>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
              </div>


            </div>

            <div className="absolute bottom-24 left-6 right-6 z-20">
              <div className="mb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Image src="/NBA.svg" alt="NBA" width={20} height={20} className="opacity-80" />
                  <span className="text-white/60 text-xs">NBA • Regular Season</span>
                </div>
                <div className="text-white/80 text-xs mb-2">Today 10:00 PM EST</div>
                <div className="flex items-center space-x-3">
                  <div className="text-white text-lg font-bold">Warriors</div>
                  <div className="text-white/40 text-sm">vs</div>
                  <div className="text-white text-lg font-bold">Lakers</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-3">
                {/* Share Button */}
                <button 
                  onClick={() => setIsShareDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.934-2.186 2.25 2.25 0 00-3.934 2.186z" />
                  </svg>
                </button>
                
                {/* AI Button */}
                <button onClick={() => {
                  setCurrentMatchForAI('Man City vs Real Madrid');
                  setIsAIDrawerOpen(true);
                }} className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
                <div className="text-white/80 text-sm font-medium">3-Pointers Made</div>
                <ShinyText text="Stephen Curry Over 4.5" speed={3} className="text-xl font-bold" />
              </div>

              <div className="flex items-center mb-2">
                <button 
                  onClick={() => {
                    setCurrentBet({
                      match: "Warriors vs Lakers",
                      market: "3-Pointers Made",
                      selection: "Stephen Curry Over 4.5",
                      odds: 180
                    });
                    setIsBettingOverlayOpen(true);
                  }}
                  className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95"
                >
                  Bet Now <span className="font-bold">+180</span>
                </button>
                
              </div>
            </div>
          </div>
        );
      },
    },

    // 10. Champions League Reel - Haaland Goals
    {
      id: 'haaland-goals',
      render: (active: boolean, reelId: string) => {
        return (
          <div className="relative h-app w-full">
            <div className="absolute inset-0 z-0">
              <LiquidEther
                colors={['#1e40af', '#dc2626', '#059669']}
                mouseForce={25}
                cursorSize={120}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.6}
                isBounce={false}
                autoDemo={false}
                autoSpeed={0}
                autoIntensity={0}
                takeoverDuration={0.3}
                autoResumeDelay={0}
                autoRampDuration={0}
              />
            </div>
            
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            <div className="absolute top-4 left-4 z-30">
            </div>

            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M8 18h8" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Menu</span>
                </button>
              </div>

              <button 
                onClick={() => {
                  setLikedReels(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(reelId)) {
                      newSet.delete(reelId);
                    } else {
                      newSet.add(reelId);
                    }
                    return newSet;
                  });
                }}
                className="flex flex-col items-center space-y-1"
              >
                <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'}`}>
                  <svg className="w-6 h-6 text-white" fill={likedReels.has(reelId) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-white text-xs font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Like</span>
              </button>

              <div className="flex flex-col items-center space-y-2">
                <button className="relative" onClick={() => window.location.href = "/casino"}>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
              </div>


            </div>

            <div className="absolute bottom-24 left-6 right-6 z-20">
              <div className="mb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Image src="/UEFA Champions League.svg" alt="Champions League" width={20} height={20} className="opacity-80" />
                  <span className="text-white/60 text-xs">Champions League • Round of 16</span>
                </div>
                <div className="text-white/80 text-xs mb-2">Today 8:00 PM GMT</div>
                <div className="flex items-center space-x-3">
                  <div className="text-white text-lg font-bold">Man City</div>
                  <div className="text-white/40 text-sm">vs</div>
                  <div className="text-white text-lg font-bold">Real Madrid</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-3">
                {/* Share Button */}
                <button 
                  onClick={() => setIsShareDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.934-2.186 2.25 2.25 0 00-3.934 2.186z" />
                  </svg>
                </button>
                
                {/* AI Button */}
                <button onClick={() => {
                  setCurrentMatchForAI('Man City vs Real Madrid');
                  setIsAIDrawerOpen(true);
                }} className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
                <div className="text-white/80 text-sm font-medium">Anytime Goalscorer</div>
                <ShinyText text="Erling Haaland" speed={3} className="text-xl font-bold" />
              </div>

              <div className="flex items-center mb-2">
                <button 
                  onClick={() => {
                    setCurrentBet({
                      match: "Man City vs Real Madrid",
                      market: "Anytime Goalscorer",
                      selection: "Erling Haaland",
                      odds: 220
                    });
                    setIsBettingOverlayOpen(true);
                  }}
                  className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95"
                >
                  Bet Now <span className="font-bold">+220</span>
                </button>
                
              </div>
            </div>
          </div>
        );
      },
    },

    // 11. Horse Racing Reel - Kentucky Derby
    {
      id: 'kentucky-derby',
      render: (active: boolean, reelId: string) => {
        return (
          <div className="relative h-app w-full">
            <div className="absolute inset-0 z-0">
              <LiquidEther
                colors={['#8b5cf6', '#f59e0b', '#dc2626']}
                mouseForce={25}
                cursorSize={120}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.6}
                isBounce={false}
                autoDemo={false}
                autoSpeed={0}
                autoIntensity={0}
                takeoverDuration={0.3}
                autoResumeDelay={0}
                autoRampDuration={0}
              />
            </div>
            
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            <div className="absolute top-4 left-4 z-30">
            </div>

            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
              {/* Menu */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
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
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>

              {/* Casino */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => window.location.href = '/casino'}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
              </div>


            </div>

            <div className="absolute bottom-24 left-6 right-6 z-20">
              <div className="mb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Image
                    src="/Horse-Racing-101.svg"
                    alt="Horse Racing"
                    width={20}
                    height={20}
                    className="opacity-80"
                  />
                  <span className="text-white/60 text-xs">Horse Racing • Kentucky Derby</span>
                </div>
                <div className="text-white/80 text-xs mb-2">Today 6:57 PM EST</div>
                <div className="text-white text-lg font-bold">Thunder Strike to Win</div>
              </div>

              <div className="flex items-center space-x-4 mb-3">
                {/* Share Button */}
                <button 
                  onClick={() => setIsShareDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.934-2.186 2.25 2.25 0 00-3.934 2.186z" />
                  </svg>
                </button>
                
                {/* AI Button */}
                <button onClick={() => {
                  setCurrentMatchForAI('Man City vs Real Madrid');
                  setIsAIDrawerOpen(true);
                }} className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
                <div className="text-white/80 text-sm font-medium">Winner</div>
                <ShinyText text="Thunder Strike" speed={3} className="text-xl font-bold" />
              </div>

              <div className="flex items-center mb-2">
                <button 
                  onClick={() => {
                    setCurrentBet({
                      match: "Kentucky Derby",
                      market: "Winner",
                      selection: "Thunder Strike",
                      odds: 750
                    });
                    setIsBettingOverlayOpen(true);
                  }}
                  className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95"
                >
                  Bet Now <span className="font-bold">+750</span>
                </button>
                
              </div>
            </div>
          </div>
        );
      },
    },

    // 12. Golf Reel - Masters Tournament
    {
      id: 'masters-golf',
      render: (active: boolean, reelId: string) => {
        return (
          <div className="relative h-app w-full">
            <div className="absolute inset-0 z-0">
              <LiquidEther
                colors={['#059669', '#f59e0b', '#1e40af']}
                mouseForce={25}
                cursorSize={120}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.6}
                isBounce={false}
                autoDemo={false}
                autoSpeed={0}
                autoIntensity={0}
                takeoverDuration={0.3}
                autoResumeDelay={0}
                autoRampDuration={0}
              />
            </div>
            
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            <div className="absolute top-4 left-4 z-30">
            </div>

            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
              {/* Menu */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
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
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>

              {/* Casino */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => window.location.href = '/casino'}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
              </div>


            </div>

            <div className="absolute bottom-24 left-6 right-6 z-20">
              <div className="mb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Image
                    src="/Golf pga.svg"
                    alt="Golf"
                    width={20}
                    height={20}
                    className="opacity-80"
                  />
                  <span className="text-white/60 text-xs">Golf • Masters Tournament</span>
                </div>
                <div className="text-white/80 text-xs mb-2">Today 2:00 PM EST</div>
                <div className="text-white text-lg font-bold">Tiger Woods to Win</div>
              </div>

              <div className="flex items-center space-x-4 mb-3">
                {/* Share Button */}
                <button 
                  onClick={() => setIsShareDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.934-2.186 2.25 2.25 0 00-3.934 2.186z" />
                  </svg>
                </button>
                
                {/* AI Button */}
                <button onClick={() => {
                  setCurrentMatchForAI('Man City vs Real Madrid');
                  setIsAIDrawerOpen(true);
                }} className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
                <div className="text-white/80 text-sm font-medium">Tournament Winner</div>
                <ShinyText text="Tiger Woods" speed={3} className="text-xl font-bold" />
              </div>

              <div className="flex items-center mb-2">
                <button 
                  onClick={() => {
                    setCurrentBet({
                      match: "Masters Tournament",
                      market: "Tournament Winner",
                      selection: "Tiger Woods",
                      odds: 1200
                    });
                    setIsBettingOverlayOpen(true);
                  }}
                  className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95"
                >
                  Bet Now <span className="font-bold">+1200</span>
                </button>
                
              </div>
            </div>
          </div>
        );
      },
    },

    // 13. Formula 1 Reel - Monaco Grand Prix
    {
      id: 'monaco-f1',
      render: (active: boolean, reelId: string) => {
        return (
          <div className="relative h-app w-full">
            <div className="absolute inset-0 z-0">
              <LiquidEther
                colors={['#dc2626', '#1e40af', '#f59e0b']}
                mouseForce={25}
                cursorSize={120}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.6}
                isBounce={false}
                autoDemo={false}
                autoSpeed={0}
                autoIntensity={0}
                takeoverDuration={0.3}
                autoResumeDelay={0}
                autoRampDuration={0}
              />
            </div>
            
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            <div className="absolute top-4 left-4 z-30">
            </div>

            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
              {/* Menu */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
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
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>

              {/* Casino */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => window.location.href = '/casino'}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
              </div>


            </div>

            <div className="absolute bottom-24 left-6 right-6 z-20">
              <div className="mb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Image
                    src="/Formula 1.svg"
                    alt="Formula 1"
                    width={20}
                    height={20}
                    className="opacity-80"
                  />
                  <span className="text-white/60 text-xs">Formula 1 • Monaco Grand Prix</span>
                </div>
                <div className="text-white/80 text-xs mb-2">Today 3:00 PM CET</div>
                <div className="text-white text-lg font-bold">Lewis Hamilton to Win</div>
              </div>

              <div className="flex items-center space-x-4 mb-3">
                {/* Share Button */}
                <button 
                  onClick={() => setIsShareDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.934-2.186 2.25 2.25 0 00-3.934 2.186z" />
                  </svg>
                </button>
                
                {/* AI Button */}
                <button onClick={() => {
                  setCurrentMatchForAI('Man City vs Real Madrid');
                  setIsAIDrawerOpen(true);
                }} className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
                <div className="text-white/80 text-sm font-medium">Race Winner</div>
                <ShinyText text="Lewis Hamilton" speed={3} className="text-xl font-bold" />
              </div>

              <div className="flex items-center mb-2">
                <button 
                  onClick={() => {
                    setCurrentBet({
                      match: "Monaco Grand Prix",
                      market: "Race Winner",
                      selection: "Lewis Hamilton",
                      odds: 450
                    });
                    setIsBettingOverlayOpen(true);
                  }}
                  className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95"
                >
                  Bet Now <span className="font-bold">+450</span>
                </button>
                
              </div>
            </div>
          </div>
        );
      },
    },

    // Wheel of Fortune Reel
    {
      id: 'wheel-of-fortune',
      render: (active: boolean, reelId: string) => {
        return (
          <div className="relative h-app w-full">
            <div className="absolute inset-0 z-0">
              <LiquidEther
                colors={['#ff0080', '#ff8000', '#8000ff']}
                mouseForce={25}
                cursorSize={120}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.6}
                isBounce={false}
                autoDemo={false}
                autoSpeed={0}
                autoIntensity={0}
                takeoverDuration={0.3}
                autoResumeDelay={0}
                autoRampDuration={0}
              />
            </div>
            
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            <div className="absolute top-4 left-4 z-30">
            </div>


            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M8 18h8" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Menu</span>
                </button>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => window.location.href = '/casino'}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
              </div>


            </div>

            <div className="absolute inset-0 z-20 flex flex-col items-start justify-center px-4" style={{marginTop: '-50px'}}>
              <div className="mb-8">
                <BetterWheel
                  ref={wheelRef}
                  size={280}
                  isSpinning={isSpinning}
                  lastResult={lastResult}
                  onResult={(result) => {
                    setLastResult(result.value);
                    setIsSpinning(false);
                  }}
                />
              </div>
            </div>

            <div className="absolute bottom-24 left-4 z-30 max-w-48">
              <div className="mb-4">
                <h1 className="text-xl font-black text-white mb-2">Wheel of Fortune</h1>
                <p className="text-white/80 text-sm">Spin for multipliers up to 50x! Risk $1 to win big.</p>
              </div>
              <button 
                onClick={() => {
                  if (!isSpinning) {
                    setIsSpinning(true);
                    setLastResult(undefined);
                    wheelRef.current?.spin();
                  }
                }}
                className="px-6 py-3 rounded-lg font-bold text-sm transition-all duration-200 bg-white text-black hover:bg-gray-100"
              >
                SPIN FOR $1
              </button>
            </div>

            {lastResult !== undefined && (
              <div className="absolute top-40 left-1/2 transform -translate-x-1/2 z-40">
                <div className="bg-black/50 backdrop-blur-sm text-white px-6 py-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    ${(lastResult * 1).toFixed(2)}
                  </div>
                  <div className="text-sm text-white/80">
                    {lastResult === 0 ? "Try again!" : "You won!"}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      },
    },


    // Boxing Interest Reel
    {
      id: 'boxing-interest',
      render: (active: boolean, reelId: string) => {
        return (
          <div className="relative h-app w-full">
            <div className="absolute inset-0 z-0">
              <img 
                src="/ali-liston.jpg" 
                alt="Boxing Background" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>

            <div className="absolute top-4 left-4 z-30">
            </div>


            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M8 18h8" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Menu</span>
                </button>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <button className="relative" onClick={() => window.location.href = "/casino"}>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
              </div>


            </div>

            <div className="absolute bottom-24 left-6 z-20" style={{right: '100px'}}>
              <div className="mb-4">
                {boxingAnswer === null ? (
                  <>
                    <h1 className="text-xl font-black text-white mb-2">Are you interested in boxing?</h1>
                    <p className="text-white/80 text-sm mb-4 max-w-xs">We have some great boxing events coming up that could be added to your reels.</p>
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => setBoxingAnswer('yes')}
                        className="px-6 py-3 rounded-lg font-bold text-sm bg-white text-black hover:bg-gray-100 transition-all duration-200"
                      >
                        YES
                      </button>
                      <button 
                        onClick={() => setBoxingAnswer('no')}
                        className="px-6 py-3 rounded-lg font-bold text-sm bg-transparent border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-200"
                      >
                        NO
                      </button>
                    </div>
                  </>
                ) : boxingAnswer === 'yes' ? (
                  <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
                    <h2 className="text-lg font-bold text-white mb-2">Great! 🥊</h2>
                    <p className="text-white/90 text-sm">We'll add some big boxing events to your reels soon. Get ready for some epic fights!</p>
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h2 className="text-lg font-bold text-white mb-2">No problem!</h2>
                    <p className="text-white/90 text-sm">We'll focus on other sports you love.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      },
    },

    // Live Soccer Game Reel
    {
      id: 'live-soccer-game',
      render: (active: boolean, reelId: string) => {
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
                autoDemo={false}
                autoSpeed={0}
                autoIntensity={0}
                takeoverDuration={0.3}
                autoResumeDelay={0}
                autoRampDuration={0}
              />
            </div>
            
            <div className="absolute top-0 left-0 right-0 h-80 z-0 opacity-85">
              <Image 
                src="/istockphoto-155377221-612x612.jpg" 
                alt="Soccer Pitch" 
                fill
                className="object-cover"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 100%)'
                }}
              />
            </div>
            
            <div className="absolute inset-0 bg-black/20 z-10"></div>

            <div className="absolute top-4 left-4 z-30">
            </div>


            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-bold">1H 2:1</div>
                  <div className="text-xs text-white/60">43'</div>
                </div>
              </div>
            </div>

            <div className="absolute top-48 left-1/2 transform -translate-x-1/2 z-40">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-30"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative w-20 h-1">
                    <div className="absolute inset-0 flex items-center space-x-1">
                      <div className="w-3 h-1 bg-blue-500/20 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
                      <div className="w-3 h-1 bg-blue-500/40 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-3 h-1 bg-blue-500/60 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      <div className="w-3 h-1 bg-blue-500/80 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                      <div className="w-3 h-1 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" style={{animationDuration: '1.5s'}}></div>
                  </div>
                  <div className="w-0 h-0 border-l-6 border-l-blue-500 border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
                </div>
                <div className="text-white text-sm font-bold">CHELSEA ATTACK</div>
              </div>
            </div>

            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M8 18h8" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Menu</span>
                </button>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <button className="relative" onClick={() => window.location.href = "/casino"}>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
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
                <div className="flex items-center space-x-2 mb-2">
                  <div className="text-white/80 text-xs">43' - 1st Half</div>
                  <div className="inline-flex items-center space-x-1 bg-red-600 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-white text-lg font-bold">Arsenal</div>
                  <div className="text-white/40 text-sm">
                    <span className="text-white font-bold">2</span> - 1
                  </div>
                  <div className="text-white/60 text-lg font-bold">Chelsea</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-3">
                {/* Share Button */}
                <button 
                  onClick={() => setIsShareDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.934-2.186 2.25 2.25 0 00-3.934 2.186z" />
                  </svg>
                </button>
                
                {/* AI Button */}
                <button 
                  onClick={() => {
                    setCurrentMatchForAI('Chiefs vs Bills');
                    setIsAIDrawerOpen(true);
                  }}
                  className="ai-icon-shimmer flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setIsMarketsDrawerOpen(true)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-white/70 text-xs">+34</span>
                </button>
                <button className="flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-3 py-2 transition-all duration-200 active:scale-95 border border-white/20">
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div className="w-8 h-px bg-white/30 mb-3"></div>
              <div className="space-y-1 mb-3">
                <div className="text-white/80 text-sm font-medium">Next Goalscorer</div>
                <ShinyText text="Chelsea to Score Next" speed={3} className="text-xl font-bold" />
              </div>
              <div className="flex items-center mb-2">
                <button 
                  onClick={() => {
                    setCurrentBet({
                      match: "Arsenal vs Chelsea",
                      market: "Next Goalscorer",
                      selection: "Chelsea to Score Next",
                      odds: 450
                    });
                    setIsBettingOverlayOpen(true);
                  }}
                  className="bg-white text-black py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95"
                >
                  Bet Now <span className="font-bold">+450</span>
                </button>
                
              </div>
            </div>
          </div>
        );
      },
    },

    // Mission Completion Celebration Reel
    {
      id: 'mission-completion',
      render: (active: boolean, reelId: string) => {
        // Initialize confetti and progress animation when reel becomes active
        useEffect(() => {
          if (active) {
            // Create a hidden target element for confetti
            const confettiTarget = document.createElement('div');
            confettiTarget.id = 'confetti-target';
            confettiTarget.style.position = 'fixed';
            confettiTarget.style.top = '0';
            confettiTarget.style.left = '0';
            confettiTarget.style.width = '100%';
            confettiTarget.style.height = '100%';
            confettiTarget.style.pointerEvents = 'none';
            confettiTarget.style.zIndex = '9998';
            document.body.appendChild(confettiTarget);
            
            // Initialize confetti
            new SimpleConfetti('confetti-target');
            
            // Animate progress bar from 75% to 87.5% (500 XP gain)
            setTimeout(() => {
              const progressBar = document.querySelector('.progress-bar-fill') as HTMLElement;
              if (progressBar) {
                progressBar.style.width = '75%';
                setTimeout(() => {
                  progressBar.style.transition = 'width 2s ease-out';
                  progressBar.style.width = '87.5%';
                }, 500);
              }
            }, 1000);
            
            // Trigger confetti explosion from center of screen
            setTimeout(() => {
              const centerX = window.innerWidth / 2;
              const centerY = window.innerHeight / 2;
              
              // Simulate a click event at the center of the screen
              const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: centerX,
                clientY: centerY
              });
              confettiTarget.dispatchEvent(event);
            }, 1500);
            
            // Cleanup after animation
            return () => {
              setTimeout(() => {
                if (document.getElementById('confetti-target')) {
                  document.getElementById('confetti-target')?.remove();
                }
              }, 5000);
            };
          }
        }, [active]);

        return (
          <div className="relative h-app w-full">
            {/* Animated Gradient Background */}
            <div 
              className="absolute inset-0 z-0"
              style={{
                background: 'linear-gradient(45deg, #1e1b4b, #312e81, #4c1d95, #7c3aed, #ec4899, #1e1b4b)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 8s ease-in-out infinite'
              }}
            ></div>
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Side Menu - Instagram Reels Style */}
            <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">

              {/* Menu */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => setIsMenuDrawerOpen(true)}
                >
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
                <button 
                  className="relative"
                  onClick={() => {
                    setLikedReels(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(reelId)) {
                        newSet.delete(reelId);
                      } else {
                        newSet.add(reelId);
                      }
                      return newSet;
                    });
                  }}
                >
                  <div className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                    likedReels.has(reelId) ? 'bg-pink-500' : 'bg-white/10'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Like</span>
                </button>
              </div>

              {/* Casino */}
              <div className="flex flex-col items-center space-y-2">
                <button 
                  className="relative"
                  onClick={() => window.location.href = '/casino'}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
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

              {/* Rewards */}
              <div className="flex flex-col items-center space-y-2">
                <Link href="/rewards" className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Rewards</span>
                </Link>
              </div>

            </div>

            {/* Content - Left Side */}
            <div className="absolute left-6 bottom-24 z-20 max-w-lg">

              {/* Category */}
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.7-2h8.6l.9-5.4L12 8.5 6.8 8.6L7.7 14z"/>
                </svg>
                <span className="text-white/70 text-xs">Mission Complete • Rewards</span>
              </div>

              {/* Mission Title */}
              <div className="text-white text-lg font-bold mb-2">Daily Sports Mission</div>

              {/* Mission Description */}
              <div className="text-white/80 text-sm mb-4">Place 5 bets on any sport</div>

              {/* Mission Status */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs font-medium">Completed</span>
                <span className="text-white/60 text-xs">+500 XP</span>
              </div>

              {/* Level Progress */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-4">
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.7-2h8.6l.9-5.4L12 8.5 6.8 8.6L7.7 14z"/>
                    </svg>
                    <span className="text-white font-bold text-base">Silver Tier</span>
                  </div>
                  <div className="text-sm text-white/60">3,000 / 4,000 XP</div>
                </div>
                
                <div className="mb-4">
                  <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                    <div className="progress-bar-fill h-2 rounded-full" style={{
                      width: '75%',
                      background: 'linear-gradient(90deg, #a855f7, #ec4899, #a855f7)',
                      backgroundSize: '200% 100%',
                      animation: 'gradientShift 3s ease-in-out infinite'
                    }}></div>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-white/60">
                  <span>75% to Gold</span>
                  <span>1,000 XP needed</span>
                </div>
              </div>

              {/* CTA */}
              <Link 
                href="/rewards"
                className="bg-white text-black py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/90 active:scale-95 mb-2 flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <span>View Rewards</span>
              </Link>
            </div>
          </div>
        );
      },
    }
  ];

  // Handle URL-based reel navigation
  useEffect(() => {
    const reelId = searchParams.get('reel');
    if (reelId && reels.length > 0) {
      const reelIndex = reels.findIndex(reel => reel.id === reelId);
      if (reelIndex !== -1) {
        setCurrentReelIndex(reelIndex);
      }
    }
  }, [searchParams, reels]);

  // Update the handleReelChange function to include URL updating
  const updateHandleReelChange = (newIndex: number) => {
    setCurrentReelIndex(newIndex);
    const reelId = reels[newIndex]?.id;
    if (reelId) {
      const url = new URL(window.location.href);
      url.searchParams.set('reel', reelId);
      router.replace(url.pathname + url.search, { scroll: false });
    }
  };

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
      {/* Global Logo - Fixed on all reels */}
      <div className="fixed top-4 left-4 z-50">
        <Image src="/flaame.png" alt="Flaame Logo" width={60} height={60} />
      </div>

      {/* Global Balance - Fixed on all reels */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsBalanceDrawerOpen(true)}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-2 flex items-center space-x-3 hover:bg-white/20 transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <span className="text-white text-xs font-bold">BB</span>
          </div>
          <div className="w-px h-4 bg-white/30"></div>
          <div className="flex items-baseline space-x-1">
            <span className="text-white/60 text-xs">$</span>
            <span className="text-white text-sm font-bold">1,250.00</span>
          </div>
        </button>
      </div>

      <ReelsSwiper 
        items={reels} 
        onSlideChange={updateHandleReelChange}
        initialIndex={currentReelIndex}
      />
      
      {/* My Bets Modal */}
      {isBetSlipOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-hidden shadow-2xl">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-black">My Bets</h2>
                <button 
                  onClick={() => setIsBetSlipOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex space-x-2">
                {[
                  { label: "Pending", count: legs.filter(leg => leg.status === 'pending').length, type: 'pending' as const },
                  { label: "Graded", count: legs.filter(leg => leg.status !== 'pending').length, type: 'graded' as const }
                ].map((tab) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveBetFilter(tab.type)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeBetFilter === tab.type
                        ? 'bg-black text-white shadow-sm' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                      activeBetFilter === tab.type ? 'bg-white text-black' : 'bg-gray-400 text-white'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bet List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {(() => {
                const filteredLegs = activeBetFilter === 'pending' 
                  ? legs.filter(leg => leg.status === 'pending')
                  : legs.filter(leg => leg.status !== 'pending');
                
                if (filteredLegs.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {activeBetFilter === 'pending' ? 'No pending bets' : 'No graded bets'}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {activeBetFilter === 'pending' 
                          ? 'All your bets have been settled' 
                          : 'Place some bets to see them here'}
                      </p>
                    </div>
                  );
                }
                
                return (
                  <div className="space-y-3">
                    {filteredLegs.map((leg, index) => (
                    <div key={leg.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">{leg.selection}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              leg.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : leg.status === 'won'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {leg.status === 'pending' ? 'Pending' : leg.status === 'won' ? 'Won' : 'Lost'}
                            </span>
                          </div>
                          <p className="text-gray-600 text-xs mb-2">{leg.market} • {leg.match}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Stake: ${leg.stake}</span>
                            <span>Odds: {leg.odds > 0 ? `+${leg.odds}` : leg.odds}</span>
                            {leg.status === 'pending' ? (
                              <span className="font-medium text-blue-600">
                                {leg.match.includes('Chiefs') ? 'Sun, Dec 15 1:00 PM' : 
                                 leg.match.includes('Lakers') ? 'Mon, Dec 16 8:00 PM' :
                                 leg.match.includes('Arsenal') ? 'Sat, Dec 14 3:00 PM' : 'Game Time TBD'}
                              </span>
                            ) : (
                              <span className="font-medium">
                                {leg.status === 'won' ? `Win: $${(leg.stake * (leg.odds > 0 ? leg.odds / 100 : 100 / Math.abs(leg.odds))).toFixed(2)}` : 'Loss'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Place Bet Drawer */}
      {isBettingOverlayOpen && currentBet && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end">
          <div 
            className="bg-white/90 backdrop-blur-sm w-full rounded-t-2xl shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Content */}
            <div className="px-4 pb-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-black text-lg font-bold">Place Bet</h2>
                <button 
                  onClick={() => setIsBettingOverlayOpen(false)}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Stake Section - Ghost Card */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/15">
                {/* Stake Display */}
                <div className="text-center mb-4">
                  <div className="text-gray-600 text-sm mb-1">Stake</div>
                  <div className="text-black text-5xl font-black">${stake}</div>
                  <div className="text-gray-700 text-sm mt-1 font-medium">
                    Win: ${(stake * (currentBet.odds > 0 ? currentBet.odds / 100 : 100 / Math.abs(currentBet.odds))).toFixed(2)}
                  </div>
                </div>
                
                {/* Stake Slider */}
                <div>
                  <input
                    type="range"
                    min="5"
                    max="1000"
                    step="5"
                    value={stake}
                    onChange={(e) => setStake(Number(e.target.value))}
                    className="w-full h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-custom"
                    style={{
                      background: `linear-gradient(to right, 
                        #10b981 0%, 
                        #8b5cf6 ${((stake - 5) / (1000 - 5)) * 100}%, 
                        #d1d5db ${((stake - 5) / (1000 - 5)) * 100}%, 
                        #d1d5db 100%)`
                    }}
                  />
                  <style jsx>{`
                    .slider-custom::-webkit-slider-thumb {
                      appearance: none;
                      height: 28px;
                      width: 28px;
                      border-radius: 50%;
                      background: linear-gradient(135deg, #10b981 0%, #8b5cf6 100%);
                      cursor: pointer;
                      border: 3px solid #ffffff;
                      box-shadow: 
                        0 0 0 4px rgba(16, 185, 129, 0.2),
                        0 0 0 8px rgba(16, 185, 129, 0.1),
                        0 4px 12px rgba(0, 0, 0, 0.3);
                      transition: all 0.2s ease;
                    }
                    .slider-custom::-webkit-slider-thumb:hover {
                      transform: scale(1.1);
                      box-shadow: 
                        0 0 0 6px rgba(16, 185, 129, 0.3),
                        0 0 0 12px rgba(16, 185, 129, 0.15),
                        0 6px 16px rgba(0, 0, 0, 0.4);
                    }
                    .slider-custom::-moz-range-thumb {
                      height: 28px;
                      width: 28px;
                      border-radius: 50%;
                      background: linear-gradient(135deg, #10b981 0%, #8b5cf6 100%);
                      cursor: pointer;
                      border: 3px solid #ffffff;
                      box-shadow: 
                        0 0 0 4px rgba(16, 185, 129, 0.2),
                        0 0 0 8px rgba(16, 185, 129, 0.1),
                        0 4px 12px rgba(0, 0, 0, 0.3);
                    }
                  `}</style>
                  <div className="flex justify-between text-xs mt-2 font-medium">
                    <span className="text-black">$5</span>
                    <span className="text-black">$1000</span>
                  </div>
                </div>
              </div>
              
              {/* Bet Selection */}
              <div className="bg-gray-50/80 rounded-lg p-3 mb-4 border border-gray-200/80">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-black font-bold text-sm">{currentBet.selection}</div>
                    <div className="text-gray-600 text-xs">{currentBet.market}</div>
                    <div className="text-gray-500 text-xs">{currentBet.match}</div>
                  </div>
                  <div className="text-black font-bold">{currentBet.odds > 0 ? `+${currentBet.odds}` : currentBet.odds}</div>
                </div>
              </div>
              
              {/* Place Bet Button */}
              <button 
                onClick={() => {
                  // Place bet directly
                  addLeg({
                    id: `${currentBet.match}-${currentBet.selection}`,
                    match: currentBet.match,
                    market: currentBet.market,
                    selection: currentBet.selection,
                    odds: currentBet.odds,
                    stake: stake,
                  });
                  
                  // Show success screen
                  setShowSuccessScreen(true);
                }}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-bold transition-all"
              >
                Place Bet
              </button>
            </div>
            
            {/* Success Screen */}
            {showSuccessScreen && (
              <div className="absolute inset-0 bg-white rounded-t-2xl shadow-2xl flex flex-col items-center justify-center p-6">
                {/* Success Icon */}
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                {/* Success Message */}
                <h2 className="text-2xl font-bold text-black mb-2">Bet Placed!</h2>
                <p className="text-gray-600 text-center mb-8">
                  Your bet has been successfully placed and added to your bet history.
                </p>
                
                {/* Close Button - Main CTA */}
                <button
                  onClick={() => {
                    setIsBettingOverlayOpen(false);
                    setCurrentBet(null);
                    setStake(5);
                    setShowSuccessScreen(false);
                    setShowBetNotification(true);
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-black py-3 rounded-lg font-bold transition-all mb-3 border border-gray-200"
                >
                  Close
                </button>
                
                {/* My Bets Button - Secondary */}
                <button
                  onClick={() => {
                    setIsBettingOverlayOpen(false);
                    setCurrentBet(null);
                    setStake(5);
                    setShowSuccessScreen(false);
                    setShowBetNotification(true);
                    // Open My Bets after a short delay
                    setTimeout(() => {
                      setIsBetSlipOpen(true);
                    }, 100);
                  }}
                  className="text-gray-600 hover:text-gray-800 text-sm underline"
                >
                  View My Bets
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Insights Drawer */}
      {isAIDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsAIDrawerOpen(false)}></div>
          <div className="relative bg-white/95 backdrop-blur-xl rounded-t-2xl w-full max-w-md max-h-[50vh] overflow-hidden border-t border-white/20 flex flex-col">
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Header */}
            <div className="px-6 pb-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">AI Insights</h2>
              </div>
              <button 
                onClick={() => setIsAIDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {(() => {
                  const insights = getAIInsights(currentMatchForAI);
                  return (
                    <>
                      {/* Match Info */}
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{insights.title}</h3>
                        <div className="text-sm text-gray-600">{insights.time}</div>
                      </div>

                      {/* AI Analysis */}
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold text-purple-900">AI Analysis</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {insights.analysis}
                          </p>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm font-semibold text-blue-900">Key Insights</span>
                          </div>
                          <ul className="text-sm text-gray-700 space-y-2">
                            {insights.insights.map((insight: string, index: number) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-semibold text-green-900">Confidence Score</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: `${insights.confidence}%`}}></div>
                            </div>
                            <span className="text-sm font-semibold text-green-900">{insights.confidence}%</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">High confidence based on multiple data points</p>
                        </div>
                      </div>
                    </>
                  );
                })()}

                {/* Disclaimer */}
                <div className="text-xs text-gray-500 text-center border-t pt-4">
                  AI insights are for informational purposes only. Past performance doesn't guarantee future results.
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
          <div className="relative bg-white/95 backdrop-blur-xl rounded-t-2xl w-full max-w-md max-h-[50vh] overflow-hidden border-t border-white/20 flex flex-col">
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Header */}
            <div className="px-6 pb-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">More Markets</h2>
              </div>
              <button 
                onClick={() => setIsMarketsDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Match Info */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Chiefs vs Bills</h3>
                  <div className="text-sm text-gray-600">Today 8:20 PM EST</div>
                </div>

                {/* Markets Grid */}
                <div className="space-y-6">
                  {/* Moneyline */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-blue-900">Moneyline</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => {
                          addLeg({
                            id: "chiefs-bills-moneyline-chiefs",
                            match: "Chiefs vs Bills",
                            market: "Moneyline",
                            selection: "Chiefs",
                            odds: -120,
                            stake: 10
                          });
                          setIsMarketsDrawerOpen(false);
                          setIsBetSlipOpen(true);
                        }}
                        className="bg-white border border-blue-200 rounded-lg p-3 text-left hover:border-blue-400 transition-colors hover:bg-blue-50"
                      >
                        <div className="text-sm font-medium text-gray-900">Chiefs</div>
                        <div className="text-blue-600 font-bold text-sm">-120</div>
                      </button>
                      <button 
                        onClick={() => {
                          addLeg({
                            id: "chiefs-bills-moneyline-bills",
                            match: "Chiefs vs Bills",
                            market: "Moneyline",
                            selection: "Bills",
                            odds: +110,
                            stake: 10
                          });
                          setIsMarketsDrawerOpen(false);
                          setIsBetSlipOpen(true);
                        }}
                        className="bg-white border border-blue-200 rounded-lg p-3 text-left hover:border-blue-400 transition-colors hover:bg-blue-50"
                      >
                        <div className="text-sm font-medium text-gray-900">Bills</div>
                        <div className="text-blue-600 font-bold text-sm">+110</div>
                      </button>
                    </div>
                  </div>

                  {/* Spread */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-green-900">Spread</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => {
                          addLeg({
                            id: "chiefs-bills-spread-chiefs",
                            match: "Chiefs vs Bills",
                            market: "Spread",
                            selection: "Chiefs -3.5",
                            odds: -110,
                            stake: 10
                          });
                          setIsMarketsDrawerOpen(false);
                          setIsBetSlipOpen(true);
                        }}
                        className="bg-white border border-green-200 rounded-lg p-3 text-left hover:border-green-400 transition-colors hover:bg-green-50"
                      >
                        <div className="text-sm font-medium text-gray-900">Chiefs -3.5</div>
                        <div className="text-green-600 font-bold text-sm">-110</div>
                      </button>
                      <button 
                        onClick={() => {
                          addLeg({
                            id: "chiefs-bills-spread-bills",
                            match: "Chiefs vs Bills",
                            market: "Spread",
                            selection: "Bills +3.5",
                            odds: -110,
                            stake: 10
                          });
                          setIsMarketsDrawerOpen(false);
                          setIsBetSlipOpen(true);
                        }}
                        className="bg-white border border-green-200 rounded-lg p-3 text-left hover:border-green-400 transition-colors hover:bg-green-50"
                      >
                        <div className="text-sm font-medium text-gray-900">Bills +3.5</div>
                        <div className="text-green-600 font-bold text-sm">-110</div>
                      </button>
                    </div>
                  </div>

                  {/* Total Points */}
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-purple-900">Total Points</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => {
                          addLeg({
                            id: "chiefs-bills-total-over",
                            match: "Chiefs vs Bills",
                            market: "Total Points",
                            selection: "Over 47.5",
                            odds: -105,
                            stake: 10
                          });
                          setIsMarketsDrawerOpen(false);
                          setIsBetSlipOpen(true);
                        }}
                        className="bg-white border border-purple-200 rounded-lg p-3 text-left hover:border-purple-400 transition-colors hover:bg-purple-50"
                      >
                        <div className="text-sm font-medium text-gray-900">Over 47.5</div>
                        <div className="text-purple-600 font-bold text-sm">-105</div>
                      </button>
                      <button 
                        onClick={() => {
                          addLeg({
                            id: "chiefs-bills-total-under",
                            match: "Chiefs vs Bills",
                            market: "Total Points",
                            selection: "Under 47.5",
                            odds: -115,
                            stake: 10
                          });
                          setIsMarketsDrawerOpen(false);
                          setIsBetSlipOpen(true);
                        }}
                        className="bg-white border border-purple-200 rounded-lg p-3 text-left hover:border-purple-400 transition-colors hover:bg-purple-50"
                      >
                        <div className="text-sm font-medium text-gray-900">Under 47.5</div>
                        <div className="text-purple-600 font-bold text-sm">-115</div>
                      </button>
                    </div>
                  </div>

                  {/* Player Props */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-orange-900">Player Props</span>
                    </div>
                    <div className="space-y-3">
                      <button 
                        onClick={() => {
                          addLeg({
                            id: "chiefs-bills-player-mahomes",
                            match: "Chiefs vs Bills",
                            market: "Player Props",
                            selection: "Patrick Mahomes Over 275.5 Passing Yards",
                            odds: -110,
                            stake: 10
                          });
                          setIsMarketsDrawerOpen(false);
                          setIsBetSlipOpen(true);
                        }}
                        className="w-full bg-white border border-orange-200 rounded-lg p-3 text-left hover:border-orange-400 transition-colors hover:bg-orange-50"
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium text-gray-900">Patrick Mahomes Over 275.5 Passing Yards</div>
                          <div className="text-orange-600 font-bold text-sm">-110</div>
                        </div>
                      </button>
                      <button 
                        onClick={() => {
                          addLeg({
                            id: "chiefs-bills-player-allen",
                            match: "Chiefs vs Bills",
                            market: "Player Props",
                            selection: "Josh Allen Over 1.5 Passing TDs",
                            odds: -135,
                            stake: 10
                          });
                          setIsMarketsDrawerOpen(false);
                          setIsBetSlipOpen(true);
                        }}
                        className="w-full bg-white border border-orange-200 rounded-lg p-3 text-left hover:border-orange-400 transition-colors hover:bg-orange-50"
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium text-gray-900">Josh Allen Over 1.5 Passing TDs</div>
                          <div className="text-orange-600 font-bold text-sm">-135</div>
                        </div>
                      </button>
                      <button 
                        onClick={() => {
                          addLeg({
                            id: "chiefs-bills-player-kelce",
                            match: "Chiefs vs Bills",
                            market: "Player Props",
                            selection: "Travis Kelce Anytime TD",
                            odds: +145,
                            stake: 10
                          });
                          setIsMarketsDrawerOpen(false);
                          setIsBetSlipOpen(true);
                        }}
                        className="w-full bg-white border border-orange-200 rounded-lg p-3 text-left hover:border-orange-400 transition-colors hover:bg-orange-50"
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium text-gray-900">Travis Kelce Anytime TD</div>
                          <div className="text-orange-600 font-bold text-sm">+145</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Menu Drawer */}
      {isMenuDrawerOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => {
              setIsMenuDrawerOpen(false);
              setShowSportsLeagues(false);
            }}
          ></div>
          <div className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl border-l border-white/20 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200/50 flex-shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">Menu</span>
                <button
                  onClick={() => {
                    setIsMenuDrawerOpen(false);
                    setShowSportsLeagues(false);
                  }}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2 overflow-y-auto flex-1 min-h-0">
              {!showSportsLeagues && !showFavourites ? (
                <>
                  {/* My Favourites */}
                  <button
                    onClick={() => setShowFavourites(true)}
                    className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">My Favourites</div>
                      <div className="text-sm text-gray-500">Your liked reels</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Casino */}
                  <button 
                    onClick={() => window.location.href = '/casino'}
                    className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.4706 14.1249L16.2456 11.3249C16.3123 11.1249 16.3081 10.9249 16.2331 10.7249C16.1581 10.5249 16.0289 10.3582 15.8456 10.2249L13.4706 8.59991C13.3373 8.49991 13.1914 8.47907 13.0331 8.53741C12.8748 8.59574 12.7706 8.70824 12.7206 8.87491L11.9456 11.6749C11.8789 11.8749 11.8831 12.0749 11.9581 12.2749C12.0331 12.4749 12.1623 12.6416 12.3456 12.7749L14.7206 14.3999C14.8539 14.4999 14.9998 14.5207 15.1581 14.4624C15.3164 14.4041 15.4206 14.2916 15.4706 14.1249ZM4.09561 18.8249L3.27061 18.4249C2.75394 18.2082 2.40394 17.8374 2.22061 17.3124C2.03728 16.7874 2.06228 16.2666 2.29561 15.7499L4.09561 11.8499V18.8249ZM8.09561 20.9999C7.54561 20.9999 7.07478 20.7999 6.68311 20.3999C6.29144 19.9999 6.09561 19.5249 6.09561 18.9749V12.9999L8.77061 20.3499C8.82061 20.4666 8.86228 20.5791 8.89561 20.6874C8.92894 20.7957 8.98728 20.8999 9.07061 20.9999H8.09561ZM13.2456 20.8749C12.7289 21.0582 12.2123 21.0332 11.6956 20.7999C11.1789 20.5666 10.8289 20.1916 10.6456 19.6749L6.22061 7.44991C6.03728 6.93324 6.06228 6.42074 6.29561 5.91241C6.52894 5.40407 6.90394 5.05824 7.42061 4.87491L14.9456 2.12491C15.4623 1.94157 15.9748 1.96657 16.4831 2.19991C16.9914 2.43324 17.3373 2.80824 17.5206 3.32491L21.9706 15.5499C22.1539 16.0666 22.1289 16.5791 21.8956 17.0874C21.6623 17.5957 21.2873 17.9416 20.7706 18.1249L13.2456 20.8749Z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Casino</div>
                      <div className="text-sm text-gray-500">Slots & table games</div>
                    </div>
                  </button>

                  {/* Personalization */}
                  <button
                    onClick={() => setShowSportsLeagues(true)}
                    className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Personalization</div>
                      <div className="text-sm text-gray-500">Customize your feed</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Rewards */}
                  <Link href="/rewards" className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.7-2h8.6l.9-5.4L12 8.5 6.8 8.6L7.7 14z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Rewards</div>
                      <div className="text-sm text-gray-500">Rewards & points</div>
                    </div>
                  </Link>

                  {/* Line Break */}
                  <div className="my-6 border-t border-gray-200"></div>

                  {/* Deposit/Withdraw - Moved above Support */}
                  <button className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Deposit & Withdraw</div>
                      <div className="text-sm text-gray-500">Manage your funds</div>
                    </div>
                  </button>

                  {/* Support */}
                  <button className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Support</div>
                      <div className="text-sm text-gray-500">Help & contact</div>
                    </div>
                  </button>
                </>
              ) : showFavourites ? (
                <>
                  {/* Back Button */}
                  <button
                    onClick={() => setShowFavourites(false)}
                    className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left mb-3"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="font-semibold text-gray-900">My Favourites</div>
                  </button>

                  {/* Liked Reels */}
                  {likedReels.size === 0 ? (
                    <div className="text-center py-12 px-4">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <p className="text-gray-500 text-sm">No favourite reels yet</p>
                      <p className="text-gray-400 text-xs mt-1">Like reels to see them here</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {Array.from(likedReels).map(reelId => {
                        const reel = reels.find(r => r.id === reelId);
                        const reelNames: Record<string, string> = {
                          'salah-first-goal': 'Salah First Goal',
                          'chiefs-parlay': 'Chiefs Parlay',
                          'kelce-first-td': 'Kelce First TD',
                          'blackjack': 'Blackjack',
                          'rabid-randy-slot': 'Rabid Randy Slot',
                          'wheel-of-fortune': 'Wheel of Fortune',
                          'boxing-interest': 'Boxing Interest',
                          'live-soccer-game': 'Live: Arsenal vs Chelsea',
                          'monaco-f1': 'Monaco Grand Prix',
                          'masters-golf': 'Masters Tournament',
                          'kentucky-derby': 'Kentucky Derby'
                        };
                        
                        return (
                          <div key={reelId} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                            <button
                              onClick={() => {
                                setLikedReels(prev => {
                                  const newSet = new Set(prev);
                                  newSet.delete(reelId);
                                  return newSet;
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center hover:bg-pink-600 transition-colors flex-shrink-0"
                            >
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                const index = reels.findIndex(r => r.id === reelId);
                                if (index !== -1) {
                                  const swiperEl = document.querySelector('.swiper') as any;
                                  if (swiperEl?.swiper) {
                                    swiperEl.swiper.slideTo(index);
                                    setIsMenuDrawerOpen(false);
                                    setShowFavourites(false);
                                  }
                                }
                              }}
                              className="flex-1 flex items-center justify-between ml-3 text-left"
                            >
                              <div className="font-medium text-gray-900 text-sm">{reelNames[reelId] || reelId}</div>
                              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : showSportsLeagues ? (
                <>
                  {/* Back Button */}
                  <button
                    onClick={() => setShowSportsLeagues(false)}
                    className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left mb-3"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="font-semibold text-gray-900">Personalization</div>
                  </button>

                  {/* Search Bar */}
                  <div className="mb-4 px-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search teams..."
                        className="w-full px-4 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                      <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Sports Section */}
                  <div className="mb-10">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 mb-4">Sports</h3>
                    <div className="flex flex-wrap gap-2.5 px-2">
                      {[
                        { key: 'football', label: 'Football' },
                        { key: 'basketball', label: 'Basketball' },
                        { key: 'tennis', label: 'Tennis' },
                        { key: 'boxing', label: 'Boxing' },
                        { key: 'mma', label: 'MMA' }
                      ].map(sport => (
                        <button
                          key={sport.key}
                          onClick={() => setPreferences(prev => ({ ...prev, [sport.key]: !prev[sport.key as keyof typeof prev] }))}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            preferences[sport.key as keyof typeof preferences] 
                              ? 'bg-black text-white' 
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {sport.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Leagues Section */}
                  <div className="mb-10">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 mb-4">Leagues</h3>
                    <div className="flex flex-wrap gap-2.5 px-2">
                      {[
                        { key: 'premierLeague', label: 'Premier League' },
                        { key: 'nfl', label: 'NFL' },
                        { key: 'nba', label: 'NBA' },
                        { key: 'championsLeague', label: 'Champions League' },
                        { key: 'laLiga', label: 'La Liga' },
                        { key: 'ufc', label: 'UFC' }
                      ].map(league => (
                        <button
                          key={league.key}
                          onClick={() => setPreferences(prev => ({ ...prev, [league.key]: !prev[league.key as keyof typeof prev] }))}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            preferences[league.key as keyof typeof preferences] 
                              ? 'bg-black text-white' 
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {league.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Popular Teams Section */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 mb-4">Popular Teams</h3>
                    <div className="flex flex-wrap gap-2.5 px-2">
                      {['Liverpool', 'Man City', 'Real Madrid', 'Barcelona', 'Bayern Munich', 'PSG', 'Chiefs', 'Lakers', 'Warriors'].map(team => (
                        <button 
                          key={team}
                          onClick={() => {
                            setFavoriteTeams(prev => 
                              prev.includes(team) ? prev.filter(t => t !== team) : [...prev, team]
                            );
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            favoriteTeams.includes(team)
                              ? 'bg-black text-white'
                              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {team}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
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
                      <h3 className="text-base font-semibold text-gray-900">Flaame User</h3>
                    </div>
                    <p className="text-gray-500 text-xs">user@flaame.com</p>
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
                <button 
                  onClick={() => {
                    setIsBetSlipOpen(true);
                    setIsBalanceDrawerOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all border border-white/20 text-left"
                >
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

      {/* Casino Game Drawer */}
      {isCasinoGameOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsCasinoGameOpen(false)}
          ></div>
          <div className="absolute inset-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col">
            {/* Close Button - Top Right */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsCasinoGameOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Loading Content - Centered */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Game...</h2>
                <p className="text-gray-600">Preparing your casino experience</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Drawer */}
      {isSearchDrawerOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsSearchDrawerOpen(false)}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-2xl max-h-[80vh] overflow-hidden border-t border-white/20">
            {/* Handle */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Search</h2>
                <button
                  onClick={() => setIsSearchDrawerOpen(false)}
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
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search sports, teams, games..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-12 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Quick Filters */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">Sports</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                    Premier League
                  </button>
                  <button className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
                    NFL
                  </button>
                  <button className="bg-orange-100 text-orange-700 px-3 py-2 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors">
                    NBA
                  </button>
                  <button className="bg-purple-100 text-purple-700 px-3 py-2 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
                    Champions League
                  </button>
                  <button className="bg-red-100 text-red-700 px-3 py-2 rounded-full text-sm font-medium hover:bg-red-200 transition-colors">
                    Horse Racing
                  </button>
                  <button className="bg-teal-100 text-teal-700 px-3 py-2 rounded-full text-sm font-medium hover:bg-teal-200 transition-colors">
                    Golf
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                    Formula 1
                  </button>
                </div>
              </div>

              {/* Recommended Casino Games */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">Recommended Casino Games</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg font-bold">BJ</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Blackjack</div>
                      <div className="text-xs text-gray-500">Classic card game • 99.5% RTP</div>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg font-bold">FS</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Finn and the Swirly Spin</div>
                      <div className="text-xs text-gray-500">Adventure slot • 96.04% RTP</div>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg font-bold">RR</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Rabid Randy</div>
                      <div className="text-xs text-gray-500">Action slot • 96.2% RTP</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Drawer */}
      {isShareDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsShareDrawerOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div className="relative bg-white/95 backdrop-blur-xl rounded-t-2xl w-full max-w-md max-h-[60vh] overflow-hidden border-t border-white/20 flex flex-col">
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Header */}
            <div className="px-6 pb-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Share Reel</h2>
                <p className="text-sm text-gray-600 mt-1">Share this reel and earn rewards!</p>
              </div>
              {/* Close Button */}
              <button 
                onClick={() => setIsShareDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-4">
                {/* TikTok */}
                <button 
                  className="w-full flex items-center space-x-4 p-4 rounded-xl bg-black hover:bg-gray-800 transition-colors text-left"
                  onClick={() => {
                    // Handle TikTok share
                    setIsShareDrawerOpen(false);
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-black border-2 border-white flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">TikTok</div>
                    <div className="text-sm text-gray-300">50 XP for sharing</div>
                    <div className="text-xs text-gray-400">Bronze Loot Box per signup</div>
                    <div className="text-xs text-gray-500">+500 XP if they deposit</div>
                  </div>
                </button>

                {/* Instagram */}
                <button 
                  className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all text-left"
                  onClick={() => {
                    // Handle Instagram share
                    setIsShareDrawerOpen(false);
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Instagram</div>
                    <div className="text-sm text-white/80">50 XP for sharing</div>
                    <div className="text-xs text-white/60">Bronze Loot Box per signup</div>
                    <div className="text-xs text-white/50">+500 XP if they deposit</div>
                  </div>
                </button>

                {/* X (Twitter) */}
                <button 
                  className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gray-900 hover:bg-gray-800 transition-colors text-left"
                  onClick={() => {
                    // Handle X share
                    setIsShareDrawerOpen(false);
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">X (Twitter)</div>
                    <div className="text-sm text-gray-300">50 XP for sharing</div>
                    <div className="text-xs text-gray-400">Bronze Loot Box per signup</div>
                    <div className="text-xs text-gray-500">+500 XP if they deposit</div>
                  </div>
                </button>

                {/* Copy Link */}
                <button 
                  className="w-full flex items-center space-x-4 p-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors text-left"
                  onClick={() => {
                    // Handle copy link
                    navigator.clipboard.writeText(window.location.href);
                    setIsShareDrawerOpen(false);
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Copy Link</div>
                    <div className="text-sm text-white/80">25 XP for sharing</div>
                    <div className="text-xs text-white/60">Bronze Loot Box per signup</div>
                    <div className="text-xs text-white/50">+500 XP if they deposit</div>
                  </div>
                </button>
              </div>

              {/* Rewards Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="font-semibold text-purple-900">Affiliate Rewards</span>
                </div>
                <p className="text-sm text-purple-700">
                  Earn XP for sharing reels. Get bronze loot boxes when friends sign up. Bonus 500 XP if they make a deposit!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}