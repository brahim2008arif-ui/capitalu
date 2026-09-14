import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types';

interface LuckyWheelFloatingBubbleProps {
  language: Language;
  remainingDraws: number;
  onOpen: () => void;
}

export const LuckyWheelFloatingBubble: React.FC<LuckyWheelFloatingBubbleProps> = ({
  language,
  remainingDraws,
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
      className={`px-4 flex ${isAr ? 'justify-start' : 'justify-end'}`}
    >
      <button
        id="lucky-wheel-floating-bubble"
        type="button"
        onClick={onOpen}
        style={{ pointerEvents: 'auto' }}
        aria-label={isAr ? 'عجلة الحظ' : 'Lucky Wheel'}
        className="group relative flex flex-col items-center cursor-pointer select-none active:scale-90 transition-transform duration-200"
        title={isAr ? 'اضغط لفتح عجلة الحظ' : 'Click to open Lucky Wheel'}
      >
        {/* Outer pulsating glow ring */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-red-600 opacity-70 blur-[5px] group-hover:opacity-100 transition animate-pulse pointer-events-none" />

        {/* Circular Bubble */}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-red-600 to-rose-700 p-0.5 shadow-[0_8px_20px_rgba(220,38,38,0.5)] border-2 border-amber-300 flex items-center justify-center">
          {/* Inner Wheel Representation */}
          <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center overflow-hidden relative">
            {/* Spinning multi-colored wheel graphic */}
            <svg
              className="w-10 h-10 animate-[spin_10s_linear_infinite]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="46" fill="#111827" stroke="#f59e0b" strokeWidth="4" />
              {/* 8 colored segments */}
              <path d="M50 50 L50 4 A46 46 0 0 1 82.5 17.5 Z" fill="#ef4444" />
              <path d="M50 50 L82.5 17.5 A46 46 0 0 1 96 50 Z" fill="#f59e0b" />
              <path d="M50 50 L96 50 A46 46 0 0 1 82.5 82.5 Z" fill="#dc2626" />
              <path d="M50 50 L82.5 82.5 A46 46 0 0 1 50 96 Z" fill="#fbbf24" />
              <path d="M50 50 L50 96 A46 46 0 0 1 17.5 82.5 Z" fill="#b91c1c" />
              <path d="M50 50 L17.5 82.5 A46 46 0 0 1 4 50 Z" fill="#f59e0b" />
              <path d="M50 50 L4 50 A46 46 0 0 1 17.5 17.5 Z" fill="#ef4444" />
              <path d="M50 50 L17.5 17.5 A46 46 0 0 1 50 4 Z" fill="#fde047" />

              {/* Center Hub */}
              <circle cx="50" cy="50" r="14" fill="#7f1d1d" stroke="#fef08a" strokeWidth="3" />
              <circle cx="50" cy="50" r="6" fill="#fef08a" />
            </svg>

            {/* Pointer / Needle Indicator at top */}
            <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[7px] border-t-amber-300 drop-shadow" />
          </div>

          {/* Remaining Draws Badge */}
          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center border-2 border-white shadow-md">
            {remainingDraws > 0 ? remainingDraws : 0}
          </div>

          {/* Mini Sparkle Accent */}
          <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 text-amber-300 animate-bounce pointer-events-none drop-shadow" />
        </div>

        {/* Text Pill Badge */}
        <span className="relative -mt-2 bg-gray-900/95 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-400/50 shadow-lg tracking-tight whitespace-nowrap flex items-center gap-0.5">
          <span>{isAr ? 'عجلة الحظ' : 'Lucky Wheel'}</span>
        </span>
      </button>
    </div>
  );
};
