"use client";
import Image from "next/image";

interface GlobalHeaderProps {
  isBalanceDrawerOpen: boolean;
  setIsBalanceDrawerOpen: (open: boolean) => void;
}

export default function GlobalHeader({ isBalanceDrawerOpen, setIsBalanceDrawerOpen }: GlobalHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo - Top Left */}
        <div className="flex items-center">
          <Image
            src="/flaame.png"
            alt="Flaame Logo"
            width={60}
            height={60}
          />
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
  );
}
