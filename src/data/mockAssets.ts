import { Asset, Candle, Timeframe, OrderBookEntry, RecentTrade } from '../types';

export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'sol-usd',
    symbol: 'SOL/USD',
    name: 'Solana',
    price: 154.28,
    change24h: 4.82,
    high24h: 158.45,
    low24h: 147.10,
    volume24h: '$3.42B',
    marketCap: '$72.1B',
    liquidity: '$428M',
    sparkline: [147.1, 148.5, 149.2, 148.0, 151.4, 150.8, 152.6, 154.0, 153.2, 155.8, 157.4, 154.28],
    category: 'crypto',
    decimals: 2,
    circulatingSupply: '468,209,142 SOL',
    allTimeHigh: 259.96,
  },
  {
    id: 'btc-usd',
    symbol: 'BTC/USD',
    name: 'Bitcoin',
    price: 64820.50,
    change24h: 2.34,
    high24h: 65400.00,
    low24h: 63210.00,
    volume24h: '$28.6B',
    marketCap: '$1.28T',
    liquidity: '$1.84B',
    sparkline: [63210, 63600, 63450, 64100, 63900, 64400, 64200, 64900, 64600, 65100, 64820],
    category: 'crypto',
    decimals: 2,
    circulatingSupply: '19,750,000 BTC',
    allTimeHigh: 73750.07,
  },
  {
    id: 'eth-usd',
    symbol: 'ETH/USD',
    name: 'Ethereum',
    price: 2642.15,
    change24h: -1.18,
    high24h: 2710.40,
    low24h: 2615.80,
    volume24h: '$14.2B',
    marketCap: '$318.4B',
    liquidity: '$920M',
    sparkline: [2710, 2695, 2680, 2670, 2660, 2650, 2630, 2615, 2635, 2650, 2642.15],
    category: 'crypto',
    decimals: 2,
    circulatingSupply: '120,450,000 ETH',
    allTimeHigh: 4891.70,
  },
  {
    id: 'xrp-usd',
    symbol: 'XRP/USD',
    name: 'XRP Ledger',
    price: 0.5894,
    change24h: 3.45,
    high24h: 0.6025,
    low24h: 0.5680,
    volume24h: '$1.94B',
    marketCap: '$33.2B',
    liquidity: '$180M',
    sparkline: [0.568, 0.572, 0.575, 0.571, 0.582, 0.585, 0.579, 0.592, 0.601, 0.5894],
    category: 'crypto',
    decimals: 4,
    circulatingSupply: '56,400,000,000 XRP',
    allTimeHigh: 3.84,
  },
  {
    id: 'doge-usd',
    symbol: 'DOGE/USD',
    name: 'Dogecoin',
    price: 0.1248,
    change24h: -3.85,
    high24h: 0.1320,
    low24h: 0.1215,
    volume24h: '$840M',
    marketCap: '$18.1B',
    liquidity: '$95M',
    sparkline: [0.132, 0.130, 0.128, 0.129, 0.126, 0.124, 0.122, 0.1215, 0.1235, 0.1248],
    category: 'crypto',
    decimals: 4,
    circulatingSupply: '145,000,000,000 DOGE',
    allTimeHigh: 0.737,
  },
  {
    id: 'xau-usd',
    symbol: 'XAU/USD',
    name: 'Gold Spot',
    price: 2658.40,
    change24h: 0.78,
    high24h: 2664.20,
    low24h: 2641.50,
    volume24h: '$41.8B',
    marketCap: '$16.2T',
    liquidity: '$5.4B',
    sparkline: [2641.5, 2645.0, 2648.2, 2646.0, 2652.4, 2655.8, 2654.1, 2662.0, 2664.2, 2658.4],
    category: 'commodity',
    decimals: 2,
    circulatingSupply: 'Physical Bullion',
    allTimeHigh: 2685.50,
  },
  {
    id: 'bnb-usd',
    symbol: 'BNB/USD',
    name: 'BNB Chain',
    price: 588.60,
    change24h: 1.92,
    high24h: 594.10,
    low24h: 576.20,
    volume24h: '$1.12B',
    marketCap: '$86.4B',
    liquidity: '$310M',
    sparkline: [576, 579, 582, 580, 584, 588, 586, 592, 594, 588.6],
    category: 'crypto',
    decimals: 2,
    circulatingSupply: '146,800,000 BNB',
    allTimeHigh: 720.67,
  },
  {
    id: 'link-usd',
    symbol: 'LINK/USD',
    name: 'Chainlink',
    price: 12.45,
    change24h: 6.15,
    high24h: 12.80,
    low24h: 11.60,
    volume24h: '$390M',
    marketCap: '$7.5B',
    liquidity: '$120M',
    sparkline: [11.6, 11.8, 12.0, 11.9, 12.3, 12.2, 12.5, 12.7, 12.8, 12.45],
    category: 'crypto',
    decimals: 2,
    circulatingSupply: '608,000,000 LINK',
    allTimeHigh: 52.88,
  }
];

