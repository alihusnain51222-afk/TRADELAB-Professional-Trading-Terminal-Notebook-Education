import React, { useState } from 'react';
import { 
  User, 
  RotateCcw, 
  Moon, 
  Sun, 
  Bell, 
  LineChart, 
  DollarSign, 
  ShieldCheck, 
  BookOpen, 
  Info,
  ChevronRight,
  Sliders,
  Check
} from 'lucide-react';
import { Timeframe } from '../../types';

interface SettingsScreenProps {
  demoBalance: number;
  onResetBalance: (amount?: number) => void;
  completedTopicsCount: number;
  bookmarkedTopicsCount: number;
  onResetLearningProgress: () => void;
  currency: string;
  onChangeCurrency: (c: string) => void;
  defaultTimeframe: Timeframe;
  onChangeDefaultTimeframe: (tf: Timeframe) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  demoBalance,
  onResetBalance,
  completedTopicsCount,
  bookmarkedTopicsCount,
  onResetLearningProgress,
  currency,
  onChangeCurrency,
  defaultTimeframe,
  onChangeDefaultTimeframe,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-[#05070A] text-white">
      {/* Header */}
      <header className="px-4 py-3 bg-[#0C1017] border-b border-[#1A2230] sticky top-0 z-30">
        <h1 className="text-base font-bold text-white tracking-tight">Settings & Preferences</h1>
        <p className="text-[10px] text-slate-400 font-terminal-mono">TRADELAB Android Suite · v2.4.0</p>
      </header>

      <div className="p-4 space-y-4 pb-24 text-xs font-sans">
        {/* Profile & Demo Trading Capital Card */}
        <div className="p-4 rounded-2xl bg-[#0F141D] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
                TL
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Trader Pro Account</h3>
                <span className="text-[10px] text-cyan-400 font-terminal-mono">Simulated Paper Execution</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
              Demo Active
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#0A0D14] border border-slate-800/80 flex items-center justify-between font-terminal-mono">
            <div>
              <span className="text-[10px] text-slate-400 block">Available Capital</span>
              <span className="text-base font-bold text-white">
                ${demoBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onResetBalance(50000)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1 border border-slate-700"
              >
                <RotateCcw className="w-3 h-3 text-cyan-400" />
                <span>$50k</span>
              </button>
              <button
                onClick={() => onResetBalance(100000)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1 border border-slate-700"
              >
                <span>$100k</span>
              </button>
            </div>
          </div>
        </div>

        {/* Learning Curriculum Progress Card */}
        <div className="p-4 rounded-2xl bg-[#0F141D] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-200 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Trading Notebook Progress</span>
            </h4>
            <span className="text-[11px] font-terminal-mono text-blue-400">
              {completedTopicsCount} / 30 Completed
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${(completedTopicsCount / 30) * 100}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
            <span>Bookmarked topics: {bookmarkedTopicsCount}</span>
            <button
              onClick={onResetLearningProgress}
              className="text-rose-400 hover:underline text-[10px]"
            >
              Reset progress
            </button>
          </div>
        </div>

        {/* Chart & Terminal Settings */}
        <div className="rounded-2xl bg-[#0F141D] border border-slate-800 divide-y divide-slate-800/80">
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <LineChart className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="font-semibold text-white block">Default Timeframe</span>
                <span className="text-[10px] text-slate-400">Initial chart interval loaded</span>
              </div>
            </div>
            <div className="flex items-center gap-1 font-terminal-mono">
              {(['15m', '1h', '4h', '1D'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => onChangeDefaultTimeframe(tf)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    defaultTimeframe === tf
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-semibold text-white block">Base Currency</span>
                <span className="text-[10px] text-slate-400">Display denomination</span>
              </div>
            </div>
            <div className="flex items-center gap-1 font-terminal-mono">
              {['USD', 'EUR', 'GBP'].map((curr) => (
                <button
                  key={curr}
                  onClick={() => onChangeCurrency(curr)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    currency === curr
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-amber-400" />
              <div>
                <span className="font-semibold text-white block">Push Notifications</span>
                <span className="text-[10px] text-slate-400">Market volatility and liquidation alerts</span>
              </div>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                notificationsEnabled ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Educational Disclaimer & Legal Note */}
        <div className="p-3.5 rounded-2xl bg-[#090C12] border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold font-terminal-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>EDUCATIONAL DEMO DISCLAIMER</span>
          </div>
          <p className="leading-relaxed text-slate-400">
            TRADELAB is designed strictly for educational, technical-study, and simulated paper-trading purposes. All market data, balances, and order executions are simulated. No real money or financial liabilities are involved.
          </p>
        </div>
      </div>
    </div>
  );
};
