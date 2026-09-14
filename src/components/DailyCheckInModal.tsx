import React, { useState } from 'react';
import { X, CalendarCheck, Sparkles, Trophy, CheckCircle2, Lock, Flame, Gift, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { DAILY_CHECK_IN_REWARDS } from '../data/checkInData';

interface DailyCheckInModalProps {
  language: Language;
  streak: number;
  hasCheckedInToday: boolean;
  claimedDays: number[];
  onClose: () => void;
  onClaimToday: () => void;
  onSimulateNextDay?: () => void;
}

export const DailyCheckInModal: React.FC<DailyCheckInModalProps> = ({
  language,
  streak,
  hasCheckedInToday,
  claimedDays,
  onClose,
  onClaimToday,
  onSimulateNextDay,
}) => {
  const isAr = language === 'ar';
  const nextClaimDay = hasCheckedInToday ? streak + 1 : Math.max(1, streak === 0 ? 1 : streak + 1);
  const currentEligibleDay = hasCheckedInToday ? null : Math.max(1, streak + 1);

  // Get current eligible reward
  const currentRewardObj = currentEligibleDay
    ? DAILY_CHECK_IN_REWARDS.find((r) => r.day === currentEligibleDay)
    : null;

  const [activeTab, setActiveTab] = useState<'all' | 'milestones'>('all');

  return (
    <div
      id="daily-checkin-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div
        id="daily-checkin-modal"
        className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-amber-200/60 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header with Luxury Gradient */}
        <div className="bg-gradient-to-r from-gray-950 via-red-950 to-amber-950 text-white p-4 sm:p-5 relative border-b border-amber-500/20">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 left-3.5 rtl:left-auto rtl:right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition cursor-pointer z-10"
            title={isAr ? 'إغلاق' : 'Close'}
          >
            <X className="w-4 h-4" />
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

        {/* Info banner about rule: 3 days and up */}
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
              const isToday = currentEligibleDay === item.day;
              const isLocked = !isClaimed && !isToday;

              return (
                <div
                  key={item.day}
                  className={`relative rounded-2xl p-2 flex flex-col items-center justify-between text-center transition-all ${
                    isClaimed
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                      : isToday
                      ? 'bg-gradient-to-b from-amber-50 to-red-50 border-2 border-red-500 shadow-md ring-2 ring-red-400/30 scale-105 z-10'
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
                    ) : isToday ? (
                      <Gift className="w-5 h-5 text-red-600 animate-bounce" />
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
                            : isToday
                            ? 'text-red-700 font-extrabold'
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

                  {/* Highlight tag for Day 30 or Day 3/5 */}
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
          {!hasCheckedInToday && currentRewardObj ? (
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
              <div className="w-full py-3 px-4 rounded-2xl bg-emerald-100/80 border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center justify-center gap-2 text-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isAr
                    ? `تم تسجيل الدخول بنجاح لليوم ${streak}! عُد غداً لليوم ${nextClaimDay}`
                    : `Checked in successfully for Day ${streak}! Return tomorrow for Day ${nextClaimDay}`}
                </span>
              </div>

              {/* Developer / Evaluator convenience to simulate next day without waiting 24 hours */}
              {onSimulateNextDay && (
                <button
                  type="button"
                  onClick={onSimulateNextDay}
                  className="w-full py-2 px-3 text-[11px] text-gray-500 hover:text-gray-700 bg-gray-200/70 hover:bg-gray-200 rounded-xl font-medium transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <ArrowRight className="w-3 h-3" />
                  <span>
                    {isAr ? 'تجربة اليوم التالي فوراً (وضع المعاينة)' : 'Fast-Forward to Next Day (Preview)'}
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
