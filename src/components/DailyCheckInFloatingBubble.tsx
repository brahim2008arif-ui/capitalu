import React from 'react';
import { CalendarCheck, Sparkles, Gift } from 'lucide-react';
import { Language } from '../types';

interface DailyCheckInFloatingBubbleProps {
  language: Language;
  streak: number;
  hasCheckedInToday: boolean;
  onOpen: () => void;
}

export const DailyCheckInFloatingBubble: React.FC<DailyCheckInFloatingBubbleProps> = ({
  language,
  streak,
  hasCheckedInToday,
  onOpen,
}) => {
  const isAr = language === 'ar';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '4.85rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '28rem',
        pointerEvents: 'none',
        zIndex: 35,
      }}
      className={`px-4 flex ${isAr ? 'justify-end' : 'justify-start'}`}
    >
      <button
        id="daily-checkin-floating-bubble"
        type="button"
        onClick={onOpen}
        style={{ pointerEvents: 'auto' }}
        aria-label={isAr ? 'جدول تسجيل الدخول اليومي' : 'Daily Check-In'}
        className="group relative flex flex-col items-center cursor-pointer select-none active:scale-90 transition-transform duration-200"
        title={isAr ? 'اضغط لفتح جدول تسجيل الدخول اليومي' : 'Click to open Daily Check-In'}
      >
        {/* Outer pulsating glow ring */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-emerald-500 to-teal-600 opacity-70 blur-[5px] group-hover:opacity-100 transition animate-pulse pointer-events-none" />

        {/* Circular Bubble */}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-emerald-600 to-teal-700 p-0.5 shadow-[0_8px_20px_rgba(16,185,129,0.45)] border-2 border-amber-300 flex items-center justify-center">
          {/* Inner Content Area */}
          <div className="w-full h-full rounded-full bg-gray-950 flex flex-col items-center justify-center overflow-hidden relative">
            {/* Background luxury shimmer */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-emerald-500/20 to-transparent pointer-events-none" />

            {/* Icon representation */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <CalendarCheck className="w-6 h-6 text-amber-300 drop-shadow group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-black text-emerald-400 tracking-tighter leading-none mt-0.5">
                500$
              </span>
            </div>

            {/* Pulsing indicator if not checked in today */}
            {!hasCheckedInToday && (
              <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping" />
            )}
          </div>

          {/* Current Streak Badge */}
          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-black rounded-full min-w-[22px] h-5 px-1 flex items-center justify-center border-2 border-white shadow-md">
            {streak > 0 ? (isAr ? `${streak}ي` : `D${streak}`) : (isAr ? '30ي' : '30D')}
          </div>

          {/* Mini Sparkle / Gift Accent */}
          <Gift className="absolute -bottom-1 -left-1 w-4 h-4 text-amber-300 animate-bounce pointer-events-none drop-shadow" />
        </div>

        {/* Text Pill Badge */}
        <span className="relative -mt-2 bg-gray-900/95 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/50 shadow-lg tracking-tight whitespace-nowrap flex items-center gap-0.5">
          <span>{isAr ? 'تسجيل يومي' : 'Daily Sign-in'}</span>
          <Sparkles className="w-2.5 h-2.5 text-amber-300" />
        </span>
      </button>
    </div>
  );
};
