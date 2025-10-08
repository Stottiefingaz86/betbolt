'use client'

import { useState } from 'react'
import { useBetSlipStore } from '@/lib/store/bet-slip'

interface FeedItem {
  id: string
  type: 'pregame' | 'live' | 'casino'
  title: string
  description: string
  team1: string
  team2: string
  team1Odds: number
  team2Odds: number
  startTime?: string
  status?: string
  media_url?: string
  media_type?: 'image' | 'video'
}

interface ReelCardProps {
  reel: FeedItem
}

export function ReelCard({ reel }: ReelCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const { addLeg, legs } = useBetSlipStore()

  const handleAddToBetSlip = (team: string, odds: number) => {
    addLeg({
      id: `${reel.id}-${team}`,
      match: `${reel.team1} vs ${reel.team2}`,
      market: reel.type === 'pregame' ? 'Match Winner' : reel.type === 'live' ? 'Live Bet' : 'Casino',
      selection: team,
      odds,
      stake: 10
    })
  }

  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : `${odds}`
  }

  const getBettingTip = () => {
    const tips = [
      `💡 ${reel.team1} won the last meeting 24-17`,
      `💡 ${reel.team2} has won 3 of their last 5 games`,
      `💡 Weather conditions favor the over`,
      `💡 Home team advantage in this matchup`,
      `💡 Key player returning from injury`
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  const renderContent = () => {
    switch (reel.type) {
      case 'pregame':
        return (
          <div className="relative h-full w-full">
            {/* Background Image/Video */}
            {reel.media_type === 'video' && reel.media_url ? (
              <iframe
                src={reel.media_url}
                className="absolute inset-0 w-full h-full object-cover"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ pointerEvents: 'none' }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900" />
            )}

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6">
              {/* Top Section */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">{reel.title}</h1>
                  <p className="text-lg opacity-90 mb-4">{reel.description}</p>
                  
                  {/* Teams */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold">{reel.team1}</span>
                      <button
                        onClick={() => handleAddToBetSlip(reel.team1, reel.team1Odds)}
                        className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white font-bold hover:bg-white/30 transition-colors"
                      >
                        {formatOdds(reel.team1Odds)}
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold">{reel.team2}</span>
                      <button
                        onClick={() => handleAddToBetSlip(reel.team2, reel.team2Odds)}
                        className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white font-bold hover:bg-white/30 transition-colors"
                      >
                        {formatOdds(reel.team2Odds)}
                      </button>
                    </div>
                  </div>

                  {/* Betting Tip */}
                  <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                    <p className="text-sm text-white/90">{getBettingTip()}</p>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="text-white/70 text-sm">
                <p>Starts {reel.startTime}</p>
              </div>
            </div>
          </div>
        )

      case 'live':
        return (
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-orange-900" />
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="relative z-10 h-full flex flex-col justify-center p-6">
              <div className="text-white">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2" />
                  <span className="text-lg font-semibold">LIVE</span>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">{reel.title}</h1>
                <p className="text-lg opacity-90 mb-4">{reel.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">{reel.team1}</span>
                    <button
                      onClick={() => handleAddToBetSlip(reel.team1, reel.team1Odds)}
                      className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg px-4 py-2 text-white font-bold hover:bg-red-500/30 transition-colors"
                    >
                      {formatOdds(reel.team1Odds)}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">{reel.team2}</span>
                    <button
                      onClick={() => handleAddToBetSlip(reel.team2, reel.team2Odds)}
                      className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg px-4 py-2 text-white font-bold hover:bg-red-500/30 transition-colors"
                    >
                      {formatOdds(reel.team2Odds)}
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-red-500/10 backdrop-blur-sm rounded-lg">
                  <p className="text-sm text-white/90">{getBettingTip()}</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'casino':
        return (
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-900 to-red-900" />
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="relative z-10 h-full flex flex-col justify-center p-6">
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{reel.title}</h1>
                <p className="text-lg opacity-90 mb-4">{reel.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">{reel.team1}</span>
                    <button
                      onClick={() => handleAddToBetSlip(reel.team1, reel.team1Odds)}
                      className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg px-4 py-2 text-white font-bold hover:bg-yellow-500/30 transition-colors"
                    >
                      {formatOdds(reel.team1Odds)}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">{reel.team2}</span>
                    <button
                      onClick={() => handleAddToBetSlip(reel.team2, reel.team2Odds)}
                      className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg px-4 py-2 text-white font-bold hover:bg-yellow-500/30 transition-colors"
                    >
                      {formatOdds(reel.team2Odds)}
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-500/10 backdrop-blur-sm rounded-lg">
                  <p className="text-sm text-white/90">{getBettingTip()}</p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="h-full w-full">
      {renderContent()}
    </div>
  )
}



