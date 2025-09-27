import { NextRequest, NextResponse } from 'next/server'

interface LiveOddsRequest {
  marketIds: string[]
}

interface LiveOddsResponse {
  market_id: string
  odds: number
  change: 'up' | 'down' | 'same'
  timestamp: number
}

// Mock odds generator for development
function generateMockOdds(currentOdds: number): number {
  const change = (Math.random() - 0.5) * 0.1 // ±5% change
  const newOdds = currentOdds * (1 + change)
  
  // Keep odds within reasonable bounds
  return Math.max(-1000, Math.min(1000, Math.round(newOdds)))
}

function getOddsChange(oldOdds: number, newOdds: number): 'up' | 'down' | 'same' {
  if (newOdds > oldOdds) return 'up'
  if (newOdds < oldOdds) return 'down'
  return 'same'
}

export async function POST(request: NextRequest) {
  try {
    const { marketIds }: LiveOddsRequest = await request.json()
    
    if (!marketIds || marketIds.length === 0) {
      return NextResponse.json(
        { error: 'No market IDs provided' },
        { status: 400 }
      )
    }
    
    // Mock live odds for development
    const updatedOdds: LiveOddsResponse[] = marketIds.map(marketId => {
      const baseOdds = Math.random() > 0.5 ? 150 : -120
      const newOdds = generateMockOdds(baseOdds)
      
      return {
        market_id: marketId,
        odds: newOdds,
        change: getOddsChange(baseOdds, newOdds),
        timestamp: Date.now()
      }
    })
    
    return NextResponse.json({
      data: updatedOdds,
      timestamp: Date.now()
    })
    
  } catch (error) {
    console.error('Live odds API error:', error)
    return NextResponse.json(
      { error: 'Failed to update live odds' },
      { status: 500 }
    )
  }
}
