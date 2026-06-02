'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HabitDayProps {
  status: 'inProgress' | 'done' | 'unstarted';
  progress?: number; // 0 到 1，只有 inProgress 時使用
  dateStr?: string; // 日期字串格式 YYYY-MM-DD
}

const HabitDay: React.FC<HabitDayProps> = ({ status, progress = 0, dateStr }) => {
  // 解析日期
  let displayText = '1';
  if (dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // 如果是月份的第一天，顯示「月/日」，否則只顯示日期
    displayText = day === 1 ? `${month}/${day}` : `${day}`;
  } else {
    const today = new Date().getDate();
    displayText = today === 1 ? `${new Date().getMonth() + 1}/${displayText}` : `${displayText}`;
  }

  // SVG 圓形進度計算
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.max(0, Math.min(1, progress)));

  if (status === 'unstarted') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center active:scale-95 transition-all cursor-pointer"
      >
        {/* 中間淺灰色圓 + 日期 */}
        <svg width="52" height="52" viewBox="0 0 52 52">
          {/* 淺灰色實心圓 */}
          <circle
            cx="26"
            cy="26"
            r="24"
            fill="#e5e7eb"
          />

          {/* 淺灰色日期數字 */}
          <text
            x="26"
            y="32"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#d1d5db"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {displayText}
          </text>
        </svg>
      </motion.div>
    );
  }

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center active:scale-95 transition-all cursor-pointer"
      >
        <svg width="56" height="56" viewBox="0 0 56 56">
          {/* 綠色實心圓 */}
          <circle
            cx="28"
            cy="28"
            r="25"
            fill="#4CAF50"
          />
          {/* 白色日期數字 */}
          <text
            x="28"
            y="37"
            textAnchor="middle"
            fontSize="24"
            fontWeight="700"
            fill="white"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {displayText}
          </text>
        </svg>
      </motion.div>
    );
  }

  // inProgress 狀態 - 黃色實心圓，根據進度填滿
  const fillPercentage = Math.max(0, Math.min(1, progress)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center active:scale-95 transition-all cursor-pointer"
    >
      <div className="relative w-[52px] h-[52px]">
        {/* 背景淺灰色圓 */}
        <svg width="52" height="52" viewBox="0 0 52 52" className="absolute inset-0">
          <circle
            cx="26"
            cy="26"
            r="24"
            fill="#e5e7eb"
          />
        </svg>

        {/* 黃色進度圓，使用 conic-gradient 效果 */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: `conic-gradient(#FFD54F ${fillPercentage}%, #e5e7eb ${fillPercentage}%)`
          }}
        />

        {/* 日期文字 */}
        <span className="absolute inset-0 flex items-center justify-center text-[16px] font-bold text-[#374151]">
          {displayText}
        </span>
      </div>
    </motion.div>
  );
};

export default HabitDay;
