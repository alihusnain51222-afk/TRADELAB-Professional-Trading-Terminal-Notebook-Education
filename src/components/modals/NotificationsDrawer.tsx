import React from 'react';
import { X, Bell, TrendingUp, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

interface NotificationItem {
  id: string;
  type: 'market' | 'learn' | 'trade';
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications: NotificationItem[] = [
    {
      id: '1',
      type: 'market',
      title: 'SOL/USD Breakout Alert',
      message: 'SOL breached $154.00 resistance with +4.8% 24h momentum expansion.',
      time: '2m ago',
      unread: true,
    },
    {
      id: '2',
      type: 'learn',
      title: 'Study Note Recommendation',
      message: 'Review Topic #05: Price Action Mastery to understand rejection wicks.',
      time: '1h ago',
      unread: true,
    },
    {
      id: '3',
      type: 'trade',
      title: 'Paper Trading Liquidity',
      message: 'Simulated market depth updated: $428M pool liquidity active.',
      time: '3h ago',
      unread: false,
    },
    {
      id: '4',
      type: 'learn',
      title: 'Lesson Completed',
      message: 'You completed Topic #01: Trading Psychology. 29 lessons remaining.',
      time: 'Yesterday',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-sm bg-[#0C1017] border-l border-slate-800 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-sm text-white">Market & Study Alerts</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2 text-xs">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl transition-colors ${
                item.unread ? 'bg-[#121722]/80' : 'hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1.5 font-bold text-slate-200">
                  {item.type === 'market' && <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />}
                  {item.type === 'learn' && <BookOpen className="w-3.5 h-3.5 text-blue-400" />}
                  {item.type === 'trade' && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{item.title}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-terminal-mono">{item.time}</span>
              </div>
              <p className="text-slate-400 mt-1 text-[11px] leading-relaxed">{item.message}</p>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Mark all read
          </button>
        </div>
      </div>
    </div>
  );
};
