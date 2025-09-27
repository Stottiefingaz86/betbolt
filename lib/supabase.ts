import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          username: string
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          avatar_url?: string | null
          created_at?: string
        }
      }
      games: {
        Row: {
          id: string
          league: string
          home: string
          away: string
          start_time: string
          status: 'pre' | 'live' | 'final'
          period: string | null
          clock: string | null
          home_score: number | null
          away_score: number | null
        }
        Insert: {
          id?: string
          league: string
          home: string
          away: string
          start_time: string
          status?: 'pre' | 'live' | 'final'
          period?: string | null
          clock?: string | null
          home_score?: number | null
          away_score?: number | null
        }
        Update: {
          id?: string
          league?: string
          home?: string
          away?: string
          start_time?: string
          status?: 'pre' | 'live' | 'final'
          period?: string | null
          clock?: string | null
          home_score?: number | null
          away_score?: number | null
        }
      }
      markets: {
        Row: {
          id: string
          game_id: string
          type: 'moneyline' | 'spread' | 'total' | 'prop' | 'future'
          label: string
          is_live: boolean
          line: number | null
          odds_json: Record<string, number>
          updated_at: string
        }
        Insert: {
          id?: string
          game_id: string
          type: 'moneyline' | 'spread' | 'total' | 'prop' | 'future'
          label: string
          is_live?: boolean
          line?: number | null
          odds_json: Record<string, number>
          updated_at?: string
        }
        Update: {
          id?: string
          game_id?: string
          type?: 'moneyline' | 'spread' | 'total' | 'prop' | 'future'
          label?: string
          is_live?: boolean
          line?: number | null
          odds_json?: Record<string, number>
          updated_at?: string
        }
      }
      reels: {
        Row: {
          id: string
          type: 'pregame' | 'live' | 'parlay' | 'casino' | 'influencer'
          ref_id: string | null
          title: string
          subtitle: string
          media_url: string
          meta: Record<string, any>
          weight: number
          created_at: string
        }
        Insert: {
          id?: string
          type: 'pregame' | 'live' | 'parlay' | 'casino' | 'influencer'
          ref_id?: string | null
          title: string
          subtitle: string
          media_url: string
          meta: Record<string, any>
          weight?: number
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'pregame' | 'live' | 'parlay' | 'casino' | 'influencer'
          ref_id?: string | null
          title?: string
          subtitle?: string
          media_url?: string
          meta?: Record<string, any>
          weight?: number
          created_at?: string
        }
      }
      bets: {
        Row: {
          id: string
          user_id: string
          stake: number
          potential_return: number
          status: 'open' | 'won' | 'lost' | 'void'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stake: number
          potential_return: number
          status?: 'open' | 'won' | 'lost' | 'void'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stake?: number
          potential_return?: number
          status?: 'open' | 'won' | 'lost' | 'void'
          created_at?: string
        }
      }
      bet_legs: {
        Row: {
          id: string
          bet_id: string
          market_id: string
          selection: string
          odds: number
          result: 'win' | 'loss' | 'void' | null
        }
        Insert: {
          id?: string
          bet_id: string
          market_id: string
          selection: string
          odds: number
          result?: 'win' | 'loss' | 'void' | null
        }
        Update: {
          id?: string
          bet_id?: string
          market_id?: string
          selection?: string
          odds?: number
          result?: 'win' | 'loss' | 'void' | null
        }
      }
      interactions: {
        Row: {
          id: string
          user_id: string
          reel_id: string
          type: 'like' | 'comment' | 'share' | 'save'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          reel_id: string
          type: 'like' | 'comment' | 'share' | 'save'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          reel_id?: string
          type?: 'like' | 'comment' | 'share' | 'save'
          created_at?: string
        }
      }
      boosts: {
        Row: {
          id: string
          user_id: string
          kind: 'parlay_boost' | 'live_insurance' | 'casino_bonus'
          value: number
          expires_at: string
        }
        Insert: {
          id?: string
          user_id: string
          kind: 'parlay_boost' | 'live_insurance' | 'casino_bonus'
          value: number
          expires_at: string
        }
        Update: {
          id?: string
          user_id?: string
          kind?: 'parlay_boost' | 'live_insurance' | 'casino_bonus'
          value?: number
          expires_at?: string
        }
      }
      rg_limits: {
        Row: {
          user_id: string
          daily_stake_limit: number
          session_timeout_mins: number
          self_excluded: boolean
        }
        Insert: {
          user_id: string
          daily_stake_limit: number
          session_timeout_mins: number
          self_excluded?: boolean
        }
        Update: {
          user_id?: string
          daily_stake_limit?: number
          session_timeout_mins?: number
          self_excluded?: boolean
        }
      }
      admin_config: {
        Row: {
          id: number
          casino_weight: number
          max_consec_casino: number
        }
        Insert: {
          id?: number
          casino_weight?: number
          max_consec_casino?: number
        }
        Update: {
          id?: number
          casino_weight?: number
          max_consec_casino?: number
        }
      }
    }
  }
}
