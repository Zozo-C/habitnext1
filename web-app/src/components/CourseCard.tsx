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
  imageScale?: number;
  onButtonClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  themeColor,
  tag,
  title,
  description,
  buttonText,
  imageUrl,
  imageScale = 1,
  onButtonClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full bg-white rounded-3xl shadow-md overflow-hidden"
    >
      {/* 圖片 — z-0 置於底層 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="absolute bottom-0 right-0 w-40 h-full z-0"
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain object-bottom translate-x-6"
          style={{ opacity: 0.2, transform: `translateX(1.5rem) scale(${imageScale})`, transformOrigin: 'bottom right' }}
        />
      </motion.div>

      {/* 文字與按鈕 — z-10 在圖片之上 */}
      <div className="relative z-10 p-6 flex flex-col min-h-[160px]">
        <div style={{ color: themeColor }} className="text-xs font-bold tracking-wide mb-3">
          {tag}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-700 mb-6 line-clamp-2">
          {description}
        </p>
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
    </motion.div>
  );
};

export default CourseCard;
