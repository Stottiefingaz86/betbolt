export interface BetLeg {
  id: string
  bet_id: string
  team: string
  odds: number
  game: string
  type: 'pregame' | 'live' | 'casino'
}

export interface Boost {
  id: string
  kind: 'parlay_boost' | 'single_boost'
  value: number
  description: string
}



