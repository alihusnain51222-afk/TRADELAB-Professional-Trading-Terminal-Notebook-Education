import React, { useState } from 'react';
import { Asset, EducationalTopic, TradingTerm } from '../../types';
import { Search, X, TrendingUp, BookOpen, Layers, Activity } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: Asset[];
  topics: EducationalTopic[];
  terms: TradingTerm[];
  onSelectAsset: (assetId: string) => void;
  onSelectTopic: (topicId: number) => void;
  onSelectTerm: (term: TradingTerm) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  assets,
  topics,
  terms,
  onSelectAsset,
  onSelectTopic,
  onSelectTerm,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'assets' | 'lessons' | 'terms'>('all');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingAssets = q
    ? assets.filter((a) => a.symbol.toLowerCase().includes(q) || a.name.toLowerCase().includes(q))
    : assets.slice(0, 4);

  const matchingTopics = q
    ? topics.filter((t) => t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q))
    : topics.slice(0, 4);

  const matchingTerms = q
    ? terms.filter(
        (tm) =>
          tm.symbol.toLowerCase().includes(q) ||
          tm.name.toLowerCase().includes(q) ||
          tm.shortDef.toLowerCase().includes(q)
      )
    : terms.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-start p-3 sm:p-6 animate-in fade-in">
      <div className="w-full max-w-lg bg-[#0D121B] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-3 border-b border-slate-800 flex items-center gap-2">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search assets, 30 lessons, SMC terms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-sans"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Esc
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-3 py-2 bg-[#090D14] border-b border-slate-800 flex items-center gap-1.5 text-xs">
          {(['all', 'assets', 'lessons', 'terms'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase font-terminal-mono transition-colors ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 divide-y divide-slate-800/60 text-xs">
          {/* Assets Section */}
          {(activeCategory === 'all' || activeCategory === 'assets') && matchingAssets.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 uppercase font-terminal-mono mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Market Assets ({matchingAssets.length})</span>
              </div>
              <div className="space-y-1">
                {matchingAssets.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => {
                      onSelectAsset(asset.id);
                      onClose();
                    }}
                    className="p-2 rounded-xl hover:bg-slate-800/60 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-[11px] text-cyan-300">
                        {asset.symbol.substring(0, 3)}
                      </div>
                      <div>
                        <span className="font-bold text-white text-xs block">{asset.symbol}</span>
                        <span className="text-[10px] text-slate-400">{asset.name}</span>
                      </div>
                    </div>
                    <div className="text-right font-terminal-mono">
                      <span className="text-white font-bold block">${asset.price.toFixed(asset.decimals)}</span>
                      <span className={asset.change24h >= 0 ? 'text-[#00C087]' : 'text-[#FF3B56]'}>
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lessons Section */}
          {(activeCategory === 'all' || activeCategory === 'lessons') && matchingTopics.length > 0 && (
            <div className="pt-3">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 uppercase font-terminal-mono mb-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Curriculum Lessons ({matchingTopics.length})</span>
              </div>
              <div className="space-y-1">
                {matchingTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => {
                      onSelectTopic(topic.id);
                      onClose();
                    }}
                    className="p-2 rounded-xl hover:bg-slate-800/60 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-blue-400 font-terminal-mono font-bold">#{topic.number}</span>
                        <span className="font-bold text-white text-xs">{topic.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 line-clamp-1">{topic.subtitle}</span>
                    </div>
                    <span className="text-[10px] font-terminal-mono text-slate-500 shrink-0">
                      {topic.readTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terms Section */}
          {(activeCategory === 'all' || activeCategory === 'terms') && matchingTerms.length > 0 && (
            <div className="pt-3">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 uppercase font-terminal-mono mb-2">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Trading Glossary & SMC ({matchingTerms.length})</span>
              </div>
              <div className="space-y-1">
                {matchingTerms.map((term) => (
                  <div
                    key={term.symbol}
                    onClick={() => {
                      onSelectTerm(term);
                      onClose();
                    }}
                    className="p-2 rounded-xl hover:bg-slate-800/60 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-terminal-mono font-bold text-cyan-400">{term.symbol}</span>
                        <span className="text-slate-300 font-medium">{term.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 line-clamp-1">{term.shortDef}</span>
                    </div>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-terminal-mono">
                      {term.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchingAssets.length === 0 && matchingTopics.length === 0 && matchingTerms.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              <p className="font-semibold text-xs text-slate-400">No results found for "{query}"</p>
              <p className="text-[11px] text-slate-500 mt-1">Try searching for SOL, FVG, Stop Loss, or Psychology.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
