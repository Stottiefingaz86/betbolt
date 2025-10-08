'use client'

import { useState } from 'react'
import { useBetSlipStore } from '@/lib/store/bet-slip'

interface BetSlip365Props {
  onClose: () => void
}

export function BetSlip365({ onClose }: BetSlip365Props) {
  const { 
    legs, 
    totalStake, 
    updateStake, 
    clearBetslip, 
    removeLeg
  } = useBetSlipStore()

  const [inputStake, setInputStake] = useState(totalStake.toString())

  const handleStakeChange = (value: string) => {
    setInputStake(value)
    const numValue = parseFloat(value) || 0
    // Update stake for all legs (assuming single bet for now)
    if (legs.length > 0) {
      updateStake(legs[0].id, numValue)
    }
  }

  const handleQuickStake = (amount: number) => {
    setInputStake(amount.toString())
    // Update stake for all legs
    legs.forEach(leg => {
      updateStake(leg.id, amount)
    })
  }

  const totalOdds = legs.length > 0 ? legs.reduce((acc, leg) => acc * leg.odds, 1) : 0
  const potentialReturn = totalStake * totalOdds
  const quickStakes = [5, 10, 25, 50, 100]

  return (
    <div className="bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Bet Slip</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {legs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No bets added yet</p>
            <p className="text-sm">Add bets from the reels to get started</p>
          </div>
        ) : (
          <>
            {/* Bet Legs */}
            <div className="space-y-3">
              {legs.map((leg) => (
                <div key={leg.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{leg.selection}</p>
                      <p className="text-sm text-gray-600">{leg.match}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-green-600">
                        {leg.odds > 0 ? `+${leg.odds}` : leg.odds}
                      </span>
                      <button
                        onClick={() => removeLeg(leg.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stake Input */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Stake Amount
              </label>
              <input
                type="number"
                value={inputStake}
                onChange={(e) => handleStakeChange(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {/* Quick Stake Buttons */}
              <div className="flex space-x-2">
                {quickStakes.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleQuickStake(amount)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span>Total Odds:</span>
                <span className="font-bold">
                  {totalOdds > 0 ? `+${totalOdds}` : totalOdds}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Potential Return:</span>
                <span className="font-bold text-green-600">
                  ${potentialReturn.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={clearBetslip}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                Place Bet
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}



