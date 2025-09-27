# BetBolt - Sports Betting Reels - Mobile Sports Betting Reels

A mobile-first sports betting app with TikTok-style reels, built with Next.js, TypeScript, and Supabase.

## Features

- 🎥 **Vertical Reels Feed**: TikTok-style full-screen reels for sports betting
- ⚡ **Live Betting**: Real-time odds updates with animated pulses
- 🎰 **Casino Integration**: Inline casino games (Crash, Roulette, Loot Boxes)
- 📱 **PWA Support**: Installable mobile app with offline capabilities
- 🎯 **Bet Slip**: Multi-leg parlays with boost system
- 🛡️ **Responsible Gaming**: Built-in limits and self-exclusion tools
- 🎨 **Smooth Animations**: Framer Motion for buttery 60fps interactions

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Data Fetching**: React Query
- **PWA**: Next.js PWA plugin
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BetBolt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Set up the database**
   ```bash
   # Run the schema in your Supabase SQL editor
   cat supabase/schema.sql
   ```

5. **Seed the database**
   ```bash
   npm run db:seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The app uses the following main tables:

- `users` - User accounts and profiles
- `games` - Sports games and matches
- `markets` - Betting markets and odds
- `reels` - Feed items for the reels interface
- `bets` - User bets and wagers
- `bet_legs` - Individual bet selections
- `interactions` - Social interactions (likes, shares)
- `boosts` - User boosts and bonuses
- `rg_limits` - Responsible gaming limits
- `admin_config` - App configuration

## Key Components

### Reels System
- `ReelFeed` - Main vertical scrolling container
- `ReelCard` - Individual reel display with gestures
- `OddsChip` - Animated odds display
- `TrendPill` - Trend indicators
- `LiveClock` - Live game clock

### Betting System
- `BetSlipSheet` - Bottom sheet for bet management
- `ParlayLeg` - Individual bet leg display
- `QuickStakeBar` - Quick stake selection
- `BoostPill` - Boost display and management

### Casino Games
- `CrashReel` - Crash game simulation
- `RouletteReel` - Roulette wheel game
- `LootReveal` - Loot box opening

### Responsible Gaming
- `/rg` - RG settings and limits page
- Session timeout enforcement
- Daily stake limits
- Self-exclusion tools

## API Endpoints

- `GET /api/feed` - Get interleaved feed with casino mixing
- `POST /api/live-odds` - Update live odds for markets
- `GET /api/games` - Get games and matches
- `POST /api/bets` - Place bets

## Feed Mixing Algorithm

The feed uses a sophisticated mixing algorithm that:

1. **Respects mode filters** (all, pregame, live)
2. **Interleaves casino reels** based on admin config
3. **Ensures live content** appears in first 5 items
4. **Prioritizes upcoming games** in top 10
5. **Never exceeds** max consecutive casino reels
6. **Applies weights** for content prioritization

## Mobile-First Design

- **Full-screen reels** with snap paging
- **Gesture navigation** (swipe up/down)
- **Touch targets** minimum 44px
- **Safe area handling** for notched devices
- **Smooth 60fps** animations
- **PWA installation** support

## Development Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database operations
npm run db:seed    # Seed with mock data
npm run db:reset   # Reset database

# Linting
npm run lint
```

## Deployment

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel/Netlify**
   - Connect your repository
   - Set environment variables
   - Deploy automatically

3. **Configure Supabase**
   - Set up Row Level Security (RLS)
   - Configure CORS for your domain
   - Set up real-time subscriptions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@betbolt.com or join our Discord community.



