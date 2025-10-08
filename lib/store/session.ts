import { create } from 'zustand';

interface SessionStore {
  user: {
    id: string;
    email: string;
    balance: number;
  } | null;
  isAuthenticated: boolean;
  rgLimits: {
    daily_stake_limit: number;
    weekly_stake_limit: number;
    monthly_stake_limit: number;
    session_timeout_mins: number;
    self_excluded: boolean;
  };
  dailyStakeUsed: number;
  login: (user: { id: string; email: string; balance: number }) => void;
  logout: () => void;
  updateBalance: (newBalance: number) => void;
  updateDailyStakeUsed: (amount: number) => void;
  setRGLimits: (limits: { 
    daily_stake_limit: number; 
    weekly_stake_limit: number; 
    monthly_stake_limit: number;
    session_timeout_mins: number;
    self_excluded: boolean;
  }) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  isAuthenticated: false,
  rgLimits: {
    daily_stake_limit: 1000,
    weekly_stake_limit: 5000,
    monthly_stake_limit: 20000,
    session_timeout_mins: 120,
    self_excluded: false,
  },
  dailyStakeUsed: 0,

  login: (user) => {
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  updateBalance: (newBalance) => {
    set((state) => ({
      user: state.user ? { ...state.user, balance: newBalance } : null,
    }));
  },

  updateDailyStakeUsed: (amount) => {
    set((state) => ({
      dailyStakeUsed: state.dailyStakeUsed + amount,
    }));
  },

  setRGLimits: (limits) => {
    set({ rgLimits: limits });
  },
}));
