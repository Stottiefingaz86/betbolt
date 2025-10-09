"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Search, Play, Star, TrendingUp, Crown, Zap, Dice6, Trophy, Gift } from "lucide-react";

export default function CasinoPage() {
  const [likedGames, setLikedGames] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('for-you');
  const [isSubNavSticky, setIsSubNavSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isBalanceDrawerOpen, setIsBalanceDrawerOpen] = useState(false);

  useEffect(() => {
    // Force override body styles for casino page - must be visible and scrollable
    const html = document.documentElement;
    const body = document.body;
    
    // Store original styles
    const originalBodyOverflow = body.style.overflow;
    const originalBodyPosition = body.style.position;
    const originalBodyHeight = body.style.height;
    const originalHtmlOverflow = html.style.overflow;
    
    // Force scrollable state - use setProperty with important flag
    body.style.setProperty('overflow', 'auto', 'important');
    body.style.setProperty('position', 'static', 'important');
    body.style.setProperty('height', 'auto', 'important');
    html.style.setProperty('overflow', 'auto', 'important');
    
    // Also remove any classes that might prevent scrolling
    body.classList.remove('overflow-hidden');
    html.classList.remove('overflow-hidden');
    
    // Scroll listener to detect when sub-nav touches header
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Hide logo and balance when scrolling down (around 80px scroll)
      if (scrollY > 80) {
        setIsSubNavSticky(true);
      } else {
        setIsSubNavSticky(false);
      }
      
      setLastScrollY(scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup on unmount
    return () => {
      body.style.overflow = originalBodyOverflow;
      body.style.position = originalBodyPosition;
      body.style.height = originalBodyHeight;
      html.style.overflow = originalHtmlOverflow;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleLike = (gameId: string) => {
    setLikedGames(prev => {
      const newSet = new Set(prev);
      if (newSet.has(gameId)) {
        newSet.delete(gameId);
      } else {
        newSet.add(gameId);
      }
      return newSet;
    });
  };

  const ModuleTile = () => {
    return (
      <div className="relative flex-shrink-0 w-72 h-36 rounded-lg overflow-hidden cursor-pointer group shadow-lg">
        {/* Module Image (2x width) */}
        <img
          src="/Tile_module.png"
          alt="Live Roulette"
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Play Button Overlay on Hover */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2">
            <Play size={16} />
            <span>Play</span>
          </button>
        </div>
      </div>
    );
  };

  const GameTile = ({ game, isLiked, onLikeToggle, index }: any) => {
    // Cycle through the 6 tiles
    const tileNumber = (index % 6) + 1;
    const tileImage = `/Tile${tileNumber}.png`;
    
    return (
      <div className="relative flex-shrink-0 w-36 h-36 rounded-lg overflow-hidden cursor-pointer group shadow-lg">
        {/* Tile Image */}
        <img
          src={tileImage}
          alt={game.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Play Button Overlay on Hover */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2">
            <Play size={16} />
            <span>Play</span>
          </button>
        </div>
      </div>
    );
  };

  const subNavItems = [
    { id: 'for-you', label: 'For You', icon: TrendingUp },
    { id: 'slots', label: 'Slots', icon: Zap },
    { id: 'live', label: 'Live', icon: Play },
    { id: 'bonus', label: 'Bonus', icon: Trophy },
    { id: 'jackpots', label: 'Jackpots', icon: Crown },
    { id: 'table', label: 'Table', icon: Dice6 },
    { id: 'originals', label: 'Originals', icon: Crown },
  ];

  const casinoGames = {
    'for-you': [
      { id: 'megacrush', title: 'MEGACRUSH', provider: 'BETSOFT', label: 'HOT', labelBg: 'bg-red-500', rtp: '96.5' },
      { id: 'mrmammoth', title: 'MR MAMMOTH', provider: 'BETSOFT', label: 'NEW', labelBg: 'bg-green-500', rtp: '96.2' },
      { id: 'live-roulette', title: 'LIVE ROULETTE', provider: 'Evolution', label: 'LIVE', labelBg: 'bg-blue-500', rtp: '97.3' },
      { id: 'gold-nugget', title: 'GOLD NUGGET RUSH', provider: 'BETSOFT', label: 'JACKPOT', labelBg: 'bg-yellow-500', rtp: '96.8' },
      { id: 'exclusive-slot', title: 'EXCLUSIVE SLOT', provider: 'Flaame', label: 'EXCLUSIVE', labelBg: 'bg-purple-500', rtp: '97.1' },
      { id: 'starburst', title: 'STARBURST', provider: 'NetEnt', label: 'CLASSIC', labelBg: 'bg-gray-500', rtp: '96.1' },
    ],
    'slots': [
      { id: 'starburst', title: 'STARBURST', provider: 'NetEnt', label: 'CLASSIC', labelBg: 'bg-gray-500', rtp: '96.1' },
      { id: 'book-of-dead', title: 'BOOK OF DEAD', provider: 'Play\'n GO', label: 'HOT', labelBg: 'bg-red-500', rtp: '96.2' },
      { id: 'mega-moolah', title: 'MEGA MOOLAH', provider: 'Microgaming', label: 'JACKPOT', labelBg: 'bg-blue-500', rtp: '88.1' },
      { id: 'gonzos-quest', title: 'GONZO\'S QUEST', provider: 'NetEnt', label: 'ADVENTURE', labelBg: 'bg-orange-500', rtp: '96.0' },
      { id: 'reactoonz', title: 'REACTOONZ', provider: 'Play\'n GO', label: 'NEW', labelBg: 'bg-green-500', rtp: '96.5' },
      { id: 'sweet-bonanza', title: 'SWEET BONANZA', provider: 'Pragmatic Play', label: 'HOT', labelBg: 'bg-red-500', rtp: '96.5' },
    ],
    'bonus': [
      { id: 'bonus-buy', title: 'BONUS BUY', provider: 'Pragmatic Play', label: 'BONUS', labelBg: 'bg-yellow-500', rtp: '96.5' },
      { id: 'free-spins', title: 'FREE SPINS', provider: 'NetEnt', label: 'BONUS', labelBg: 'bg-yellow-500', rtp: '96.2' },
      { id: 'pick-bonus', title: 'PICK BONUS', provider: 'Microgaming', label: 'BONUS', labelBg: 'bg-yellow-500', rtp: '96.8' },
      { id: 'wheel-bonus', title: 'WHEEL BONUS', provider: 'Play\'n GO', label: 'BONUS', labelBg: 'bg-yellow-500', rtp: '96.3' },
    ],
    'table': [
      { id: 'live-blackjack', title: 'LIVE BLACKJACK', provider: 'Evolution', label: 'LIVE', labelBg: 'bg-blue-500', rtp: '99.5' },
      { id: 'live-baccarat', title: 'LIVE BACCARAT', provider: 'Evolution', label: 'LIVE', labelBg: 'bg-blue-500', rtp: '98.9' },
      { id: 'live-roulette', title: 'LIVE ROULETTE', provider: 'Evolution', label: 'LIVE', labelBg: 'bg-blue-500', rtp: '97.3' },
      { id: 'live-poker', title: 'LIVE POKER', provider: 'Evolution', label: 'LIVE', labelBg: 'bg-blue-500', rtp: '99.1' },
      { id: 'blackjack', title: 'BLACKJACK', provider: 'Flaame', label: 'CLASSIC', labelBg: 'bg-gray-500', rtp: '99.6' },
      { id: 'roulette', title: 'ROULETTE', provider: 'Flaame', label: 'CLASSIC', labelBg: 'bg-gray-500', rtp: '97.3' },
    ],
    'live': [
      { id: 'live-blackjack', title: 'LIVE BLACKJACK', provider: 'Evolution', label: 'LIVE', labelBg: 'bg-blue-500', rtp: '99.5' },
      { id: 'live-baccarat', title: 'LIVE BACCARAT', provider: 'Evolution', label: 'LIVE', labelBg: 'bg-blue-500', rtp: '98.9' },
      { id: 'live-roulette', title: 'LIVE ROULETTE', provider: 'Evolution', label: 'LIVE', labelBg: 'bg-blue-500', rtp: '97.3' },
      { id: 'live-poker', title: 'LIVE POKER', provider: 'Evolution', label: 'LIVE', labelBg: 'bg-blue-500', rtp: '99.1' },
      { id: 'live-game-show', title: 'LIVE GAME SHOW', provider: 'Evolution', label: 'LIVE', labelBg: 'bg-blue-500', rtp: '96.8' },
      { id: 'live-crazy-time', title: 'CRAZY TIME', provider: 'Evolution', label: 'LIVE', labelBg: 'bg-blue-500', rtp: '96.1' },
    ],
    'jackpots': [
      { id: 'mega-moolah', title: 'MEGA MOOLAH', provider: 'Microgaming', label: 'JACKPOT', labelBg: 'bg-yellow-500', rtp: '88.1' },
      { id: 'divine-fortune', title: 'DIVINE FORTUNE', provider: 'NetEnt', label: 'JACKPOT', labelBg: 'bg-yellow-500', rtp: '96.6' },
      { id: 'hall-of-gods', title: 'HALL OF GODS', provider: 'NetEnt', label: 'JACKPOT', labelBg: 'bg-yellow-500', rtp: '96.1' },
      { id: 'age-of-gods', title: 'AGE OF GODS', provider: 'Play\'n GO', label: 'JACKPOT', labelBg: 'bg-yellow-500', rtp: '96.2' },
      { id: 'jackpot-giant', title: 'JACKPOT GIANT', provider: 'Play\'n GO', label: 'JACKPOT', labelBg: 'bg-yellow-500', rtp: '96.0' },
    ],
    'originals': [
      { id: 'betbolt-blackjack', title: 'FLAAME BLACKJACK', provider: 'Flaame Originals', label: 'EXCLUSIVE', labelBg: 'bg-purple-500', rtp: '99.6' },
      { id: 'betbolt-roulette', title: 'FLAAME ROULETTE', provider: 'Flaame Originals', label: 'EXCLUSIVE', labelBg: 'bg-purple-500', rtp: '97.3' },
      { id: 'betbolt-slots', title: 'FLAAME SLOTS', provider: 'Flaame Originals', label: 'NEW', labelBg: 'bg-yellow-500', rtp: '96.8' },
      { id: 'betbolt-bingo', title: 'FLAAME BINGO', provider: 'Flaame Originals', label: 'EXCLUSIVE', labelBg: 'bg-purple-500', rtp: '95.5' },
      { id: 'betbolt-crash', title: 'FLAAME CRASH', provider: 'Flaame Originals', label: 'EXCLUSIVE', labelBg: 'bg-purple-500', rtp: '97.0' },
    ],
  };

  const currentGames = casinoGames[activeTab as keyof typeof casinoGames] || [];

  // Add CSS override in useEffect
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      html, body {
        overflow: auto !important;
        height: auto !important;
        position: static !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div 
        className="casino-page bg-gradient-to-br from-purple-900/30 via-black to-purple-800/20 text-white min-h-screen"
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
      {/* Header - Logo and Balance */}
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
                alt="Flaame Logo"
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

      {/* Sub Navigation */}
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
      <div className="px-2 pb-20">
        <div className="space-y-8 pb-32">
          {/* Featured Games Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">Featured Games</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              <ModuleTile />
              {casinoGames['for-you'].map((game, index) => (
                <GameTile
                  key={game.id}
                  game={game}
                  index={index}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* Slots Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">Slots</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['slots'].map((game, index) => (
                <GameTile
                  key={game.id}
                  game={game}
                  index={index}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* Live Casino Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">Live Casino</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['live'].map((game, index) => (
                <GameTile
                  key={game.id}
                  game={game}
                  index={index}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* Bonus Games Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">Bonus Games</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['bonus'].map((game, index) => (
                <GameTile
                  key={game.id}
                  game={game}
                  index={index}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* Jackpots Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">Jackpots</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['jackpots'].map((game, index) => (
                <GameTile
                  key={game.id}
                  game={game}
                  index={index}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* Table Games Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">Table Games</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['table'].map((game, index) => (
                <GameTile
                  key={game.id}
                  game={game}
                  index={index}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* Originals Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">Flaame Originals</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['originals'].map((game, index) => (
                <GameTile
                  key={game.id}
                  game={game}
                  index={index}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* Popular Games Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">Popular Games</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['for-you'].slice(0, 8).map((game, index) => (
                <GameTile
                  key={`popular-${game.id}`}
                  game={game}
                  index={index + 10}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* New Releases Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">New Releases</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['slots'].slice(0, 6).map((game, index) => (
                <GameTile
                  key={`new-${game.id}`}
                  game={game}
                  index={index + 20}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* High RTP Games Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">High RTP Games</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['table'].map((game, index) => (
                <GameTile
                  key={`high-rtp-${game.id}`}
                  game={game}
                  index={index + 30}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* Trending Now Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">Trending Now</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['bonus'].slice(0, 5).map((game, index) => (
                <GameTile
                  key={`trending-${game.id}`}
                  game={game}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* Live Dealers Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">Live Dealers</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['live'].slice(0, 4).map((game, index) => (
                <GameTile
                  key={`live-${game.id}`}
                  game={game}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* Progressive Jackpots Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">Progressive Jackpots</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['jackpots'].map((game, index) => (
                <GameTile
                  key={`progressive-${game.id}`}
                  game={game}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* Classic Games Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">Classic Games</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['slots'].slice(2, 8).map((game, index) => (
                <GameTile
                  key={`classic-${game.id}`}
                  game={game}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* VIP Games Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">VIP Games</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['originals'].map((game, index) => (
                <GameTile
                  key={`vip-${game.id}`}
                  game={game}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>

          {/* Mobile Games Carousel */}
          <div>
            <h2 className="text-lg font-black mb-4 text-white">Mobile Optimized</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {casinoGames['for-you'].slice(2, 7).map((game, index) => (
                <GameTile
                  key={`mobile-${game.id}`}
                  game={game}
                  isLiked={likedGames.has(game.id)}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glass Module */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-full px-4 py-3 flex items-center space-x-6">
          {/* Search Icon */}
          <button className="p-2 hover:bg-white/10 transition-all duration-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>

          {/* Heart Icon */}
          <button className="p-2 hover:bg-white/10 transition-all duration-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>

          {/* Rewards Icon */}
          <Link href="/rewards" className="p-2 hover:bg-white/10 transition-all duration-200 rounded-full">
            <Gift className="w-5 h-5 text-white" />
          </Link>

          {/* Back to Top Icon */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 hover:bg-white/10 transition-all duration-200 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

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