import { BetLeg } from './types'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function calculateParlayOdds(legs: BetLeg[]): number {
  if (legs.length === 0) return 0
  if (legs.length === 1) return legs[0].odds
  
  // Convert American odds to decimal, multiply, then convert back
  const decimalOdds = legs.map(leg => {
    if (leg.odds > 0) {
      return (leg.odds / 100) + 1
    } else {
      return (100 / Math.abs(leg.odds)) + 1
    }
  })
  
  const totalDecimal = decimalOdds.reduce((acc, odds) => acc * odds, 1)
  
  // Convert back to American odds
  if (totalDecimal >= 2) {
    return Math.round((totalDecimal - 1) * 100)
  } else {
    return Math.round(-100 / (totalDecimal - 1))
  }
}

export function calculatePayout(stake: number, odds: number): number {
  if (odds > 0) {
    return stake * (odds / 100) + stake
  } else {
    return stake * (100 / Math.abs(odds)) + stake
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatOdds(odds: number): string {
  if (odds > 0) {
    return `+${odds}`
  } else {
    return odds.toString()
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}



