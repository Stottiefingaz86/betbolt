import { NextRequest, NextResponse } from 'next/server'

interface FeedQuery {
  mode?: 'all' | 'pregame' | 'live'
  cursor?: string
  limit?: number
}

interface FeedItem {
  id: string
  type: 'pregame' | 'live' | 'parlay' | 'casino' | 'influencer'
  ref_id?: string
  title: string
  subtitle: string
  media_url: string
  meta: any
  weight: number
  created_at: string
  index: number
  isVisible: boolean
}

interface AdminConfig {
  casino_weight: number
  max_consec_casino: number
}

async function getAdminConfig(): Promise<AdminConfig> {
  return { casino_weight: 20, max_consec_casino: 1 }
}

async function getReels(mode: string, limit: number): Promise<FeedItem[]> {
  // Mock data for development - More content for proper reels experience
  const mockReels: FeedItem[] = [
    {
      id: '1',
      type: 'pregame',
      ref_id: 'game1',
      title: 'Chiefs vs Bills',
      subtitle: 'NFL • Tomorrow 8:00 PM',
      media_url: 'https://images.unsplash.com/800x1200/?football',
      meta: {
        game: {
          id: 'game1',
          league: 'NFL',
          home: 'Chiefs',
          away: 'Bills',
          start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          status: 'pre',
          home_score: 0,
          away_score: 0
        },
        odds: -150,
        trend: 5
      },
      weight: 1,
      created_at: new Date().toISOString(),
      index: 0,
      isVisible: true
    },
    {
      id: '2',
      type: 'live',
      ref_id: 'game2',
      title: 'Lakers vs Warriors',
      subtitle: 'LIVE • NBA • 3rd Quarter',
      media_url: 'https://images.unsplash.com/800x1200/?basketball',
      meta: {
        game: {
          id: 'game2',
          league: 'NBA',
          home: 'Lakers',
          away: 'Warriors',
          start_time: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          status: 'live',
          home_score: 85,
          away_score: 78
        },
        odds: +120,
        trend: -3,
        live_clock: '8:45',
        live_period: '3rd Quarter'
      },
      weight: 3,
      created_at: new Date().toISOString(),
      index: 1,
      isVisible: true
    },
    {
      id: '3',
      type: 'casino',
      title: 'Crash Game',
      subtitle: 'Win up to $100 • Spin to boost your next bet',
      media_url: 'https://images.unsplash.com/800x1200/?casino',
      meta: {
        casino_type: 'crash',
        casino_reward: 100
      },
      weight: 1,
      created_at: new Date().toISOString(),
      index: 2,
      isVisible: true
    },
    {
      id: '4',
      type: 'pregame',
      ref_id: 'game3',
      title: 'Cowboys vs Eagles',
      subtitle: 'NFL • Sunday 4:25 PM',
      media_url: 'https://images.unsplash.com/800x1200/?football,stadium',
      meta: {
        game: {
          id: 'game3',
          league: 'NFL',
          home: 'Cowboys',
          away: 'Eagles',
          start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'pre',
          home_score: 0,
          away_score: 0
        },
        odds: +110,
        trend: 8
      },
      weight: 1,
      created_at: new Date().toISOString(),
      index: 3,
      isVisible: true
    },
    {
      id: '5',
      type: 'live',
      ref_id: 'game4',
      title: 'Heat vs Celtics',
      subtitle: 'LIVE • NBA • 4th Quarter',
      media_url: 'https://images.unsplash.com/800x1200/?basketball,arena',
      meta: {
        game: {
          id: 'game4',
          league: 'NBA',
          home: 'Heat',
          away: 'Celtics',
          start_time: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
          status: 'live',
          home_score: 92,
          away_score: 89
        },
        odds: -105,
        trend: 2,
        live_clock: '2:15',
        live_period: '4th Quarter'
      },
      weight: 3,
      created_at: new Date().toISOString(),
      index: 4,
      isVisible: true
    },
    {
      id: '6',
      type: 'casino',
      title: 'Roulette Wheel',
      subtitle: 'Win up to $250 • Spin the wheel of fortune',
      media_url: 'https://images.unsplash.com/800x1200/?casino,roulette',
      meta: {
        casino_type: 'roulette',
        casino_reward: 250
      },
      weight: 1,
      created_at: new Date().toISOString(),
      index: 5,
      isVisible: true
    },
    {
      id: '7',
      type: 'pregame',
      ref_id: 'game5',
      title: 'Yankees vs Red Sox',
      subtitle: 'MLB • Tomorrow 7:10 PM',
      media_url: 'https://youtube.com/shorts/vrgEvIuq50g?si=G0m5bmFlTshvEQFQ',
      meta: {
        game: {
          id: 'game5',
          league: 'MLB',
          home: 'Yankees',
          away: 'Red Sox',
          start_time: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
          status: 'pre',
          home_score: 0,
          away_score: 0
        },
        odds: -125,
        trend: -2
      },
      weight: 1,
      created_at: new Date().toISOString(),
      index: 6,
      isVisible: true
    },
    {
      id: '8',
      type: 'live',
      ref_id: 'game6',
      title: 'Avalanche vs Lightning',
      subtitle: 'LIVE • NHL • 2nd Period',
      media_url: 'https://images.unsplash.com/800x1200/?hockey',
      meta: {
        game: {
          id: 'game6',
          league: 'NHL',
          home: 'Avalanche',
          away: 'Lightning',
          start_time: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          status: 'live',
          home_score: 2,
          away_score: 1
        },
        odds: +140,
        trend: 6,
        live_clock: '12:30',
        live_period: '2nd Period'
      },
      weight: 3,
      created_at: new Date().toISOString(),
      index: 7,
      isVisible: true
    },
    {
      id: '9',
      type: 'casino',
      title: 'Loot Box',
      subtitle: 'Mystery rewards up to $500 • Open your fortune',
      media_url: 'https://images.unsplash.com/800x1200/?treasure,box',
      meta: {
        casino_type: 'loot',
        casino_reward: 500
      },
      weight: 1,
      created_at: new Date().toISOString(),
      index: 8,
      isVisible: true
    },
    {
      id: '10',
      type: 'pregame',
      ref_id: 'game7',
      title: 'Arsenal vs Chelsea',
      subtitle: 'Premier League • Saturday 12:30 PM',
      media_url: 'https://images.unsplash.com/800x1200/?soccer,stadium',
      meta: {
        game: {
          id: 'game7',
          league: 'Premier League',
          home: 'Arsenal',
          away: 'Chelsea',
          start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'pre',
          home_score: 0,
          away_score: 0
        },
        odds: +180,
        trend: 12
      },
      weight: 1,
      created_at: new Date().toISOString(),
      index: 9,
      isVisible: true
    }
  ]

  // Filter by mode
  let filteredReels = mockReels
  if (mode === 'pregame') {
    filteredReels = mockReels.filter(reel => reel.type === 'pregame')
  } else if (mode === 'live') {
    filteredReels = mockReels.filter(reel => reel.type === 'live')
  }

  return filteredReels.slice(0, limit)
}

