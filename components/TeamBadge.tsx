"use client";

import { useTeamData, getTeamBadgeUrl, getTeamDisplayName } from '@/lib/thesportsdb';
import Image from 'next/image';

interface TeamBadgeProps {
  teamName: string;
  size?: 'tiny' | 'small' | 'medium' | 'original';
  width?: number;
  height?: number;
  className?: string;
  showName?: boolean;
  fallbackText?: string;
}

export default function TeamBadge({ 
  teamName, 
  size = 'small', 
  width = 24, 
  height = 24,
  className = '',
  showName = false,
  fallbackText
}: TeamBadgeProps) {
  const { teamData, loading, error } = useTeamData(teamName);
  
  const badgeUrl = getTeamBadgeUrl(teamData, size);
  const displayName = getTeamDisplayName(teamData, fallbackText || teamName);

  // Debug logging
  console.log(`TeamBadge for ${teamName}:`, { teamData, loading, error, badgeUrl });

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div 
          className="bg-gray-300 rounded-full animate-pulse flex items-center justify-center"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
        </div>
        {showName && <span className="text-gray-400 animate-pulse">Loading...</span>}
      </div>
    );
  }

  if (error || !badgeUrl) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div 
          className="bg-gray-600 rounded-full flex items-center justify-center"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <span className="text-white text-xs font-bold">{teamName.charAt(0)}</span>
        </div>
        {showName && <span className="text-white">{displayName}</span>}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src={badgeUrl}
        alt={`${displayName} badge`}
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
      <div 
        className="bg-gray-600 rounded-full items-center justify-center hidden"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <span className="text-white text-xs font-bold">{teamName.charAt(0)}</span>
      </div>
      {showName && <span className="text-white">{displayName}</span>}
    </div>
  );
}

// Simple badge component without loading states for performance
export function SimpleTeamBadge({ 
  teamName, 
  size = 'small', 
  width = 24, 
  height = 24,
  className = ''
}: Omit<TeamBadgeProps, 'showName' | 'fallbackText'>) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="bg-gray-600 rounded-full flex items-center justify-center"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <span className="text-white text-xs font-bold">
          {teamName.split(' ').map(word => word.charAt(0)).join('').substring(0, 2)}
        </span>
      </div>
    </div>
  );
}
