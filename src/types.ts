export type BottomTab = 'markets' | 'learn' | 'chart' | 'trade' | 'settings';

export type ScreenView = 
  | { type: 'main'; tab: BottomTab }
  | { type: 'asset-details'; assetId: string }
  | { type: 'lesson-details'; topicId: number }
  | { type: 'trading-terms' }
  | { type: 'search' };

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  marketCap: string;
  liquidity: string;
  sparkline: number[];
  category: 'crypto' | 'commodity' | 'forex';
  decimals: number;
  circulatingSupply?: string;
  allTimeHigh?: number;
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type Timeframe = '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1D';

export interface Position {
  id: string;
  assetId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'Market' | 'Limit' | 'Stop';
  entryPrice: number;
  currentPrice: number;
  amount: number;
  leverage: number;
  margin: number;
  pnl: number;
  pnlPercent: number;
  tp?: number;
  sl?: number;
  timestamp: number;
}

export interface EducationalTopic {
  id: number;
  number: number;
  title: string;
  subtitle: string;
  category: 'Psychology' | 'Risk & Basics' | 'Technical Analysis' | 'Advanced SMC' | 'Execution';
  readTime: string;
  completed?: boolean;
  bookmarked?: boolean;
}

export interface LessonDetail {
  topicId: number;
  title: string;
  tagline: string;
  intro: string;
  whatIsIt: string;
  keyConcepts: {
    heading: string;
    description: string;
  }[];
  commonMistakes: string[];
  practicalExample: {
    scenario: string;
    action: string;
    lesson: string;
  };
  recap: string[];
}

export interface TradingTerm {
  symbol: string;
  name: string;
  category: 'Structure' | 'Liquidity' | 'Order Blocks' | 'Execution' | 'Price Action';
  shortDef: string;
  inDepth: string;
  practicalRule: string;
  example: string;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export interface RecentTrade {
  id: string;
  price: number;
  amount: number;
  time: string;
  side: 'buy' | 'sell';
}
