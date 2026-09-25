import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Smartphone, Monitor } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  theme?: 'dark' | 'cream';
  isPhoneMockup: boolean;
  onToggleMockup: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  theme = 'dark',
  isPhoneMockup,
  onToggleMockup,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('09:41');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const isCream = theme === 'cream';

  return (
    <div className="min-h-screen w-full bg-[#030407] flex flex-col items-center justify-start text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Device Bar (for testing/preview control) */}
      <header className="w-full max-w-5xl px-4 py-2 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/60 bg-[#07090E]/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold text-slate-200 tracking-wide text-xs">TRADELAB MOBILE ENGINE</span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-[11px] text-slate-400">Android 15 Native UI Shell</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMockup}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700/60"
            title="Toggle phone frame mockup or responsive edge-to-edge"
          >
            {isPhoneMockup ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Fit Window</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Phone Frame</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div
        className={`w-full flex-1 flex justify-center items-start transition-all duration-300 ${
          isPhoneMockup
            ? 'py-4 sm:py-6 px-2 sm:px-4'
            : 'p-0'
        }`}
      >
        <div
          className={`w-full flex flex-col relative transition-all duration-300 overflow-hidden shadow-2xl ${
            isPhoneMockup
              ? 'max-w-[420px] h-[890px] rounded-[44px] border-[10px] border-[#161B22] ring-1 ring-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
              : 'max-w-2xl min-h-screen border-x border-slate-800/40'
          }`}
          style={{
            backgroundColor: isCream ? '#FAF6ED' : '#05070A',
          }}
        >
          {/* Android Status Bar */}
          <div
            className={`w-full h-8 px-6 pt-1.5 flex items-center justify-between text-xs select-none z-40 transition-colors ${
              isCream
                ? 'text-slate-700 bg-[#FAF6ED]/90'
                : 'text-slate-300 bg-[#05070A]/90 backdrop-blur-md'
            }`}
          >
            <span className="font-semibold tracking-tight text-[12px]">{currentTime}</span>

            {/* Android Punch Hole Camera notch mockup */}
            <div className="w-3.5 h-3.5 rounded-full bg-black/80 border border-white/10 shadow-inner" />

            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-[10px] font-bold tracking-tight">5G</span>
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-1">
                <span className="text-[10px]">89%</span>
                <Battery className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              </div>
            </div>
          </div>

          {/* Screen Content */}
          <main className="flex-1 w-full overflow-y-auto relative flex flex-col pb-16">
            {children}
          </main>

          {/* Android Bottom Navigation Pill */}
          <div
            className={`w-full h-4 flex items-center justify-center select-none pointer-events-none fixed bottom-0 left-0 right-0 z-50 ${
              isPhoneMockup ? 'absolute' : 'fixed'
            }`}
          >
            <div
              className={`w-28 h-1 rounded-full transition-colors ${
                isCream ? 'bg-slate-400/80' : 'bg-slate-500/60'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
