'use client'

import { useState, useEffect, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'

interface LiveOddsUpdate {
  marketId: string
  odds: number
  timestamp: number
  change: 'up' | 'down' | 'same'
}

interface UseLiveOddsOptions {
  marketIds: string[]
  updateInterval?: number
  enabled?: boolean
}

export function useLiveOdds({ 
  marketIds, 
  updateInterval = 5000,
  enabled = true 
}: UseLiveOddsOptions) {
  const [oddsHistory, setOddsHistory] = useState<Record<string, LiveOddsUpdate[]>>({})
  const [lastUpdate, setLastUpdate] = useState<number>(0)
  
  const { data: liveOdds, isLoading } = useQuery({
    queryKey: ['live-odds', marketIds, lastUpdate],
    queryFn: async () => {
      if (!enabled || marketIds.length === 0) return null
      
      const response = await fetch('/api/live-odds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marketIds })
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch live odds')
      }
      
      return response.json()
    },
    enabled: enabled && marketIds.length > 0,
    refetchInterval: updateInterval,
    staleTime: 1000, // 1 second
  })
  
  // Update odds history when new data arrives
  useEffect(() => {
    if (liveOdds?.data) {
      const updates: LiveOddsUpdate[] = liveOdds.data.map((update: any) => ({
        marketId: update.market_id,
        odds: update.odds,
        timestamp: Date.now(),
        change: update.change || 'same'
      }))
      
      setOddsHistory(prev => {
        const newHistory = { ...prev }
        
        updates.forEach(update => {
          if (!newHistory[update.marketId]) {
            newHistory[update.marketId] = []
          }
          
          newHistory[update.marketId].push(update)
          
          // Keep only last 10 updates per market
          if (newHistory[update.marketId].length > 10) {
            newHistory[update.marketId] = newHistory[update.marketId].slice(-10)
          }
        })
        
        return newHistory
      })
      
      setLastUpdate(Date.now())
    }
  }, [liveOdds])
  
  const getCurrentOdds = useCallback((marketId: string) => {
    const history = oddsHistory[marketId]
    return history?.[history.length - 1]?.odds || null
  }, [oddsHistory])
  
  const getOddsChange = useCallback((marketId: string) => {
    const history = oddsHistory[marketId]
    if (!history || history.length < 2) return 'same'
    
    const current = history[history.length - 1]
    const previous = history[history.length - 2]
    
    if (current.odds > previous.odds) return 'up'
    if (current.odds < previous.odds) return 'down'
    return 'same'
  }, [oddsHistory])
  
  const getOddsTrend = useCallback((marketId: string) => {
    const history = oddsHistory[marketId]
    if (!history || history.length < 2) return []
    
    return history.map(update => update.odds)
  }, [oddsHistory])
  
  const hasRecentUpdate = useCallback((marketId: string, threshold = 10000) => {
    const history = oddsHistory[marketId]
    if (!history || history.length === 0) return false
    
    const lastUpdate = history[history.length - 1]
    return Date.now() - lastUpdate.timestamp < threshold
  }, [oddsHistory])
  
  return {
    liveOdds: liveOdds?.data || [],
    isLoading,
    oddsHistory,
    getCurrentOdds,
    getOddsChange,
    getOddsTrend,
    hasRecentUpdate,
    lastUpdate
  }
}



