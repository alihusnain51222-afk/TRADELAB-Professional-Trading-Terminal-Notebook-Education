import React, { useState } from 'react';
import { Asset, Candle, Timeframe } from '../../types';
import { InteractiveChart } from '../chart/InteractiveChart';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Sliders, 
  Eye, 
  PenTool, 
  Maximize2, 
  ChevronDown, 
  Layers,
  ArrowLeftRight,
  TrendingUp,
  Activity
} from 'lucide-react';

interface ChartScreenProps {
  currentAsset: Asset;
  assets: Asset[];
  onSelectAsset: (assetId: string) => void;
  candles: Candle[];
  timeframe: Timeframe;
  onChangeTimeframe: (tf: Timeframe) => void;
  onNavigateToTrade: (side: 'BUY' | 'SELL') => void;
}

export const ChartScreen: React.FC<ChartScreenProps> = ({
  currentAsset,
  assets,
  onSelectAsset,
  candles,
  timeframe,
  onChangeTimeframe,
  onNavigateToTrade,
}) => {
  const [showAssetSelector, setShowAssetSelector] = useState(false);
  const [showRSI, setShowRSI] = useState(false);
  const [showMA, setShowMA] = useState(true);
  const [showEMA, setShowEMA] = useState(true);
  const [drawingMode, setDrawingMode] = useState<'none' | 'horizontal' | 'trendline'>('none');
  const [chartHeight, setChartHeight] = useState<number>(360);

  const timeframes: Timeframe[] = ['1m', '5m', '15m', '30m', '1h', '4h', '1D'];
  const isPos = currentAsset.change24h >= 0;

  return (
    <div className="flex-1 flex flex-col bg-[#05070A] text-white">
      {/* Top Chart Header */}
      <header className="px-4 py-2.5 bg-[#0C1017] border-b border-[#1A2230] flex items-center justify-between sticky top-0 z-30">
        {/* Asset Selector Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowAssetSelector(!showAssetSelector)}
            className="flex items-center gap-2 py-1 px-2 -ml-2 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-[#171B21] border border-cyan-500/30 flex items-center justify-center font-bold text-xs text-cyan-300">
              {currentAsset.symbol.substring(0, 3)}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 font-bold text-sm text-white">
                <span>{currentAsset.symbol}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-[10px] text-slate-400 font-terminal-mono">
                {currentAsset.name} · Spot
              </div>
            </div>
          </button>

          {/* Asset Dropdown Modal */}
          {showAssetSelector && (
            <div className="absolute top-12 left-0 w-64 bg-[#10141C] border border-slate-700/80 rounded-xl shadow-2xl z-50 p-2 divide-y divide-slate-800">
              <div className="px-2 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-terminal-mono">
                Select Market Pair
              </div>
              <div className="max-h-60 overflow-y-auto divide-y divide-slate-800/40">
                {assets.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => {
                      onSelectAsset(asset.id);
                      setShowAssetSelector(false);
                    }}
                    className={`w-full px-2 py-2 flex items-center justify-between text-left hover:bg-slate-800/60 rounded transition-colors ${
                      asset.id === currentAsset.id ? 'bg-cyan-950/40 text-cyan-300' : 'text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs">{asset.symbol}</div>
                      <div className="text-[10px] text-slate-400">{asset.name}</div>
                    </div>
                    <div className="text-right font-terminal-mono text-xs">
                      <div>${asset.price.toFixed(asset.decimals)}</div>
                      <div
                        className={`text-[10px] ${
                          asset.change24h >= 0 ? 'text-[#00C087]' : 'text-[#FF3B56]'
                        }`}
                      >
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Current Price & 24h Stat */}
        <div className="text-right">
          <div className="font-bold text-base font-terminal-mono text-white tracking-tight">
            ${currentAsset.price.toFixed(currentAsset.decimals)}
          </div>
          <div
            className={`flex items-center justify-end text-xs font-semibold font-terminal-mono ${
              isPos ? 'text-[#00C087]' : 'text-[#FF3B56]'
            }`}
          >
            {isPos ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            <span>{isPos ? '+' : ''}{currentAsset.change24h.toFixed(2)}%</span>
          </div>
        </div>
      </header>

      {/* 24h Stats Ribbon */}
      <div className="px-4 py-1.5 bg-[#080B10] border-b border-[#151D28] grid grid-cols-4 gap-2 text-[10px] font-terminal-mono text-slate-400">
        <div>
          <span className="text-slate-500 block">24h High</span>
          <span className="text-slate-200">${currentAsset.high24h.toFixed(currentAsset.decimals)}</span>
        </div>
        <div>
          <span className="text-slate-500 block">24h Low</span>
          <span className="text-slate-200">${currentAsset.low24h.toFixed(currentAsset.decimals)}</span>
        </div>
        <div>
          <span className="text-slate-500 block">24h Volume</span>
          <span className="text-slate-200">{currentAsset.volume24h}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Liquidity</span>
          <span className="text-cyan-400">{currentAsset.liquidity}</span>
        </div>
      </div>

      {/* Timeframe Controls Bar */}
      <div className="px-3 py-1.5 bg-[#0C1017] border-b border-[#1A2230] flex items-center justify-between">
        <div className="flex items-center gap-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onChangeTimeframe(tf)}
              className={`px-2 py-1 rounded text-xs font-semibold font-terminal-mono transition-all ${
                timeframe === tf
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Quick Height expand button */}
        <button
          onClick={() => setChartHeight((prev) => (prev === 360 ? 460 : 360))}
          className="p-1.5 text-slate-400 hover:text-cyan-400 rounded hover:bg-slate-800/40 transition-colors"
          title="Toggle chart expand"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Interactive Candlestick Chart */}
      <div className="w-full relative">
        <InteractiveChart
          candles={candles}
          symbol={currentAsset.symbol}
          currentPrice={currentAsset.price}
          decimals={currentAsset.decimals}
          height={chartHeight}
          showRSI={showRSI}
          showMA={showMA}
          showEMA={showEMA}
          drawingMode={drawingMode}
        />
      </div>

      {/* Chart Tools & Indicators Bar */}
      <div className="px-3 py-2 bg-[#0A0D13] border-t border-b border-[#161D29] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold font-terminal-mono mr-1">
            Overlays:
          </span>
          <button
            onClick={() => setShowMA(!showMA)}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors border ${
              showMA
                ? 'bg-sky-950/60 text-[#38BDF8] border-sky-600/40'
                : 'bg-transparent text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            MA (20)
          </button>
          <button
            onClick={() => setShowEMA(!showEMA)}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors border ${
              showEMA
                ? 'bg-amber-950/60 text-[#F59E0B] border-amber-600/40'
                : 'bg-transparent text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            EMA (9)
          </button>
          <button
            onClick={() => setShowRSI(!showRSI)}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors border ${
              showRSI
                ? 'bg-purple-950/60 text-purple-300 border-purple-600/40'
                : 'bg-transparent text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            RSI (14)
          </button>
        </div>

        {/* Drawing Tools */}
        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              setDrawingMode((prev) => (prev === 'horizontal' ? 'none' : 'horizontal'))
            }
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors border ${
              drawingMode === 'horizontal'
                ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="Place horizontal support/resistance ray by clicking chart"
          >
            <PenTool className="w-3 h-3" />
            <span>Ray</span>
          </button>
          <button
            onClick={() =>
              setDrawingMode((prev) => (prev === 'trendline' ? 'none' : 'trendline'))
            }
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors border ${
              drawingMode === 'trendline'
                ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="Draw trendline between two clicks"
          >
            <Activity className="w-3 h-3" />
            <span>Trend</span>
          </button>
        </div>
      </div>

      {/* Quick Trade Action Footer */}
      <div className="p-3 bg-[#0B0F17] flex items-center gap-3">
        <button
          onClick={() => onNavigateToTrade('BUY')}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-950/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>BUY / LONG {currentAsset.symbol.split('/')[0]}</span>
        </button>

        <button
          onClick={() => onNavigateToTrade('SELL')}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-950/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <ArrowDownRight className="w-4 h-4" />
          <span>SELL / SHORT {currentAsset.symbol.split('/')[0]}</span>
        </button>
      </div>
    </div>
  );
};