function interleaveFeed(reels: FeedItem[], config: AdminConfig, mode: string = 'all'): FeedItem[] {
  const result: FeedItem[] = []
  const casinoReels: FeedItem[] = []
  const otherReels: FeedItem[] = []
  
  // Separate casino and non-casino reels
  reels.forEach(reel => {
    if (reel.type === 'casino') {
      casinoReels.push(reel)
    } else {
      otherReels.push(reel)
    }
  })
  
  // Sort other reels by weight and recency
  otherReels.sort((a, b) => {
    if (a.weight !== b.weight) {
      return b.weight - a.weight // Higher weight first
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
  
  let casinoCount = 0
  let consecutiveCasino = 0
  let otherIndex = 0
  let casinoIndex = 0
  
  // Ensure at least one live reel in first 5 items if any exist
  const liveReels = otherReels.filter(r => r.type === 'live')
  const hasLiveReels = liveReels.length > 0
  
  if (hasLiveReels) {
    // Add a live reel early
    const liveReel = liveReels[0]
    liveReel.index = result.length
    liveReel.isVisible = true
    result.push(liveReel)
    otherIndex++
  }
  
  // Ensure soonest-starting pre-game within top 10
  const pregameReels = otherReels.filter(r => r.type === 'pregame')
  if (pregameReels.length > 0) {
    // Sort pregame by start time
    pregameReels.sort((a, b) => {
      const aTime = new Date(a.meta?.game?.start_time || a.created_at).getTime()
      const bTime = new Date(b.meta?.game?.start_time || b.created_at).getTime()
      return aTime - bTime
    })
    
    // Add soonest pregame if not already added
    if (result.length < 10) {
      const soonestPregame = pregameReels[0]
      soonestPregame.index = result.length
      soonestPregame.isVisible = true
      result.push(soonestPregame)
      otherIndex++
    }
  }
  
  // Main interleaving logic
  while (result.length < reels.length && (otherIndex < otherReels.length || casinoIndex < casinoReels.length)) {
    const shouldAddCasino = 
      casinoIndex < casinoReels.length &&
      consecutiveCasino < config.max_consec_casino &&
      Math.random() * 100 < config.casino_weight
    
    if (shouldAddCasino && casinoIndex < casinoReels.length) {
      const casinoReel = casinoReels[casinoIndex]
      casinoReel.index = result.length
      casinoReel.isVisible = true
      result.push(casinoReel)
      casinoIndex++
      consecutiveCasino++
      casinoCount++
    } else if (otherIndex < otherReels.length) {
      const otherReel = otherReels[otherIndex]
      otherReel.index = result.length
      otherReel.isVisible = true
      result.push(otherReel)
      otherIndex++
      consecutiveCasino = 0 // Reset consecutive casino count
    } else {
      // Add remaining casino reels if no other reels left
      if (casinoIndex < casinoReels.length) {
        const casinoReel = casinoReels[casinoIndex]
        casinoReel.index = result.length
        casinoReel.isVisible = true
        result.push(casinoReel)
        casinoIndex++
        consecutiveCasino++
      }
    }
  }
  
  return result
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'all'
    const cursor = searchParams.get('cursor')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    // Validate mode
    if (!['all', 'pregame', 'live'].includes(mode)) {
      return NextResponse.json(
        { error: 'Invalid mode. Must be all, pregame, or live' },
        { status: 400 }
      )
    }
    
    // Get admin configuration
    const config = await getAdminConfig()
    
    // Get reels from database
    const reels = await getReels(mode, limit)
    
    // For now, just return the reels directly without complex interleaving
    const interleavedFeed = reels
    
    // Apply cursor-based pagination
    let startIndex = 0
    if (cursor) {
      const cursorIndex = interleavedFeed.findIndex(item => item.id === cursor)
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1
      }
    }
    
    const paginatedFeed = interleavedFeed.slice(startIndex, startIndex + limit)
    
    // Get next cursor
    const nextCursor = paginatedFeed.length === limit 
      ? interleavedFeed[startIndex + limit]?.id 
      : null
    
    return NextResponse.json({
      data: paginatedFeed,
      nextCursor,
      hasMore: !!nextCursor,
      total: interleavedFeed.length
    })
    
  } catch (error) {
    console.error('Feed API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feed' },
      { status: 500 }
    )
  }
}
