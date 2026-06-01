'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CourseCardProps {
  themeColor: string;
  tag: string;
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  onButtonClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  themeColor,
  tag,
  title,
  description,
  buttonText,
  imageUrl,
  onButtonClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full bg-white rounded-3xl shadow-md overflow-hidden"
    >
      <div className="p-6 flex flex-col justify-between h-full min-h-[160px]">
        {/* 左側文字區 - 約 60% 寬度 */}
        <div className="flex flex-col justify-between w-3/5 pr-4">
          {/* 標籤 */}
          <div
            style={{ color: themeColor }}
            className="text-xs font-bold tracking-wide mb-3"
          >
            {tag}
          </div>

          {/* 標題 */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>

          {/* 描述 */}
          <p className="text-sm text-gray-500 mb-6 line-clamp-2">
            {description}
          </p>

          {/* 按鈕 */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onButtonClick}
            style={{ backgroundColor: themeColor }}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm hover:shadow-lg active:scale-95 transition-all"
          >
            {buttonText}
          </motion.button>
        </div>
      </div>

      {/* 右側圖片區 - 絕對定位 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="absolute bottom-0 right-0 w-40 h-40"
        style={{ opacity: 0.7 }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

export default CourseCard;
