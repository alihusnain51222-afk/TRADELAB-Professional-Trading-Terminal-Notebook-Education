import React, { useState } from 'react';
import { TRADING_TERMS } from '../../data/tradingTermsData';
import { TradingTerm } from '../../types';
import { ArrowLeft, Search, X, BookOpen, Lightbulb, Check } from 'lucide-react';

interface TradingTermsScreenProps {
  onBack: () => void;
}

export const TradingTermsScreen: React.FC<TradingTermsScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<TradingTerm | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'Structure', 'Liquidity', 'Order Blocks', 'Execution', 'Price Action'];

  const filteredTerms = TRADING_TERMS.filter((t) => {
    const matchesSearch =
      t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDef.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex-1 flex flex-col notebook-paper min-h-full text-[#1E293B] relative select-none">
      {/* Header */}
      <header className="px-4 py-3 bg-[#FAF6ED]/95 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-700 hover:text-blue-700 font-handwriting text-lg font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-blue-700" />
          <span>Back to Notes</span>
        </button>

        <h1 className="font-kalam text-xl font-bold text-blue-800">
          Trading Glossary (SMC & ICT)
        </h1>

        <div className="w-6" />
      </header>

      {/* Intro Note */}
      <div className="p-4 border-b border-slate-200/60 bg-white/40">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-blue-700" />
          <span className="font-handwriting text-base font-bold text-blue-900">
            24 Institutional Acronyms & SMC Terms
          </span>
        </div>
        <p className="font-sans text-xs text-slate-700 leading-relaxed">
          Tap any acronym to view its institutional definition, algorithmic market delivery logic, and practical execution rule.
        </p>

        {/* Search Bar */}
        <div className="mt-3 relative">
          <input
            type="text"
            placeholder="Search terms (e.g. FVG, BOS, OB)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/80 border border-slate-300 rounded-xl pl-9 pr-8 py-2 text-xs font-sans text-slate-800 focus:outline-none focus:border-blue-500 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto mt-2.5 pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-handwriting font-bold shrink-0 transition-all ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white/70 text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All (24)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pb-20">
        {filteredTerms.map((term) => (
          <div
            key={term.symbol}
            onClick={() => setSelectedTerm(term)}
            className="p-3 bg-white/75 hover:bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="font-terminal-mono text-base font-extrabold text-blue-700 group-hover:text-blue-600">
                  {term.symbol}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 font-sans uppercase">
                  · {term.category}
                </span>
              </div>
              <span className="font-handwriting text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Details ➔
              </span>
            </div>

            <div className="font-kalam text-sm font-bold text-slate-800 mt-0.5">
              {term.name}
            </div>

            <p className="font-sans text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
              {term.shortDef}
            </p>
          </div>
        ))}
      </div>

      {/* Selected Term Drawer / Modal */}
      {selectedTerm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-[#FAF6ED] rounded-t-3xl sm:rounded-3xl border border-slate-300 p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-start justify-between border-b border-slate-300 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-terminal-mono text-2xl font-black text-blue-700">
                    {selectedTerm.symbol}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase font-sans">
                    {selectedTerm.category}
                  </span>
                </div>
                <h3 className="font-kalam text-xl font-bold text-slate-900 mt-0.5">
                  {selectedTerm.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTerm(null)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* In-depth definition */}
            <div className="bg-white/80 p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-blue-800 font-handwriting block">
                Algorithmic & Institutional Meaning:
              </span>
              <p className="font-sans text-xs text-slate-800 leading-relaxed">
                {selectedTerm.inDepth}
              </p>
            </div>

            {/* Practical execution rule */}
            <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-emerald-800 font-handwriting flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Practical Rule of Engagement:
              </span>
              <p className="font-sans text-xs text-slate-800 leading-relaxed font-medium">
                {selectedTerm.practicalRule}
              </p>
            </div>

            {/* Real World Example */}
            <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-amber-800 font-handwriting flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                Live Market Example:
              </span>
              <p className="font-sans text-xs text-slate-800 leading-relaxed">
                {selectedTerm.example}
              </p>
            </div>

            <button
              onClick={() => setSelectedTerm(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-kalam text-sm font-bold shadow-md transition-all active:scale-95"
            >
              Done / Close Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
