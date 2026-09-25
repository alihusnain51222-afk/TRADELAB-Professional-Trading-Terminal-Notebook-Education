import React from 'react';
import { getLessonContent } from '../../data/educationData';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  Check 
} from 'lucide-react';

interface LessonDetailScreenProps {
  topicId: number;
  totalTopics: number;
  onBack: () => void;
  onNavigateTopic: (newTopicId: number) => void;
  isCompleted: boolean;
  onToggleComplete: (topicId: number) => void;
  isBookmarked: boolean;
  onToggleBookmark: (topicId: number) => void;
}

export const LessonDetailScreen: React.FC<LessonDetailScreenProps> = ({
  topicId,
  totalTopics,
  onBack,
  onNavigateTopic,
  isCompleted,
  onToggleComplete,
  isBookmarked,
  onToggleBookmark,
}) => {
  const lesson = getLessonContent(topicId);
  const progressPercent = Math.round((topicId / totalTopics) * 100);

  return (
    <div className="flex-1 flex flex-col notebook-paper min-h-full text-[#1E293B] relative select-none">
      {/* Sticky Notebook Header */}
      <header className="px-4 py-3 bg-[#FAF6ED]/95 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-700 hover:text-blue-700 font-handwriting text-lg font-bold transition-colors py-1"
        >
          <ArrowLeft className="w-4 h-4 text-blue-700" />
          <span>Notebook</span>
        </button>

        <div className="text-center">
          <span className="font-handwriting text-sm font-bold text-blue-800">
            Lesson {topicId} of {totalTopics}
          </span>
          <div className="w-24 h-1.5 rounded-full bg-slate-200 overflow-hidden mx-auto mt-0.5">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onToggleBookmark(topicId)}
            className="p-1.5 rounded hover:bg-amber-100 text-slate-600 transition-colors"
            title="Bookmark note"
          >
            <Bookmark
              className={`w-4 h-4 ${
                isBookmarked ? 'text-amber-500 fill-amber-500' : 'text-slate-500'
              }`}
            />
          </button>
          <button
            onClick={() => onToggleComplete(topicId)}
            className={`p-1.5 rounded transition-colors ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-700'
                : 'hover:bg-slate-200 text-slate-500'
            }`}
            title="Mark note complete"
          >
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Lesson Content on Ruled Paper */}
      <div className="p-4 sm:p-6 space-y-6 max-w-2xl mx-auto pb-24">
        {/* Title Lockup in Handwritten Blue Ink */}
        <div className="border-b-2 border-blue-600/30 pb-3">
          <div className="font-handwriting text-base font-bold text-blue-600 tracking-wide">
            TOPIC #{topicId.toString().padStart(2, '0')}
          </div>
          <h1 className="font-kalam text-3xl sm:text-4xl font-extrabold text-[#1D4ED8] mt-1 leading-tight">
            {lesson.title}
          </h1>
          <p className="font-handwriting text-lg text-slate-700 mt-1 italic">
            "{lesson.tagline}"
          </p>
        </div>

        {/* 1. Introduction */}
        <section className="space-y-2">
          <h2 className="font-kalam text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            Introduction
          </h2>
          <p className="font-sans text-sm text-slate-800 leading-relaxed font-normal bg-white/60 p-3.5 rounded-xl border border-[#E2E8F0] shadow-sm">
            {lesson.intro}
          </p>
        </section>

        {/* 2. What Is It? */}
        <section className="space-y-2">
          <h2 className="font-kalam text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            What is {lesson.title}?
          </h2>
          <p className="font-sans text-sm text-slate-800 leading-relaxed font-normal bg-white/60 p-3.5 rounded-xl border border-[#E2E8F0] shadow-sm">
            {lesson.whatIsIt}
          </p>
        </section>

        {/* 3. Key Concepts */}
        <section className="space-y-3">
          <h2 className="font-kalam text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            Key Study Concepts
          </h2>
          <div className="space-y-2.5">
            {lesson.keyConcepts.map((concept, idx) => (
              <div
                key={idx}
                className="bg-white/70 p-3.5 rounded-xl border border-[#E2E8F0] shadow-sm"
              >
                <h3 className="font-kalam text-base font-bold text-blue-900 mb-1">
                  {concept.heading}
                </h3>
                <p className="font-sans text-xs text-slate-700 leading-relaxed">
                  {concept.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Common Mistakes & Traps */}
        <section className="space-y-2">
          <h2 className="font-kalam text-xl font-bold text-rose-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            Common Pitfalls & Traps
          </h2>
          <div className="bg-rose-50/70 p-3.5 rounded-xl border border-rose-200/80 space-y-2 text-xs font-sans text-slate-800">
            {lesson.commonMistakes.map((mistake, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>{mistake}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Practical Example */}
        <section className="space-y-2">
          <h2 className="font-kalam text-xl font-bold text-amber-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            Practical Trade Example
          </h2>
          <div className="bg-[#FEFCE8]/80 p-3.5 rounded-xl border border-amber-200/80 space-y-2 text-xs font-sans text-slate-800 shadow-sm">
            <div>
              <span className="font-bold text-amber-900 block font-handwriting text-sm">Market Setup:</span>
              <p className="text-slate-700 mt-0.5">{lesson.practicalExample.scenario}</p>
            </div>
            <div className="pt-2 border-t border-amber-200/60">
              <span className="font-bold text-amber-900 block font-handwriting text-sm">Execution & Action:</span>
              <p className="text-slate-700 mt-0.5">{lesson.practicalExample.action}</p>
            </div>
            <div className="pt-2 border-t border-amber-200/60 font-semibold text-blue-900">
              <span className="font-bold text-amber-900 block font-handwriting text-sm">Core Takeaway:</span>
              <p className="mt-0.5">{lesson.practicalExample.lesson}</p>
            </div>
          </div>
        </section>

        {/* 6. Quick Recap Checklist */}
        <section className="space-y-2">
          <h2 className="font-kalam text-xl font-bold text-emerald-900 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            Quick Study Recap
          </h2>
          <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200/80 space-y-2 text-xs font-sans text-slate-800">
            {lesson.recap.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium text-slate-800">{point}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Fixed Bottom Lesson Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-3 bg-[#FAF6ED]/95 backdrop-blur-md border-t border-[#E2E8F0] z-30 flex items-center justify-between">
        <button
          onClick={() => onNavigateTopic(Math.max(1, topicId - 1))}
          disabled={topicId <= 1}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-kalam transition-all ${
            topicId <= 1
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : 'bg-white hover:bg-slate-100 text-slate-700 shadow-sm border border-slate-200 active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={() => onToggleComplete(topicId)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-kalam transition-all shadow-sm ${
            isCompleted
              ? 'bg-emerald-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{isCompleted ? 'Completed ✓' : 'Mark Complete'}</span>
        </button>

        <button
          onClick={() => onNavigateTopic(Math.min(totalTopics, topicId + 1))}
          disabled={topicId >= totalTopics}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-kalam transition-all ${
            topicId >= totalTopics
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : 'bg-white hover:bg-slate-100 text-slate-700 shadow-sm border border-slate-200 active:scale-95'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