// Generates high quality realistic candlestick data
export function generateCandles(basePrice: number, timeframe: Timeframe, count: number = 60): Candle[] {
  const candles: Candle[] = [];
  const now = Date.now();
  
  let stepMs = 60 * 1000;
  let volatility = 0.003;

  switch (timeframe) {
    case '1m': stepMs = 60 * 1000; volatility = 0.002; break;
    case '5m': stepMs = 5 * 60 * 1000; volatility = 0.004; break;
    case '15m': stepMs = 15 * 60 * 1000; volatility = 0.007; break;
    case '30m': stepMs = 30 * 60 * 1000; volatility = 0.010; break;
    case '1h': stepMs = 60 * 60 * 1000; volatility = 0.015; break;
    case '4h': stepMs = 4 * 60 * 60 * 1000; volatility = 0.025; break;
    case '1D': stepMs = 24 * 60 * 60 * 1000; volatility = 0.045; break;
  }

  let currentPrice = basePrice * (1 - (volatility * 4));

  for (let i = count - 1; i >= 0; i--) {
    const time = now - i * stepMs;
    // Micro trend wave
    const wave = Math.sin((count - i) / 5) * volatility * 0.5;
    const randomDelta = (Math.random() - 0.485) * volatility * currentPrice;
    const open = currentPrice;
    let close = open + randomDelta + (wave * currentPrice * 0.1);
    
    // Bounds check
    const high = Math.max(open, close) + Math.random() * (volatility * 0.8 * currentPrice);
    const low = Math.min(open, close) - Math.random() * (volatility * 0.8 * currentPrice);
    const volume = Math.floor(Math.random() * 8500 + 1500) * (basePrice > 1000 ? 0.05 : 2);

    candles.push({
      time,
      open: Number(open.toFixed(basePrice < 1 ? 4 : 2)),
      high: Number(high.toFixed(basePrice < 1 ? 4 : 2)),
      low: Number(low.toFixed(basePrice < 1 ? 4 : 2)),
      close: Number(close.toFixed(basePrice < 1 ? 4 : 2)),
      volume: Math.round(volume),
    });

    currentPrice = close;
  }

  // Adjust last candle close to match current basePrice
  if (candles.length > 0) {
    const last = candles[candles.length - 1];
    last.close = basePrice;
    last.high = Math.max(last.high, basePrice);
    last.low = Math.min(last.low, basePrice);
  }

  return candles;
}

// Generate realistic live order book
export function generateOrderBook(basePrice: number): { bids: OrderBookEntry[]; asks: OrderBookEntry[] } {
  const bids: OrderBookEntry[] = [];
  const asks: OrderBookEntry[] = [];
  const step = basePrice * 0.0006;

  let totalBid = 0;
  for (let i = 1; i <= 8; i++) {
    const price = basePrice - i * step;
    const amount = Number((Math.random() * 25 + 5).toFixed(basePrice < 10 ? 1 : 2));
    totalBid += amount;
    bids.push({
      price: Number(price.toFixed(basePrice < 1 ? 4 : 2)),
      amount,
      total: Number(totalBid.toFixed(2))
    });
  }

  let totalAsk = 0;
  for (let i = 1; i <= 8; i++) {
    const price = basePrice + i * step;
    const amount = Number((Math.random() * 25 + 5).toFixed(basePrice < 10 ? 1 : 2));
    totalAsk += amount;
    asks.push({
      price: Number(price.toFixed(basePrice < 1 ? 4 : 2)),
      amount,
      total: Number(totalAsk.toFixed(2))
    });
  }

  return { bids, asks };
}

// Generate realistic recent trades
export function generateRecentTrades(basePrice: number): RecentTrade[] {
  const trades: RecentTrade[] = [];
  const now = Date.now();
  for (let i = 0; i < 10; i++) {
    const isBuy = Math.random() > 0.47;
    const spread = (Math.random() - 0.5) * (basePrice * 0.001);
    const date = new Date(now - i * 1800);
    const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    trades.push({
      id: `trade-${i}-${now}`,
      price: Number((basePrice + spread).toFixed(basePrice < 1 ? 4 : 2)),
      amount: Number((Math.random() * 12 + 0.5).toFixed(2)),
      time,
      side: isBuy ? 'buy' : 'sell'
    });
  }
  return trades;
}
