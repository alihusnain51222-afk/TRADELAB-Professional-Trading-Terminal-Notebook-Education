import React from 'react';
import { EducationalTopic } from '../../types';
import { Check, Bookmark, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface LearnScreenProps {
  topics: EducationalTopic[];
  onSelectTopic: (topicId: number) => void;
  onOpenTradingTerms: () => void;
  completedTopicIds: number[];
  bookmarkedTopicIds: number[];
}

export const LearnScreen: React.FC<LearnScreenProps> = ({
  topics,
  onSelectTopic,
  onOpenTradingTerms,
  completedTopicIds,
  bookmarkedTopicIds,
}) => {
  const completedCount = completedTopicIds.length;
  const progressPercent = Math.round((completedCount / topics.length) * 100);

  return (
    <div className="flex-1 flex flex-col notebook-paper min-h-full text-[#1E293B] relative select-none">
      {/* Top Margin & Sticky Note Banner */}
      <div className="pt-5 pb-3 px-4 relative z-10">
        {/* Trading Terms Jargon Quick Bookmark / Tab at top right */}
        <div className="flex justify-end mb-2">
          <button
            onClick={onOpenTradingTerms}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FFF3C4] border border-[#FDE047] text-[#854D0E] font-handwriting text-lg font-bold shadow-sm hover:rotate-1 hover:shadow-md transition-all active:scale-95"
            style={{
              transform: 'rotate(-2deg)',
            }}
          >
            <BookOpen className="w-4 h-4 text-[#A16207]" />
            <span>Trading Terms (ICT/SMC) ➔</span>
          </button>
        </div>

        {/* Large Handwritten Blue Heading (Directly inspired by Reference 2) */}
        <div className="text-center my-2">
          <h1
            className="font-kalam text-3xl sm:text-4xl font-bold tracking-tight text-[#1D4ED8] leading-[1.15]"
            style={{
              textShadow: '0 1px 1px rgba(29, 78, 216, 0.15)',
            }}
          >
            30 Topics to<br />
            Master Trading
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="w-12 h-[1.5px] bg-[#3B82F6]/40" />
            <span className="font-handwriting text-base text-[#2563EB] tracking-wide">
              handwritten study curriculum
            </span>
            <span className="w-12 h-[1.5px] bg-[#3B82F6]/40" />
          </div>
        </div>

        {/* Quiet Notebook Progress Note */}
        <div className="mt-3 flex items-center justify-between pl-16 pr-3 text-xs font-handwriting text-slate-600">
          <span className="text-sm font-semibold text-slate-700">
            Progress: {completedCount} of 30 completed ({progressPercent}%)
          </span>
          <div className="w-24 h-2 rounded-full bg-[#E2E8F0] overflow-hidden border border-slate-300">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Topics Ruled Paper List */}
      <div className="flex-1 pb-16 relative">
        {topics.map((topic) => {
          const isCompleted = completedTopicIds.includes(topic.id);
          const isBookmarked = bookmarkedTopicIds.includes(topic.id);

          return (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className="group relative flex items-baseline h-[34px] cursor-pointer hover:bg-blue-50/40 transition-colors"
            >
              {/* Left Column (Left of Red Margin Line: ~60px) */}
              <div className="w-[58px] shrink-0 text-right pr-2.5 flex items-center justify-end">
                {isCompleted ? (
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                ) : (
                  <span className="font-kalam text-sm font-bold text-slate-500">
                    {topic.number}.
                  </span>
                )}
              </div>

              {/* Red Margin Space (at ~58px-60px from left) */}
              <div className="w-[8px] shrink-0" />

              {/* Right Column: Title directly aligned along the ruled notebook line */}
              <div className="flex-1 pr-4 flex items-center justify-between overflow-hidden">
                <span
                  className={`font-kalam text-base sm:text-lg font-bold tracking-normal truncate transition-colors ${
                    isCompleted
                      ? 'text-slate-500 line-through decoration-slate-400 decoration-1'
                      : 'text-[#0F172A] group-hover:text-[#1D4ED8]'
                  }`}
                >
                  {topic.title}
                </span>

                <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isBookmarked && (
                    <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  )}
                  <span className="font-handwriting text-xs text-blue-600 font-semibold flex items-center gap-0.5">
                    Read note <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Notebook Bottom Signature / Quote */}
        <div className="mt-8 pl-16 pr-6 py-4">
          <p className="font-handwriting text-lg text-slate-600 italic">
            "The market is a device for transferring money from the impatient to the patient."
          </p>
          <p className="font-handwriting text-sm text-slate-500 mt-0.5">
            — TRADELAB Notebook Notes, 2026 Edition
          </p>
        </div>
      </div>
    </div>
  );
};
