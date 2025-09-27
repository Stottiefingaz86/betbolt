'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Users, TrendingUp } from 'lucide-react'
import { useBetSlipStore } from '@/lib/store/bet-slip'
import { formatOdds } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export default function GamePage() {
  const params = useParams()
  const gameId = params.id as string
  const { addLeg } = useBetSlipStore()
  
  // Mock game data - in real app, this would come from API
  const game = {
    id: gameId,
    league: 'NFL',
    home: 'Chiefs',
    away: 'Bills',
    start_time: '2024-01-15T20:00:00Z',
    status: 'pre' as const,
    home_score: 0,
    away_score: 0
  }
  
  const markets = [
    {
      id: '1',
      type: 'moneyline' as const,
      label: 'Moneyline',
      odds_json: {
        'Chiefs': -150,
        'Bills': +130
      }
    },
    {
      id: '2',
      type: 'spread' as const,
      label: 'Spread',
      line: -3.5,
      odds_json: {
        'Chiefs -3.5': -110,
        'Bills +3.5': -110
      }
    },
    {
      id: '3',
      type: 'total' as const,
      label: 'Total Points',
      line: 52.5,
      odds_json: {
        'Over 52.5': -110,
        'Under 52.5': -110
      }
    }
  ]
  
  const handleAddToBetSlip = (marketId: string, selection: string, odds: number) => {
    addLeg({
      id: `${game.id}-${marketId}-${selection}`,
      match: `${game.away} vs ${game.home}`,
      market: marketId,
      selection,
      odds,
      stake: 0
    })
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-white/10 p-4">
        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-white/10"
          >
            <ArrowLeft size={20} />
          </motion.button>
          
          <div>
            <h1 className="text-xl font-bold">
              {game.home} vs {game.away}
            </h1>
            <p className="text-white/70 text-sm">
              {game.league} • {new Date(game.start_time).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      
      {/* Game Info */}
      <div className="p-6 space-y-6">
        {/* Game Status */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Clock size={20} className="text-blue-400" />
              <span className="text-white/70">Game Status</span>
            </div>
            <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
              {game.status === 'pre' ? 'Pre-Game' : 'Live'}
            </span>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {game.home_score} - {game.away_score}
            </div>
            <div className="text-white/70">
              {game.home} vs {game.away}
            </div>
          </div>
        </div>
        
        {/* Markets */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Betting Markets</h2>
          
          {markets.map((market) => (
            <motion.div
              key={market.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">{market.label}</h3>
              
              <div className="space-y-3">
                {Object.entries(market.odds_json).map(([selection, odds]) => (
                  <motion.button
                    key={selection}
                    onClick={() => handleAddToBetSlip(market.id, selection, odds)}
                    className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">
                        {selection}
                      </span>
                      <span className="text-green-400 font-bold text-lg">
                        {formatOdds(odds)}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="secondary"
              className="w-full py-4"
            >
              <Users size={20} className="mr-2" />
              Same Game Parlay
            </Button>
            
            <Button
              variant="secondary"
              className="w-full py-4"
            >
              <TrendingUp size={20} className="mr-2" />
              Live Stats
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}



