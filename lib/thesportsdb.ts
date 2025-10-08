// TheSportsDB API integration for team badges and data

const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/123';

export interface TeamData {
  idTeam: string;
  strTeam: string;
  strTeamBadge: string;
  strLeague: string;
  strSport: string;
  strCountry: string;
}

export interface TeamSearchResponse {
  teams: TeamData[];
}

// Cache for team data to avoid repeated API calls
const teamCache = new Map<string, TeamData>();

export async function getTeamData(teamName: string): Promise<TeamData | null> {
  console.log(`Fetching team data for: ${teamName}`);
  
  // Check cache first
  if (teamCache.has(teamName)) {
    console.log(`Found cached data for: ${teamName}`);
    return teamCache.get(teamName)!;
  }

  try {
    const url = `${API_BASE_URL}/searchteams.php?t=${encodeURIComponent(teamName)}`;
    console.log(`Making API request to: ${url}`);
    
    const response = await fetch(url);
    console.log(`API response status: ${response.status}`);
    
    const data: TeamSearchResponse = await response.json();
    console.log(`API response data:`, data);
    
    if (data.teams && data.teams.length > 0) {
      const team = data.teams[0];
      console.log(`Found team:`, team);
      // Cache the result
      teamCache.set(teamName, team);
      return team;
    }
    
    console.log(`No teams found for: ${teamName}`);
    return null;
  } catch (error) {
    console.error(`Error fetching team data for ${teamName}:`, error);
    return null;
  }
}

// Helper function to get team badge URL with size
export function getTeamBadgeUrl(teamData: TeamData | null, size: 'tiny' | 'small' | 'medium' | 'original' = 'small'): string | null {
  if (!teamData?.strTeamBadge) return null;
  
  if (size === 'original') {
    return teamData.strTeamBadge;
  }
  
  return `${teamData.strTeamBadge}/${size}`;
}

// Predefined team mappings for our reels
export const TEAM_MAPPINGS = {
  // Premier League
  'Liverpool': 'Liverpool',
  'Arsenal': 'Arsenal', 
  'Man City': 'Manchester_City',
  'Chelsea': 'Chelsea',
  'Manchester United': 'Manchester_United',
  'Tottenham': 'Tottenham',
  'Newcastle': 'Newcastle_United',
  'Brighton': 'Brighton_&_Hove_Albion',
  'West Ham': 'West_Ham_United',
  'Aston Villa': 'Aston_Villa',
  
  // NBA
  'Lakers': 'Los_Angeles_Lakers',
  'Warriors': 'Golden_State_Warriors',
  'Celtics': 'Boston_Celtics',
  'Heat': 'Miami_Heat',
  'Bucks': 'Milwaukee_Bucks',
  'Nuggets': 'Denver_Nuggets',
  'Suns': 'Phoenix_Suns',
  '76ers': 'Philadelphia_76ers',
  'Nets': 'Brooklyn_Nets',
  'Clippers': 'Los_Angeles_Clippers',
  
  // NFL
  'Chiefs': 'Kansas_City_Chiefs',
  'Bills': 'Buffalo_Bills',
  'Patriots': 'New_England_Patriots',
  'Dolphins': 'Miami_Dolphins',
  'Jets': 'New_York_Jets',
  'Cowboys': 'Dallas_Cowboys',
  'Eagles': 'Philadelphia_Eagles',
  'Giants': 'New_York_Giants',
  'Commanders': 'Washington_Commanders',
  'Packers': 'Green_Bay_Packers',
  
  // Champions League
  'Real Madrid': 'Real_Madrid',
  'Barcelona': 'Barcelona',
  'Bayern Munich': 'Bayern_Munich',
  'PSG': 'Paris_Saint-Germain',
  'Juventus': 'Juventus',
  'AC Milan': 'AC_Milan',
  'Inter Milan': 'Inter_Milan',
  'Atletico Madrid': 'Atletico_Madrid',
  'Borussia Dortmund': 'Borussia_Dortmund',
  'Napoli': 'Napoli'
} as const;

// React hook to fetch team data with loading state
import { useState, useEffect } from 'react';

export function useTeamData(teamName: string) {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      setError(null);
      
      const mappedName = TEAM_MAPPINGS[teamName as keyof typeof TEAM_MAPPINGS] || teamName;
      const data = await getTeamData(mappedName);
      
      if (data) {
        setTeamData(data);
      } else {
        setError(`Team "${teamName}" not found`);
      }
      
      setLoading(false);
    };

    fetchTeam();
  }, [teamName]);

  return { teamData, loading, error };
}

// Helper function to get team display name from API data
export function getTeamDisplayName(teamData: TeamData | null, fallback: string): string {
  return teamData?.strTeam || fallback;
}
