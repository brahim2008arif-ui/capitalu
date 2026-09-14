import React, { useState, useEffect } from 'react';
import { X, CalendarCheck, Sparkles, Trophy, CheckCircle2, Lock, Flame, Gift, Clock, Timer } from 'lucide-react';
import { Language } from '../types';
import { DAILY_CHECK_IN_REWARDS } from '../data/checkInData';

const COOLDOWN_DURATION_MS = 24 * 60 * 60 * 1000; // Exact 24 hours

interface DailyCheckInModalProps {
  language: Language;
  streak: number;
  lastCheckInTime: number | null;
  claimedDays: number[];
  onClose: () => void;
  onClaimToday: () => void;
}

export const DailyCheckInModal: React.FC<DailyCheckInModalProps> = ({
  language,
  streak,
  lastCheckInTime,
  claimedDays,
  onClose,
  onClaimToday,
}) => {
  const isAr = language === 'ar';

  // Calculate live remaining milliseconds of the 24-hour cycle
  const [timeLeftMs, setTimeLeftMs] = useState<number>(() => {
    if (!lastCheckInTime) return 0;
    const elapsed = Date.now() - lastCheckInTime;
    return Math.max(0, COOLDOWN_DURATION_MS - elapsed);
  });

  useEffect(() => {
    if (!lastCheckInTime) {
      setTimeLeftMs(0);
      return;
    }

    const updateTimer = () => {
      const elapsed = Date.now() - lastCheckInTime;
      const remaining = Math.max(0, COOLDOWN_DURATION_MS - elapsed);
      setTimeLeftMs(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [lastCheckInTime]);

  const isCooldownActive = timeLeftMs > 0;
  const nextClaimDay = isCooldownActive ? streak + 1 : Math.max(1, streak === 0 ? 1 : streak + 1);
  const currentEligibleDay = isCooldownActive ? null : Math.max(1, streak + 1);

  // Get current eligible reward object
  const currentRewardObj = currentEligibleDay
    ? DAILY_CHECK_IN_REWARDS.find((r) => r.day === currentEligibleDay)
    : null;

  // Next reward object when locked in cooldown
  const nextRewardObj = DAILY_CHECK_IN_REWARDS.find((r) => r.day === nextClaimDay);

  // Time components
  const hours = Math.floor(timeLeftMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);

  const padZero = (n: number) => n.toString().padStart(2, '0');
  const formattedCountdown = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  const percentElapsed = Math.min(100, Math.max(0, ((COOLDOWN_DURATION_MS - timeLeftMs) / COOLDOWN_DURATION_MS) * 100));

  return (
    <div
      id="daily-checkin-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto cursor-pointer"
    >
      <div
        id="daily-checkin-modal"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-amber-200/60 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 cursor-default"
      >
        {/* Header with Luxury Gradient */}
        <div className="bg-gradient-to-r from-gray-950 via-red-950 to-amber-950 text-white p-4 sm:p-5 relative border-b border-amber-500/20">
          {/* Prominent Exit Button (X) */}
          <button
            id="close-checkin-modal-header-btn"
            type="button"
            onClick={onClose}
            className={`absolute top-3.5 ${
              isAr ? 'left-3.5' : 'right-3.5'
            } w-9 h-9 rounded-full bg-white/20 hover:bg-red-600 active:scale-90 border border-white/30 text-white flex items-center justify-center transition-all shadow-md cursor-pointer z-20 group`}
            title={isAr ? 'إغلاق (✕)' : 'Close (✕)'}
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="bg-gradient-to-r from-amber-500 to-red-500 text-gray-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>{isAr ? 'برنامج المكافآت المتراكمة' : 'Loyalty Check-In'}</span>
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-amber-400" />
            <span>{isAr ? 'جدول تسجيل الدخول اليومي' : 'Daily Check-In Schedule'}</span>
          </h2>
          <p className="text-xs text-amber-200/90 mt-0.5">
            {isAr
              ? 'تبدأ المكافآت من اليوم 3 وتتضاعف حتى 500 USDT في اليوم 30!'
              : 'Rewards start from Day 3 & scale up to 500 USDT on Day 30!'}
          </p>

          {/* Current Streak & Summary Banner */}
          <div className="mt-3 grid grid-cols-3 gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-2.5 border border-white/10 text-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-gray-300 font-medium flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>{isAr ? 'السلسلة' : 'Streak'}</span>
              </span>
              <span className="text-base font-black text-amber-300 mt-0.5">
                {streak} {isAr ? 'أيام' : 'Days'}
              </span>
            </div>

            <div className="flex flex-col items-center border-x border-white/10">
              <span className="text-[10px] text-gray-300 font-medium">
                {isAr ? 'اليوم التالي' : 'Next Day'}
              </span>
              <span className="text-base font-black text-white mt-0.5">
                {isAr ? `اليوم ${nextClaimDay}` : `Day ${nextClaimDay}`}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] text-gray-300 font-medium flex items-center gap-1">
                <Trophy className="w-3 h-3 text-amber-400" />
                <span>{isAr ? 'الجائزة الكبرى' : 'Top Prize'}</span>
              </span>
              <span className="text-base font-black text-emerald-400 mt-0.5">
                500 <span className="text-[10px]">USDT</span>
              </span>
            </div>
          </div>
        </div>

        {/* 24-Hour Cooldown Timer Banner (Active when waiting for next day) */}
        {isCooldownActive ? (
          <div className="bg-gradient-to-r from-amber-950 via-gray-900 to-red-950 border-b border-amber-500/30 p-3 text-white">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Timer className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>
                      {isAr ? `اليوم ${nextClaimDay} يفتح بعد 24 ساعة:` : `Day ${nextClaimDay} unlocks in 24h:`}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-300">
                    {isAr
                      ? `تم إكمال تسجيل اليوم ${streak} بنجاح`
                      : `Day ${streak} completed successfully`}
                  </div>
                </div>
              </div>

              {/* Digits Display */}
              <div className="bg-black/60 px-3 py-1.5 rounded-xl border border-amber-500/40 font-mono font-black text-amber-400 text-sm tracking-wider shadow-inner">
                {formattedCountdown}
              </div>
            </div>

            {/* Visual Countdown Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-500 rounded-full transition-all duration-1000"
                style={{ width: `${percentElapsed}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[9px] text-gray-400 mt-1">
              <span>{isAr ? 'بدء العد التنازلي (24 ساعة)' : 'Started 24h timer'}</span>
              <span>{Math.round(percentElapsed)}%</span>
            </div>
          </div>
        ) : (
          /* Notice banner when ready to claim */
          <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 text-[11px] text-amber-900 font-medium flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                {isAr
                  ? 'ملاحظة: اليوم 1 و 2 لتثبيت السلسلة، وتبدأ المكافآت المالية من اليوم 3 (1.77 USDT).'
                  : 'Note: Days 1 & 2 establish streak. Cash rewards unlock starting Day 3 (1.77 USDT).'}
              </span>
            </span>
          </div>
        )}

        {/* Schedule Grid Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">
              {isAr ? 'جدول الـ 30 يوماً الكامل' : 'Full 30-Day Calendar'}
            </span>
            <span className="text-[11px] text-gray-500 font-mono">
              {claimedDays.length}/30 {isAr ? 'مستلم' : 'Claimed'}
            </span>
          </div>

          {/* 30-Day Grid */}
          <div className="grid grid-cols-5 gap-2">
            {DAILY_CHECK_IN_REWARDS.map((item) => {
              const isClaimed = claimedDays.includes(item.day);
              const isReadyToday = currentEligibleDay === item.day;
              const isNextLocked = isCooldownActive && item.day === nextClaimDay;

              return (
                <div
                  key={item.day}
                  className={`relative rounded-2xl p-2 flex flex-col items-center justify-between text-center transition-all ${
                    isClaimed
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                      : isReadyToday
                      ? 'bg-gradient-to-b from-amber-50 to-red-50 border-2 border-red-500 shadow-md ring-2 ring-red-400/30 scale-105 z-10'
                      : isNextLocked
                      ? 'bg-gradient-to-b from-amber-50/60 to-yellow-50/60 border border-amber-400 text-amber-900 shadow-xs'
                      : item.day === 30
                      ? 'bg-gradient-to-b from-amber-100 to-amber-50 border border-amber-400 text-amber-950 font-bold'
                      : 'bg-gray-50 border border-gray-200 text-gray-600'
                  }`}
                >
                  {/* Day Label */}
                  <span className="text-[10px] font-bold block mb-0.5">
                    {isAr ? `يوم ${item.day}` : `D${item.day}`}
                  </span>

                  {/* Icon or Status */}
                  <div className="my-1">
                    {isClaimed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : isReadyToday ? (
                      <Gift className="w-5 h-5 text-red-600 animate-bounce" />
                    ) : isNextLocked ? (
                      <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                    ) : item.day === 30 ? (
                      <Trophy className="w-5 h-5 text-amber-600" />
                    ) : item.day >= 3 ? (
                      <Sparkles className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Lock className="w-4 h-4 text-gray-400" />
                    )}
                  </div>

                  {/* Reward Amount */}
                  <div className="mt-0.5 leading-tight">
                    {item.reward > 0 ? (
                      <span
                        className={`text-[11px] font-black block ${
                          isClaimed
                            ? 'text-emerald-700'
                            : isReadyToday
                            ? 'text-red-700 font-extrabold'
                            : isNextLocked
                            ? 'text-amber-800 font-bold'
                            : item.day === 30
                            ? 'text-amber-700 font-black'
                            : 'text-gray-700'
                        }`}
                      >
                        +{item.reward}
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400 font-semibold block">
                        {isAr ? 'حضور' : 'Check'}
                      </span>
                    )}
                    <span className="text-[8px] text-gray-400 font-mono block">USDT</span>
                  </div>

                  {/* Highlight tag */}
                  {item.day === 30 && (
                    <span className="absolute -top-1.5 bg-gradient-to-r from-amber-500 to-red-600 text-white text-[7px] font-black px-1 rounded-full uppercase">
                      500$
                    </span>
                  )}
                  {item.day === 3 && (
                    <span className="absolute -top-1.5 bg-red-600 text-white text-[7px] font-black px-1 rounded-full">
                      {isAr ? 'بداية' : 'Start'}
                    </span>
                  )}
                  {isNextLocked && (
                    <span className="absolute -top-1.5 bg-amber-600 text-white text-[7px] font-black px-1 rounded-full">
                      24h
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Key Milestone Highlights Table */}
          <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200 mt-2 space-y-2">
            <span className="text-[11px] font-bold text-gray-800 block">
              {isAr ? 'أهم محطات المكافآت المتصاعدة:' : 'Key Reward Milestones:'}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded-xl border border-gray-100 flex items-center justify-between">
                <span className="text-gray-600 font-medium">{isAr ? 'اليوم 3' : 'Day 3'}</span>
                <span className="font-extrabold text-red-600">+1.77 USDT</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-gray-100 flex items-center justify-between">
                <span className="text-gray-600 font-medium">{isAr ? 'اليوم 4' : 'Day 4'}</span>
                <span className="font-extrabold text-red-600">+3.99 USDT</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-gray-100 flex items-center justify-between">
                <span className="text-gray-600 font-medium">{isAr ? 'اليوم 5' : 'Day 5'}</span>
                <span className="font-extrabold text-red-600">+6.44 USDT</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between">
                <span className="text-amber-900 font-medium">{isAr ? 'اليوم 6 (مضاعفة)' : 'Day 6 (2x)'}</span>
                <span className="font-black text-amber-700">+12.88 USDT</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-gray-100 flex items-center justify-between">
                <span className="text-gray-600 font-medium">{isAr ? 'اليوم 15' : 'Day 15'}</span>
                <span className="font-black text-emerald-600">+125.00 USDT</span>
              </div>
              <div className="bg-gradient-to-r from-amber-500/10 to-red-500/10 p-2 rounded-xl border border-amber-300 flex items-center justify-between">
                <span className="text-amber-900 font-bold flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-amber-600" />
                  <span>{isAr ? 'اليوم 30' : 'Day 30'}</span>
                </span>
                <span className="font-black text-emerald-600">+500.00 USDT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col gap-2">
          {!isCooldownActive && currentRewardObj ? (
            <button
              id="claim-checkin-btn"
              type="button"
              onClick={onClaimToday}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold text-sm shadow-lg shadow-red-500/30 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>
                {isAr
                  ? `تسجيل دخول اليوم واستلام المكافأة (${currentRewardObj.reward > 0 ? `+${currentRewardObj.reward} USDT` : 'تثبيت السلسلة'})`
                  : `Check-in Today (${currentRewardObj.reward > 0 ? `+${currentRewardObj.reward} USDT` : 'Streak Check'})`}
              </span>
            </button>
          ) : (
            <div className="space-y-2">
              {/* Waiting button with lock and 24h countdown */}
              <button
                id="cooldown-checkin-btn"
                type="button"
                disabled
                className="w-full py-3.5 px-4 rounded-2xl bg-gray-200 border border-gray-300 text-gray-500 font-extrabold text-sm flex items-center justify-center gap-2 cursor-not-allowed select-none"
              >
                <Lock className="w-4 h-4 text-amber-600" />
                <span>
                  {isAr
                    ? `يرجى الانتظار (${formattedCountdown}) لليوم ${nextClaimDay}`
                    : `Please wait (${formattedCountdown}) for Day ${nextClaimDay}`}
                </span>
              </button>

              <div className="text-center text-[11px] text-gray-500 font-medium">
                {isAr
                  ? `تم استلام مكافأة اليوم ${streak} بنجاح! يتم تفعيل اليوم التالي بعد 24 ساعة.`
                  : `Day ${streak} claimed successfully! Next day unlocks after 24 hours.`}
              </div>
            </div>
          )}

          {/* Close/Exit Button */}
          <button
            id="close-checkin-modal-footer-btn"
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-98 cursor-pointer shadow-xs"
          >
            <X className="w-3.5 h-3.5 text-gray-500" />
            <span>{isAr ? 'إغلاق ومغادرة الجدول' : 'Close Schedule'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
