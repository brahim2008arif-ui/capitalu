import React from 'react';
import { Sparkles, CalendarCheck, Gift } from 'lucide-react';
import { Language } from '../types';

interface FloatingActionBubblesProps {
  language: Language;
  remainingDraws: number;
  streak: number;
  hasCheckedInToday: boolean;
  onOpenLuckyWheel: () => void;
  onOpenDailyCheckIn: () => void;
}

export const FloatingActionBubbles: React.FC<FloatingActionBubblesProps> = ({
  language,
  remainingDraws,
  streak,
  hasCheckedInToday,
  onOpenLuckyWheel,
  onOpenDailyCheckIn,
}) => {
  const isAr = language === 'ar';

  return (
    <div
      id="floating-action-bubbles-container"
      style={{
        position: 'fixed',
        bottom: '4.75rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '28rem',
        pointerEvents: 'none',
        zIndex: 35,
      }}
    >
      {/* Positioned strictly at bottom-right corner inside the max-w-md frame */}
      <div
        style={{
          position: 'absolute',
          right: '0.75rem',
          bottom: '0',
        }}
        className="flex flex-col items-center gap-2.5 pointer-events-auto"
      >
        {/* 1. Lucky Wheel Bubble (Top) */}
        <button
          id="lucky-wheel-floating-bubble"
          type="button"
          onClick={onOpenLuckyWheel}
          aria-label={isAr ? 'عجلة الحظ' : 'Lucky Wheel'}
          className="group relative flex flex-col items-center cursor-pointer select-none active:scale-90 transition-transform duration-200"
          title={isAr ? 'اضغط لفتح عجلة الحظ' : 'Click to open Lucky Wheel'}
        >
          {/* Outer glow ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-red-600 opacity-70 blur-[4px] group-hover:opacity-100 transition animate-pulse pointer-events-none" />

          {/* Compact Bubble */}
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-red-600 to-rose-700 p-0.5 shadow-[0_4px_14px_rgba(220,38,38,0.45)] border-2 border-amber-300 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center overflow-hidden relative">
              {/* Spinning wheel graphic */}
              <svg
                className="w-8 h-8 animate-[spin_10s_linear_infinite]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="46" fill="#111827" stroke="#f59e0b" strokeWidth="4" />
                <path d="M50 50 L50 4 A46 46 0 0 1 82.5 17.5 Z" fill="#ef4444" />
                <path d="M50 50 L82.5 17.5 A46 46 0 0 1 96 50 Z" fill="#f59e0b" />
                <path d="M50 50 L96 50 A46 46 0 0 1 82.5 82.5 Z" fill="#dc2626" />
                <path d="M50 50 L82.5 82.5 A46 46 0 0 1 50 96 Z" fill="#fbbf24" />
                <path d="M50 50 L50 96 A46 46 0 0 1 17.5 82.5 Z" fill="#b91c1c" />
                <path d="M50 50 L17.5 82.5 A46 46 0 0 1 4 50 Z" fill="#f59e0b" />
                <path d="M50 50 L4 50 A46 46 0 0 1 17.5 17.5 Z" fill="#ef4444" />
                <path d="M50 50 L17.5 17.5 A46 46 0 0 1 50 4 Z" fill="#fde047" />
                <circle cx="50" cy="50" r="14" fill="#7f1d1d" stroke="#fef08a" strokeWidth="3" />
                <circle cx="50" cy="50" r="6" fill="#fef08a" />
              </svg>
              {/* Pointer indicator */}
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[5px] border-t-amber-300 drop-shadow" />
            </div>

            {/* Remaining Draws Badge */}
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[9px] font-black rounded-full min-w-[18px] h-4 px-0.5 flex items-center justify-center border border-white shadow-sm">
              {remainingDraws > 0 ? remainingDraws : 0}
            </div>

            {/* Sparkle Accent */}
            <Sparkles className="absolute -bottom-0.5 -left-0.5 w-3.5 h-3.5 text-amber-300 pointer-events-none drop-shadow" />
          </div>

          {/* Text Pill Badge */}
          <span className="relative -mt-1.5 bg-gray-900/95 text-amber-300 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-amber-400/50 shadow-md tracking-tight whitespace-nowrap">
            {isAr ? 'عجلة الحظ' : 'Lucky Wheel'}
          </span>
        </button>

        {/* 2. Daily Check-In Bubble (Bottom) */}
        <button
          id="daily-checkin-floating-bubble"
          type="button"
          onClick={onOpenDailyCheckIn}
          aria-label={isAr ? 'جدول تسجيل الدخول اليومي' : 'Daily Check-In'}
          className="group relative flex flex-col items-center cursor-pointer select-none active:scale-90 transition-transform duration-200"
          title={isAr ? 'اضغط لفتح جدول تسجيل الدخول اليومي' : 'Click to open Daily Check-In'}
        >
          {/* Outer glow ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-emerald-500 to-teal-600 opacity-70 blur-[4px] group-hover:opacity-100 transition animate-pulse pointer-events-none" />

          {/* Compact Bubble */}
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-emerald-600 to-teal-700 p-0.5 shadow-[0_4px_14px_rgba(16,185,129,0.45)] border-2 border-amber-300 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gray-950 flex flex-col items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-emerald-500/20 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center justify-center">
                <CalendarCheck className="w-4 h-4 text-amber-300 drop-shadow group-hover:scale-110 transition-transform" />
                <span className="text-[7.5px] font-black text-emerald-400 tracking-tighter leading-none mt-0.5">
                  500$
                </span>
              </div>

              {!hasCheckedInToday && (
                <span className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              )}
            </div>

            {/* Streak Badge */}
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[9px] font-black rounded-full min-w-[18px] h-4 px-0.5 flex items-center justify-center border border-white shadow-sm">
              {streak > 0 ? (isAr ? `${streak}ي` : `D${streak}`) : (isAr ? '30ي' : '30D')}
            </div>

            {/* Mini Gift Accent */}
            <Gift className="absolute -bottom-0.5 -left-0.5 w-3 h-3 text-amber-300 pointer-events-none drop-shadow" />
          </div>

          {/* Text Pill Badge */}
          <span className="relative -mt-1.5 bg-gray-900/95 text-emerald-300 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-emerald-400/50 shadow-md tracking-tight whitespace-nowrap flex items-center gap-0.5">
            <span>{isAr ? 'تسجيل يومي' : 'Daily Sign-in'}</span>
            <Sparkles className="w-2 h-2 text-amber-300" />
          </span>
        </button>
      </div>
    </div>
  );
};
