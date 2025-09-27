import { create } from 'zustand';

export interface BetLeg {
  id: string;
  match: string;
  market: string;
  selection: string;
  odds: number;
  stake: number;
  potentialWin: number;
  status: 'pending' | 'won' | 'lost';
}

interface BetSlipStore {
  legs: BetLeg[];
  totalStake: number;
  totalPotentialWin: number;
  addLeg: (leg: Omit<BetLeg, 'potentialWin' | 'status'>) => void;
  removeLeg: (id: string) => void;
  updateStake: (id: string, stake: number) => void;
  clearBetslip: () => void;
}

export const useBetSlipStore = create<BetSlipStore>((set, get) => ({
  legs: [],
  totalStake: 0,
  totalPotentialWin: 0,

  addLeg: (leg) => {
    const potentialWin = leg.stake * (leg.odds > 0 ? leg.odds / 100 : 100 / Math.abs(leg.odds));
    const newLeg: BetLeg = { ...leg, potentialWin, status: 'pending' };
    
    set((state) => {
      const existingIndex = state.legs.findIndex(l => l.id === leg.id);
      let newLegs;
      
      if (existingIndex >= 0) {
        // Update existing leg
        newLegs = [...state.legs];
        newLegs[existingIndex] = newLeg;
      } else {
        // Add new leg
        newLegs = [...state.legs, newLeg];
      }
      
      const totalStake = newLegs.reduce((sum, l) => sum + l.stake, 0);
      const totalPotentialWin = newLegs.reduce((sum, l) => sum + l.potentialWin, 0);
      
      return {
        legs: newLegs,
        totalStake,
        totalPotentialWin,
      };
    });
  },

  removeLeg: (id) => {
    set((state) => {
      const newLegs = state.legs.filter(leg => leg.id !== id);
      const totalStake = newLegs.reduce((sum, l) => sum + l.stake, 0);
      const totalPotentialWin = newLegs.reduce((sum, l) => sum + l.potentialWin, 0);
      
      return {
        legs: newLegs,
        totalStake,
        totalPotentialWin,
      };
    });
  },

  updateStake: (id, stake) => {
    set((state) => {
      const newLegs = state.legs.map(leg => 
        leg.id === id 
          ? { 
              ...leg, 
              stake, 
              potentialWin: stake * (leg.odds > 0 ? leg.odds / 100 : 100 / Math.abs(leg.odds))
            }
          : leg
      );
      
      const totalStake = newLegs.reduce((sum, l) => sum + l.stake, 0);
      const totalPotentialWin = newLegs.reduce((sum, l) => sum + l.potentialWin, 0);
      
      return {
        legs: newLegs,
        totalStake,
        totalPotentialWin,
      };
    });
  },

  clearBetslip: () => {
    set({
      legs: [],
      totalStake: 0,
      totalPotentialWin: 0,
    });
  },
}));
