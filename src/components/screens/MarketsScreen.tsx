import React, { useState } from 'react';
import { Asset } from '../../types';
import { 
  Search, 
  Bell, 
  User, 
  Flame, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldAlert
} from 'lucide-react';

interface MarketsScreenProps {
  assets: Asset[];
  watchlist: string[];
  onToggleWatchlist: (id: string) => void;
  onSelectAsset: (assetId: string) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  demoBalance: number;
}

type MarketTab = 'trending' | 'watchlist' | 'gainers' | 'losers';

export const MarketsScreen: React.FC<MarketsScreenProps> = ({
  assets,
  watchlist,
  onToggleWatchlist,
  onSelectAsset,
  onOpenSearch,
  onOpenNotifications,
  demoBalance,
}) => {
  const [activeTab, setActiveTab] = useState<MarketTab>('trending');

  // Filter assets based on activeTab
  const filteredAssets = React.useMemo(() => {
    switch (activeTab) {
      case 'watchlist':
        return assets.filter((a) => watchlist.includes(a.id));
      case 'gainers':
        return [...assets].sort((a, b) => b.change24h - a.change24h);
      case 'losers':
        return [...assets].sort((a, b) => a.change24h - b.change24h);
      case 'trending':
      default:
        return assets;
    }
  }, [assets, activeTab, watchlist]);

  // Mini sparkline SVG renderer
  const renderSparkline = (data: number[], isPositive: boolean) => {
    if (!data || data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 64;
    const height = 24;

    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 4) - 2;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    const strokeColor = isPositive ? '#00C087' : '#FF3B56';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-[#05070A] text-white">
      {/* Header */}
      <header className="px-4 py-3 bg-[#0B0F17] border-b border-[#1A2230] flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center font-black text-white text-base shadow-[0_0_12px_rgba(0,229,255,0.4)]">
            TL
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 leading-none">
              TRADELAB
              <span className="text-[9px] font-terminal-mono font-semibold px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
                PRO
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 font-terminal-mono mt-0.5">
              DEMO TERMINAL · ${(demoBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenSearch}
            className="w-8 h-8 rounded-lg bg-[#141A24] border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title="Search Assets & Lessons"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenNotifications}
            className="w-8 h-8 rounded-lg bg-[#141A24] border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
          </button>
        </div>
      </header>

      {/* Demo Market Alert Banner */}
      <div className="mx-3 mt-2.5 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-800/30 flex items-center justify-between text-[11px] text-cyan-300 font-terminal-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>REALTIME FEED: DEMO MARKET ACTIVE</span>
        </div>
        <span className="text-[10px] text-slate-400">LATENCY 8ms</span>
      </div>

      {/* Quick Market Overview Cards (Top 3) */}
      <div className="px-3 py-2.5 grid grid-cols-3 gap-2">
        {assets.slice(0, 3).map((asset) => {
          const isPos = asset.change24h >= 0;
          return (
            <div
              key={asset.id}
              onClick={() => onSelectAsset(asset.id)}
              className="p-2.5 rounded-xl bg-[#101318] border border-[#1C2330] hover:border-cyan-500/40 cursor-pointer transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-semibold text-white">{asset.symbol.split('/')[0]}</span>
                <span className={isPos ? 'text-[#00C087]' : 'text-[#FF3B56]'}>
                  {isPos ? '+' : ''}{asset.change24h.toFixed(2)}%
                </span>
              </div>
              <div className="text-xs font-bold font-terminal-mono text-white mt-1">
                ${asset.price.toFixed(asset.decimals)}
              </div>
              <div className="mt-1 flex justify-center">
                {renderSparkline(asset.sparkline, isPos)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Segmented Filter Controls */}
      <div className="px-3 pb-1 border-b border-[#171B21]">
        <div className="flex items-center gap-1 p-1 bg-[#101318] rounded-xl border border-[#1A2230]">
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'trending'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Trending</span>
          </button>

          <button
            onClick={() => setActiveTab('watchlist')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'watchlist'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Watchlist ({watchlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gainers')}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'gainers'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Gainers</span>
          </button>

          <button
            onClick={() => setActiveTab('losers')}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'losers'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Losers</span>
          </button>
        </div>
      </div>

      {/* Asset List Header */}
      <div className="px-4 py-2 flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-terminal-mono">
        <span>Asset / Vol</span>
        <div className="flex items-center gap-10">
          <span>Chart</span>
          <span>Price / 24h</span>
        </div>
      </div>

      {/* Asset Rows */}
      <div className="flex-1 divide-y divide-[#151B24]">
        {filteredAssets.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <Star className="w-8 h-8 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-medium">Watchlist is currently empty</p>
            <p className="text-xs text-slate-400 mt-1">Tap the star next to any asset to track it here.</p>
          </div>
        ) : (
          filteredAssets.map((asset) => {
            const isPos = asset.change24h >= 0;
            const inWatchlist = watchlist.includes(asset.id);

            return (
              <div
                key={asset.id}
                onClick={() => onSelectAsset(asset.id)}
                className="px-4 py-3 hover:bg-[#10141C] flex items-center justify-between cursor-pointer transition-colors active:bg-[#161D29]"
              >
                {/* Left: Star + Asset Info */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatchlist(asset.id);
                    }}
                    className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        inWatchlist ? 'text-amber-400 fill-amber-400' : ''
                      }`}
                    />
                  </button>

                  <div className="w-9 h-9 rounded-xl bg-[#171B21] border border-slate-700/60 flex items-center justify-center font-bold text-xs text-cyan-300">
                    {asset.symbol.substring(0, 3)}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-white tracking-tight">
                        {asset.symbol}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-terminal-mono">
                      Vol {asset.volume24h}
                    </div>
                  </div>
                </div>

                {/* Center: Sparkline */}
                <div className="hidden sm:block">
                  {renderSparkline(asset.sparkline, isPos)}
                </div>

                {/* Right: Price & 24h badge */}
                <div className="text-right">
                  <div className="font-bold text-sm font-terminal-mono text-white">
                    ${asset.price.toFixed(asset.decimals)}
                  </div>
                  <div
                    className={`inline-flex items-center text-xs font-semibold font-terminal-mono mt-0.5 ${
                      isPos ? 'text-[#00C087]' : 'text-[#FF3B56]'
                    }`}
                  >
                    {isPos ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    <span>{isPos ? '+' : ''}{asset.change24h.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
