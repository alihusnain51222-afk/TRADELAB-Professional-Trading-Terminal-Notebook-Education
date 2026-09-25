import React from 'react';
import { BottomTab } from '../types';
import { 
  TrendingUp, 
  BookOpen, 
  CandlestickChart, 
  ArrowLeftRight, 
  Settings as SettingsIcon 
} from 'lucide-react';

interface BottomNavProps {
  currentTab: BottomTab;
  onSelectTab: (tab: BottomTab) => void;
  isCreamTheme?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  isCreamTheme = false,
}) => {
  const tabs: { id: BottomTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'markets', label: 'Markets', icon: TrendingUp },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'chart', label: 'Chart', icon: CandlestickChart },
    { id: 'trade', label: 'Trade', icon: ArrowLeftRight },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <nav
      className={`absolute bottom-0 left-0 right-0 z-40 border-t select-none transition-colors ${
        isCreamTheme
          ? 'bg-[#FAF6ED]/95 backdrop-blur-md border-[#E2E8F0]'
          : 'bg-[#0B0F17]/95 backdrop-blur-md border-[#1A2230]'
      }`}
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      }}
    >
      <div className="grid grid-cols-5 h-14 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className="flex flex-col items-center justify-center w-full h-full relative py-1 focus:outline-none transition-colors group"
            >
              {/* Active top line indicator */}
              {isActive && (
                <div
                  className={`absolute top-0 w-8 h-[2.5px] rounded-full transition-all ${
                    isCreamTheme ? 'bg-blue-600' : 'bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.7)]'
                  }`}
                />
              )}

              <div
                className={`transition-transform duration-150 ${
                  isActive ? 'scale-110' : 'group-hover:scale-105'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? isCreamTheme
                        ? 'text-blue-700'
                        : 'text-cyan-400'
                      : isCreamTheme
                      ? 'text-slate-500 hover:text-slate-800'
                      : 'text-[#8A9099] hover:text-slate-200'
                  }`}
                />
              </div>

              <span
                className={`text-[11px] font-medium tracking-tight mt-1 transition-colors ${
                  isActive
                    ? isCreamTheme
                      ? 'text-blue-800 font-semibold'
                      : 'text-cyan-400 font-semibold'
                    : isCreamTheme
                    ? 'text-slate-600'
                    : 'text-[#8A9099]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
