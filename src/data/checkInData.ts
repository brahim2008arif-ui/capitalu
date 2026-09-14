export interface DailyRewardItem {
  day: number;
  reward: number;
  isMilestone?: boolean;
}

export const DAILY_CHECK_IN_REWARDS: DailyRewardItem[] = [
  { day: 1, reward: 0.00 },
  { day: 2, reward: 0.00 },
  { day: 3, reward: 1.77, isMilestone: true },
  { day: 4, reward: 3.99 },
  { day: 5, reward: 6.44, isMilestone: true },
  { day: 6, reward: 12.88 },
  { day: 7, reward: 18.50 },
  { day: 8, reward: 25.00 },
  { day: 9, reward: 34.00 },
  { day: 10, reward: 45.00, isMilestone: true },
  { day: 11, reward: 58.00 },
  { day: 12, reward: 72.00 },
  { day: 13, reward: 88.00 },
  { day: 14, reward: 105.00 },
  { day: 15, reward: 125.00, isMilestone: true },
  { day: 16, reward: 148.00 },
  { day: 17, reward: 172.00 },
  { day: 18, reward: 198.00 },
  { day: 19, reward: 226.00 },
  { day: 20, reward: 256.00, isMilestone: true },
  { day: 21, reward: 288.00 },
  { day: 22, reward: 322.00 },
  { day: 23, reward: 358.00 },
  { day: 24, reward: 395.00 },
  { day: 25, reward: 430.00, isMilestone: true },
  { day: 26, reward: 455.00 },
  { day: 27, reward: 472.00 },
  { day: 28, reward: 485.00 },
  { day: 29, reward: 494.00 },
  { day: 30, reward: 500.00, isMilestone: true },
];
