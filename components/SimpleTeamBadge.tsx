"use client";

import Image from "next/image";

interface SimpleTeamBadgeProps {
  teamName: string;
  width?: number;
  height?: number;
  className?: string;
  showName?: boolean;
}

// Simple badge URLs for common teams (fallback)
const TEAM_BADGES = {
  'Liverpool': 'https://r2.thesportsdb.com/images/media/team/badge/kfaher1737969724.png',
  'Arsenal': 'https://r2.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png',
  'Man City': 'https://r2.thesportsdb.com/images/media/team/badge/xtwuyt1448813175.png',
  'Chelsea': 'https://r2.thesportsdb.com/images/media/team/badge/fc8j1s1548770124.png',
  'Lakers': 'https://r2.thesportsdb.com/images/media/team/badge/wvbk1l1548770124.png',
  'Warriors': 'https://r2.thesportsdb.com/images/media/team/badge/wvbk1l1548770124.png',
} as const;

export default function SimpleTeamBadge({ 
  teamName, 
  width = 24, 
  height = 24,
  className = '',
  showName = false
}: SimpleTeamBadgeProps) {
  const badgeUrl = TEAM_BADGES[teamName as keyof typeof TEAM_BADGES];
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {badgeUrl ? (
        <Image
          src={badgeUrl}
          alt={`${teamName} badge`}
          width={width}
          height={height}
          className="rounded-full"
          onError={(e) => {
            // Fallback to text if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
      ) : null}
      <div 
        className={`bg-gray-600 rounded-full flex items-center justify-center ${badgeUrl ? 'hidden' : 'flex'}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <span className="text-white text-xs font-bold">
          {teamName.split(' ').map(word => word.charAt(0)).join('').substring(0, 2)}
        </span>
      </div>
      {showName && <span className="text-white">{teamName}</span>}
    </div>
  );
}
