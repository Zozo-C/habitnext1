'use client';

import { useMascot } from '@/hooks/useMascot';

/**
 * 吉祥物圖片組件
 *
 * 用途: 簡化在任何地方插入吉祥物的流程
 *
 * 使用方式:
 *   <MascotImage mascot="coco_q_celebrate" size="5rem" style={{ top: '-3rem', left: '-2rem' }} />
 *
 * Props:
 *   - mascot: 吉祥物鑰匙 (必須) - e.g., 'coco_q_r', 'coco_q_celebrate', 'coco_q_smile'
 *   - size: 大小 (可選) - e.g., '5rem', '7rem', CSS 值
 *   - width: 寬度 (可選) - 優先於 size
 *   - height: 高度 (可選) - 優先於 size
 *   - className: 額外的 CSS 類別 (可選)
 *   - style: 內聯樣式 (可選)
 *   - alt: 替代文本 (可選)
 */
const MascotImage = ({
  mascot,
  size = 'auto',
  width,
  height,
  className = '',
  style = {},
  alt = 'mascot',
  ...props
}) => {
  const mascotPath = useMascot(mascot);

  if (!mascotPath) {
    console.warn(`[MascotImage] 無法找到吉祥物: ${mascot}`);
    return null;
  }

  const computedStyle = {
    width: width || size,
    height: height || size,
    ...style,
  };

  return (
    <img
      src={mascotPath}
      alt={alt}
      className={`${className}`}
      style={computedStyle}
      {...props}
    />
  );
};

export default MascotImage;
