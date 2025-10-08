"use client";

import { useState } from "react";
import { Target, Clock, Star, Gift, Zap, Trophy } from "lucide-react";

interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLeft: string;
  reward: string;
  rewardType: 'xp' | 'cash' | 'mixed' | 'lootbox';
  progress: number;
  maxProgress: number;
  category: string;
}

interface MissionReelProps {
  mission: Mission;
  onComplete?: () => void;
  onClaim?: () => void;
}

export default function MissionReel({ mission, onComplete, onClaim }: MissionReelProps) {
  const [isClaiming, setIsClaiming] = useState(false);
  
  const progressPercentage = (mission.progress / mission.maxProgress) * 100;
  const isCompleted = mission.progress >= mission.maxProgress;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-white';
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'xp': return <Star className="w-5 h-5 text-yellow-400" />;
      case 'cash': return <Gift className="w-5 h-5 text-green-400" />;
      case 'lootbox': return <Gift className="w-5 h-5 text-purple-400" />;
      case 'mixed': return <Trophy className="w-5 h-5 text-orange-400" />;
      default: return <Star className="w-5 h-5 text-yellow-400" />;
    }
  };

  const handleClaim = async () => {
    setIsClaiming(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsClaiming(false);
    onClaim?.();
  };

  return (
    <div className="relative h-app w-full">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400/60 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/6 right-1/4 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col justify-between p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Mission Progress</h1>
              <p className="text-white/70 text-sm">Keep going to unlock rewards!</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-1 text-white/70 text-sm mb-1">
              <Clock className="w-4 h-4" />
              <span>{mission.timeLeft}</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              mission.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
              mission.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {mission.difficulty}
            </div>
          </div>
        </div>

        {/* Mission Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-2xl font-bold text-white">{mission.title}</h2>
            <span className="text-white/70 text-sm">• {mission.category}</span>
          </div>
          
          <p className="text-white/80 mb-6 leading-relaxed">{mission.description}</p>
          
          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Progress</span>
              <span className="text-white font-semibold">{mission.progress}/{mission.maxProgress}</span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-white/10 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="text-center mt-2">
                <span className="text-white/70 text-sm">{Math.round(progressPercentage)}% Complete</span>
              </div>
            </div>
          </div>

          {/* Reward Section */}
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getRewardIcon(mission.rewardType)}
                <div>
                  <p className="text-white/70 text-sm">Reward</p>
                  <p className="text-white font-semibold">{mission.reward}</p>
                </div>
              </div>
              
              {isCompleted && (
                <button
                  onClick={handleClaim}
                  disabled={isClaiming}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 px-6 py-2 rounded-lg text-white font-semibold transition-all duration-200 flex items-center space-x-2"
                >
                  {isClaiming ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Claiming...</span>
                    </>
                  ) : (
                    <>
                      <Gift className="w-4 h-4" />
                      <span>Claim Reward</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {!isCompleted && (
            <div className="flex space-x-3">
              <button 
                onClick={onComplete}
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-3 text-white font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Continue Mission</span>
              </button>
              <button className="px-4 py-3 text-white/70 hover:text-white transition-colors">
                Details
              </button>
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <div className="text-center">
          <p className="text-white/60 text-sm">
            {isCompleted 
              ? "🎉 Mission completed! Claim your reward above." 
              : `Keep playing to complete this mission and earn ${mission.reward}!`
            }
          </p>
        </div>
      </div>

      {/* Side Menu - Instagram Reels Style */}
      <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center space-y-6">
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

        {/* Share */}
        <div className="flex flex-col items-center space-y-2">
          <button className="relative">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>Share</span>
          </button>
        </div>

        {/* More Missions */}
        <div className="flex flex-col items-center space-y-2">
          <button className="relative">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-white text-xs font-medium mt-2" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>More</span>
          </button>
        </div>
      </div>
    </div>
  );
}
