import React, { useState } from 'react';
import { Asset, Candle, Timeframe } from '../../types';
import { InteractiveChart } from '../chart/InteractiveChart';
import { generateOrderBook, generateRecentTrades } from '../../data/mockAssets';
import { 
  ArrowLeft, 
  Star, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  BarChart2, 
  Layers, 
  Share2 
} from 'lucide-react';

interface AssetDetailsScreenProps {
  asset: Asset;
  candles: Candle[];
  timeframe: Timeframe;
  onChangeTimeframe: (tf: Timeframe) => void;
  onBack: () => void;
  onTrade: (side: 'BUY' | 'SELL') => void;
  inWatchlist: boolean;
  onToggleWatchlist: (id: string) => void;
}

export const AssetDetailsScreen: React.FC<AssetDetailsScreenProps> = ({
  asset,
  candles,
  timeframe,
  onChangeTimeframe,
  onBack,
  onTrade,
  inWatchlist,
  onToggleWatchlist,
}) => {
  const [activeTab, setActiveTab] = useState<'orderbook' | 'trades'>('orderbook');
  const isPos = asset.change24h >= 0;

  const orderBook = React.useMemo(() => generateOrderBook(asset.price), [asset.price]);
  const recentTrades = React.useMemo(() => generateRecentTrades(asset.price), [asset.price]);

  const timeframes: Timeframe[] = ['1m', '5m', '15m', '1h', '4h', '1D'];

  // Range calculation
  const rangePercent = Math.min(
    100,
    Math.max(
      0,
      ((asset.price - asset.low24h) / (asset.high24h - asset.low24h || 1)) * 100
    )
  );

  return (
    <div className="flex-1 flex flex-col bg-[#05070A] text-white">
      {/* Top Bar */}
      <header className="px-4 py-3 bg-[#0C1017] border-b border-[#1A2230] flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-tight">{asset.symbol}</span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-terminal-mono">
                {asset.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleWatchlist(asset.id)}
            className="p-1.5 rounded-lg bg-[#141A24] border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
          >
            <Star
              className={`w-4 h-4 ${inWatchlist ? 'text-amber-400 fill-amber-400' : ''}`}
            />
          </button>
        </div>
      </header>

      {/* Main Metric Hero */}
      <div className="px-4 pt-4 pb-3 bg-[#090C12] border-b border-[#161D29]">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-terminal-mono">Live Spot Price</span>
            <span className="text-3xl font-extrabold font-terminal-mono tracking-tight text-white">
              ${asset.price.toFixed(asset.decimals)}
            </span>
          </div>

          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-bold font-terminal-mono ${
              isPos ? 'bg-emerald-950/60 text-[#00C087] border border-emerald-800/40' : 'bg-rose-950/60 text-[#FF3B56] border border-rose-800/40'
            }`}
          >
            {isPos ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{isPos ? '+' : ''}{asset.change24h.toFixed(2)}%</span>
          </div>
        </div>

        {/* 24h High - Low Range Slider */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] font-terminal-mono text-slate-400 mb-1">
            <span>24h Low: <b className="text-slate-200">${asset.low24h.toFixed(asset.decimals)}</b></span>
            <span>24h High: <b className="text-slate-200">${asset.high24h.toFixed(asset.decimals)}</b></span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 rounded-full"
              style={{ width: `${rangePercent}%` }}
            />
          </div>
        </div>

        {/* 4-Column Stat Matrix */}
        <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-slate-800/60 text-xs font-terminal-mono">
          <div className="p-2 rounded-lg bg-[#10141C] border border-slate-800/40">
            <span className="text-[10px] text-slate-400 block">Market Cap</span>
            <span className="font-bold text-slate-200">{asset.marketCap}</span>
          </div>
          <div className="p-2 rounded-lg bg-[#10141C] border border-slate-800/40">
            <span className="text-[10px] text-slate-400 block">24h Volume</span>
            <span className="font-bold text-slate-200">{asset.volume24h}</span>
          </div>
          <div className="p-2 rounded-lg bg-[#10141C] border border-slate-800/40">
            <span className="text-[10px] text-slate-400 block">Pool Liquidity</span>
            <span className="font-bold text-cyan-400">{asset.liquidity}</span>
          </div>
        </div>
      </div>

      {/* Timeframe Bar */}
      <div className="px-3 py-1.5 bg-[#0C1017] border-b border-[#1A2230] flex items-center justify-between">
        <div className="flex items-center gap-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onChangeTimeframe(tf)}
              className={`px-2 py-1 rounded text-xs font-semibold font-terminal-mono transition-all ${
                timeframe === tf
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-slate-400 font-terminal-mono">Terminal Canvas</span>
      </div>

      {/* Embedded Chart */}
      <div className="w-full border-b border-[#1A2230]">
        <InteractiveChart
          candles={candles}
          symbol={asset.symbol}
          currentPrice={asset.price}
          decimals={asset.decimals}
          height={260}
          showMA={true}
          showEMA={false}
        />
      </div>

      {/* Market Statistics Section */}
      <div className="px-4 py-3 bg-[#0A0D13] border-b border-[#161D29]">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-terminal-mono mb-2">
          Market Statistics & Supply
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs font-terminal-mono">
          <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">Circulating Supply</span>
            <span className="text-slate-200 font-semibold">{asset.circulatingSupply || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">All-Time High</span>
            <span className="text-slate-200 font-semibold">${asset.allTimeHigh?.toFixed(2) || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-slate-400">Vol / Market Cap</span>
            <span className="text-slate-200 font-semibold">0.047</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-slate-400">Trading Activity</span>
            <span className="text-emerald-400 font-semibold">68% Buying</span>
          </div>
        </div>
      </div>

      {/* Order Book & Recent Trades Tabs */}
      <div className="px-4 pt-3 pb-2 bg-[#0B0F17]">
        <div className="flex items-center gap-2 border-b border-[#1C2433] pb-2">
          <button
            onClick={() => setActiveTab('orderbook')}
            className={`text-xs font-bold font-terminal-mono uppercase tracking-wider pb-1 transition-colors ${
              activeTab === 'orderbook'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Order Book (Depth)
          </button>
          <button
            onClick={() => setActiveTab('trades')}
            className={`text-xs font-bold font-terminal-mono uppercase tracking-wider pb-1 transition-colors ${
              activeTab === 'trades'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Recent Trades
          </button>
        </div>

        {activeTab === 'orderbook' ? (
          <div className="mt-2 text-xs font-terminal-mono">
            <div className="grid grid-cols-2 gap-3 text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-1">
              <div className="flex justify-between">
                <span>Bid (Qty)</span>
                <span>Bid Price</span>
              </div>
              <div className="flex justify-between">
                <span>Ask Price</span>
                <span>Ask (Qty)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Bids (Green) */}
              <div className="space-y-1">
                {orderBook.bids.slice(0, 6).map((b, i) => (
                  <div key={i} className="relative flex items-center justify-between py-0.5 px-1 rounded overflow-hidden">
                    <div
                      className="absolute inset-0 bg-emerald-500/10 rounded"
                      style={{ width: `${Math.min(100, b.total * 3)}%` }}
                    />
                    <span className="text-slate-300 relative z-10">{b.amount}</span>
                    <span className="text-[#00C087] font-semibold relative z-10">
                      ${b.price.toFixed(asset.decimals)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Asks (Red) */}
              <div className="space-y-1">
                {orderBook.asks.slice(0, 6).map((a, i) => (
                  <div key={i} className="relative flex items-center justify-between py-0.5 px-1 rounded overflow-hidden">
                    <div
                      className="absolute inset-0 bg-rose-500/10 rounded"
                      style={{ width: `${Math.min(100, a.total * 3)}%` }}
                    />
                    <span className="text-[#FF3B56] font-semibold relative z-10">
                      ${a.price.toFixed(asset.decimals)}
                    </span>
                    <span className="text-slate-300 relative z-10">{a.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-2 divide-y divide-slate-800/60 text-xs font-terminal-mono">
            <div className="flex justify-between text-[10px] text-slate-400 uppercase font-semibold py-1">
              <span>Price (USD)</span>
              <span>Amount</span>
              <span>Time</span>
            </div>
            {recentTrades.map((t) => (
              <div key={t.id} className="flex justify-between py-1">
                <span className={t.side === 'buy' ? 'text-[#00C087] font-semibold' : 'text-[#FF3B56] font-semibold'}>
                  ${t.price.toFixed(asset.decimals)}
                </span>
                <span className="text-slate-200">{t.amount}</span>
                <span className="text-slate-400">{t.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky Bottom Trade Action Bar */}
      <div className="p-3 bg-[#0C1017] border-t border-[#1A2230] flex items-center gap-3 sticky bottom-14 z-30">
        <button
          onClick={() => onTrade('BUY')}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-sm tracking-wide shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>BUY {asset.symbol.split('/')[0]}</span>
        </button>

        <button
          onClick={() => onTrade('SELL')}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-bold text-sm tracking-wide shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <ArrowDownRight className="w-4 h-4" />
          <span>SELL {asset.symbol.split('/')[0]}</span>
        </button>
      </div>
    </div>
  );
};
