'use client'

import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'

import { useBetSlipStore } from '@/lib/store/bet-slip'
import { BetSlip365 } from '@/components/betslip/BetSlip365'
import { ReelCard } from './ReelCard'

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

interface SwiperReelFeedProps {
  reels: FeedItem[]
}

export function SwiperReelFeed({ reels }: SwiperReelFeedProps) {
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const { legs } = useBetSlipStore()

  const handleSwiperChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.activeIndex)
  }

  if (!reels || reels.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p>No reels available</p>
      </div>
    )
  }

  return (
    <div className="relative h-screen bg-black">
      {/* Sports Navigation - Instagram Stories Style */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-4 px-4">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {['NFL', 'NBA', 'MLB', 'NHL', 'Soccer', 'Tennis'].map((sport) => (
            <div
              key={sport}
              className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium"
            >
              {sport}
            </div>
          ))}
        </div>
      </div>

      {/* Vertical Navigation */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-4">
        <button
          onClick={() => setIsBetSlipOpen(true)}
          className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-white"
        >
          <div className="flex flex-col items-center space-y-1">
            <div className="relative">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              {legs.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {legs.length}
                </span>
              )}
            </div>
            <span className="text-xs">Betslip</span>
          </div>
        </button>

        <button className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-white">
          <div className="flex flex-col items-center space-y-1">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">Like</span>
          </div>
        </button>

        <button className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-white">
          <div className="flex flex-col items-center space-y-1">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" />
            </svg>
            <span className="text-xs">Share</span>
          </div>
        </button>

        <button className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-white">
          <div className="flex flex-col items-center space-y-1">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <span className="text-xs leading-tight">My<br/>History</span>
          </div>
        </button>
      </div>

      {/* Swiper Container */}
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
          thresholdDelta: 20,
          thresholdTime: 150
        }}
        freeMode={false}
        modules={[FreeMode, Mousewheel]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={handleSwiperChange}
        className="h-full"
        style={{ height: '100vh' }}
      >
        {reels.map((reel, index) => (
          <SwiperSlide key={reel.id}>
            <div className="h-full w-full">
              <ReelCard reel={reel} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bet Slip Modal */}
      {isBetSlipOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
            <BetSlip365 onClose={() => setIsBetSlipOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}



