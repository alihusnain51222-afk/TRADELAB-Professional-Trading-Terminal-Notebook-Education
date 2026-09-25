import React, { useState } from 'react';
import { Asset, Position } from '../../types';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Info, 
  X, 
  CheckCircle, 
  RotateCcw,
  Sliders,
  ChevronDown
} from 'lucide-react';

interface TradeScreenProps {
  currentAsset: Asset;
  assets: Asset[];
  onSelectAsset: (assetId: string) => void;
  initialSide?: 'BUY' | 'SELL';
  demoBalance: number;
  positions: Position[];
  onOpenPosition: (position: Omit<Position, 'id' | 'timestamp' | 'pnl' | 'pnlPercent'>) => void;
  onClosePosition: (positionId: string) => void;
  onResetBalance: () => void;
}

export const TradeScreen: React.FC<TradeScreenProps> = ({
  currentAsset,
  assets,
  onSelectAsset,
  initialSide = 'BUY',
  demoBalance,
  positions,
  onOpenPosition,
  onClosePosition,
  onResetBalance,
}) => {
  const [side, setSide] = useState<'BUY' | 'SELL'>(initialSide);
  const [orderType, setOrderType] = useState<'Market' | 'Limit' | 'Stop'>('Market');
  const [limitPrice, setLimitPrice] = useState<string>(currentAsset.price.toFixed(currentAsset.decimals));
  const [amount, setAmount] = useState<string>('2.5');
  const [leverage, setLeverage] = useState<number>(5);
  const [takeProfit, setTakeProfit] = useState<string>('');
  const [stopLoss, setStopLoss] = useState<string>('');
  const [orderSuccessMsg, setOrderSuccessMsg] = useState<string | null>(null);

  const numAmount = parseFloat(amount) || 0;
  const executionPrice = orderType === 'Market' ? currentAsset.price : (parseFloat(limitPrice) || currentAsset.price);
  const notionalValue = numAmount * executionPrice;
  const requiredMargin = notionalValue / leverage;

  // Account Calculations
  const totalOpenMargin = positions.reduce((sum, p) => sum + p.margin, 0);
  const totalUnrealizedPnl = positions.reduce((sum, p) => sum + p.pnl, 0);
  const equity = demoBalance + totalUnrealizedPnl;
  const freeMargin = Math.max(0, equity - totalOpenMargin);
  const marginLevel = totalOpenMargin > 0 ? (equity / totalOpenMargin) * 100 : 999;

  const handlePercentageClick = (percent: number) => {
    const maxMarginToUse = freeMargin * (percent / 100);
    const maxNotional = maxMarginToUse * leverage;
    const calcAmount = maxNotional / executionPrice;
    setAmount(calcAmount.toFixed(currentAsset.price < 1 ? 1 : 2));
  };

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (numAmount <= 0) return;
    if (requiredMargin > freeMargin) {
      alert('Insufficient free margin for this position size. Lower amount or increase leverage.');
      return;
    }

    onOpenPosition({
      assetId: currentAsset.id,
      symbol: currentAsset.symbol,
      side,
      type: orderType,
      entryPrice: executionPrice,
      currentPrice: currentAsset.price,
      amount: numAmount,
      leverage,
      margin: requiredMargin,
      tp: takeProfit ? parseFloat(takeProfit) : undefined,
      sl: stopLoss ? parseFloat(stopLoss) : undefined,
    });

    setOrderSuccessMsg(
      `${side} ${numAmount} ${currentAsset.symbol.split('/')[0]} executed at $${executionPrice.toFixed(
        currentAsset.decimals
      )}`
    );

    setTimeout(() => {
      setOrderSuccessMsg(null);
    }, 4000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#05070A] text-white">
      {/* Header */}
      <header className="px-4 py-3 bg-[#0C1017] border-b border-[#1A2230] flex items-center justify-between sticky top-0 z-30">
        <div>
          <h1 className="text-base font-bold text-white flex items-center gap-1.5 leading-none">
            Trade Terminal
            <span className="text-[10px] font-terminal-mono px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-800/40 font-semibold">
              PAPER TRADING
            </span>
          </h1>
          <div className="flex items-center gap-2 mt-1 text-[11px] font-terminal-mono text-slate-400">
            <span>Available Balance:</span>
            <span className="text-white font-bold">
              ${demoBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <button
          onClick={onResetBalance}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-terminal-mono transition-colors border border-slate-700/60"
          title="Reset Demo Balance to $50,000"
        >
          <RotateCcw className="w-3 h-3 text-cyan-400" />
          <span>Reset $50k</span>
        </button>
      </header>

      {/* Success Notification Alert */}
      {orderSuccessMsg && (
        <div className="mx-3 mt-2 px-3 py-2 rounded-xl bg-emerald-950/90 border border-emerald-600/60 flex items-center justify-between text-xs text-emerald-200 font-terminal-mono shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{orderSuccessMsg}</span>
          </div>
          <button onClick={() => setOrderSuccessMsg(null)}>
            <X className="w-3.5 h-3.5 text-emerald-400 hover:text-white" />
          </button>
        </div>
      )}

      {/* Main Order Form */}
      <div className="p-3 bg-[#0A0D14] border-b border-[#161D29]">
        {/* Asset Header Selector & Price */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white tracking-tight">{currentAsset.symbol}</span>
            <span className="text-xs text-slate-400 font-terminal-mono">
              Live: <b className="text-cyan-400">${currentAsset.price.toFixed(currentAsset.decimals)}</b>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-terminal-mono text-slate-400">
            <span>Lev: <b className="text-cyan-400">{leverage}x</b></span>
          </div>
        </div>

        {/* Side Tabs (BUY / SELL) */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            type="button"
            onClick={() => setSide('BUY')}
            className={`py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
              side === 'BUY'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 ring-1 ring-emerald-400'
                : 'bg-[#121620] text-slate-400 hover:text-white border border-[#1E2636]'
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>BUY / LONG</span>
          </button>

          <button
            type="button"
            onClick={() => setSide('SELL')}
            className={`py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
              side === 'SELL'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40 ring-1 ring-rose-400'
                : 'bg-[#121620] text-slate-400 hover:text-white border border-[#1E2636]'
            }`}
          >
            <ArrowDownRight className="w-4 h-4" />
            <span>SELL / SHORT</span>
          </button>
        </div>

        {/* Order Types */}
        <div className="flex items-center gap-1 p-1 bg-[#10141C] rounded-lg border border-[#1C2330] mb-3">
          {(['Market', 'Limit', 'Stop'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setOrderType(type)}
              className={`flex-1 py-1 rounded text-xs font-semibold font-terminal-mono transition-colors ${
                orderType === type
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Price Input (for Limit / Stop) */}
        {orderType !== 'Market' && (
          <div className="mb-2.5">
            <label className="text-[10px] uppercase font-semibold text-slate-400 block font-terminal-mono mb-1">
              {orderType} Price (USD)
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="w-full bg-[#121620] border border-slate-700/80 rounded-xl px-3 py-2 text-sm font-terminal-mono text-white focus:outline-none focus:border-cyan-500"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-terminal-mono">USD</span>
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div className="mb-2.5">
          <div className="flex justify-between items-center text-[10px] uppercase font-semibold text-slate-400 font-terminal-mono mb-1">
            <span>Amount ({currentAsset.symbol.split('/')[0]})</span>
            <span>≈ ${(numAmount * executionPrice).toFixed(2)} USD</span>
          </div>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#121620] border border-slate-700/80 rounded-xl px-3 py-2 text-sm font-terminal-mono text-white focus:outline-none focus:border-cyan-500"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-terminal-mono">
              {currentAsset.symbol.split('/')[0]}
            </span>
          </div>
        </div>

        {/* Percentage Quick Selectors */}
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => handlePercentageClick(pct)}
              className="py-1 rounded bg-[#131722] hover:bg-slate-800 text-[11px] font-semibold font-terminal-mono text-slate-400 hover:text-cyan-400 border border-slate-800/80 transition-colors"
            >
              {pct}%
            </button>
          ))}
        </div>

        {/* Leverage Slider */}
        <div className="mb-3 p-2.5 bg-[#10141C] rounded-xl border border-slate-800/60">
          <div className="flex justify-between items-center text-[11px] font-terminal-mono mb-1.5">
            <span className="text-slate-400">Leverage Multiplier:</span>
            <span className="text-cyan-400 font-bold">{leverage}x Cross</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={leverage}
            onChange={(e) => setLeverage(parseInt(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-500 font-terminal-mono mt-1">
            <span>1x (Spot)</span>
            <span>5x</span>
            <span>10x</span>
            <span>20x (Max)</span>
          </div>
        </div>

        {/* TP & SL Inputs */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs font-terminal-mono">
          <div>
            <label className="text-[10px] text-emerald-400 block mb-1">Take Profit (TP)</label>
            <input
              type="number"
              placeholder="Target Price"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="w-full bg-[#121620] border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-rose-400 block mb-1">Stop Loss (SL)</label>
            <input
              type="number"
              placeholder="Invalidation"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="w-full bg-[#121620] border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Order Summary Specs */}
        <div className="py-2 px-3 bg-[#0E121A] rounded-xl border border-slate-800/60 text-[11px] font-terminal-mono text-slate-400 space-y-1 mb-3">
          <div className="flex justify-between">
            <span>Total Value (Notional):</span>
            <span className="text-slate-200">${notionalValue.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between">
            <span>Initial Margin Required:</span>
            <span className="text-cyan-400 font-semibold">${requiredMargin.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between">
            <span>Est. Execution Price:</span>
            <span className="text-slate-200">${executionPrice.toFixed(currentAsset.decimals)}</span>
          </div>
        </div>

        {/* Main Action Submit Button */}
        <button
          onClick={handleExecuteTrade}
          className={`w-full py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wide transition-all shadow-lg active:scale-[0.98] ${
            side === 'BUY'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-emerald-950/50'
              : 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-rose-950/50'
          }`}
        >
          {side} {currentAsset.symbol.split('/')[0]} ({leverage}x)
        </button>
      </div>

      {/* Account Metric Overview */}
      <div className="px-4 py-2.5 bg-[#090C12] border-b border-[#161D29] text-[11px] font-terminal-mono">
        <div className="grid grid-cols-3 gap-2 text-slate-400">
          <div>
            <span className="block text-[10px] text-slate-500">Balance</span>
            <span className="text-slate-200 font-bold">${demoBalance.toFixed(2)}</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-500">Equity</span>
            <span className={equity >= demoBalance ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
              ${equity.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-500">Free Margin</span>
            <span className="text-cyan-400 font-bold">${freeMargin.toFixed(2)}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/60 text-slate-400">
          <div>
            <span>Used Margin: </span>
            <span className="text-slate-200">${totalOpenMargin.toFixed(2)}</span>
          </div>
          <div className="text-right">
            <span>Margin Level: </span>
            <span className="text-emerald-400 font-bold">
              {marginLevel > 900 ? '>900%' : `${marginLevel.toFixed(1)}%`}
            </span>
          </div>
        </div>
      </div>

      {/* Open Positions List */}
      <div className="p-3 bg-[#06080D] flex-1">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-terminal-mono">
            Open Positions ({positions.length})
          </h2>
          <span className="text-[10px] text-slate-500 font-terminal-mono">Auto-P&L Marked</span>
        </div>

        {positions.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-[#0A0E16] rounded-xl border border-dashed border-slate-800">
            <Wallet className="w-8 h-8 mx-auto text-slate-600 mb-1" />
            <p className="text-xs font-semibold text-slate-400">No active trading positions</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Execute a BUY or SELL order to start paper trading.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {positions.map((pos) => {
              const isProfit = pos.pnl >= 0;
              return (
                <div
                  key={pos.id}
                  className="p-3 rounded-xl bg-[#0F141D] border border-slate-800 text-xs font-terminal-mono"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          pos.side === 'BUY'
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                            : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                        }`}
                      >
                        {pos.side} {pos.leverage}x
                      </span>
                      <span className="font-bold text-white text-sm">{pos.symbol}</span>
                    </div>

                    {/* Close Position Button */}
                    <button
                      onClick={() => onClosePosition(pos.id)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 text-[10px] font-bold transition-colors border border-slate-700/60"
                    >
                      Close Market
                    </button>
                  </div>

                  {/* Position Data */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-[11px]">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Size</span>
                      <span className="text-slate-200 font-semibold">{pos.amount}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Entry → Mark</span>
                      <span className="text-slate-300">
                        ${pos.entryPrice.toFixed(2)} → ${pos.currentPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 block text-[10px]">Unrealized P&L</span>
                      <span className={`font-bold ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isProfit ? '+' : ''}${pos.pnl.toFixed(2)} ({isProfit ? '+' : ''}{pos.pnlPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
