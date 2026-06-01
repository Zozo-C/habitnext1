/**
 * 吉祥物資源管理 Hook
 *
 * 用途: 統一管理和調用 /public/mascots/ 資料夾中的吉祥物素材
 * 使用方式:
 *   - 在任何組件中 import { useMascot } from '@/hooks/useMascot'
 *   - 取得吉祥物路徑: const cocoPath = useMascot('coco_q_celebrate')
 *   - 或取得完整配置: const mascots = useMascot()
 */

const MASCOT_CONFIG = {
  // 基礎路徑
  basePath: '/mascots',

  // 吉祥物素材清單
  assets: {
    // coco_q_r - 原始版本（微笑）
    coco_q_r: {
      file: 'coco_q_r.svg',
      type: 'svg',
      name: 'Coco Q R',
      description: '原始微笑的Coco',
    },

    // coco_q_celebrate - 慶祝版本
    coco_q_celebrate: {
      file: 'coco_q_celebrate.svg',
      type: 'svg',
      name: 'Coco Q Celebrate',
      description: '慶祝的Coco',
    },

    // coco_q_smile - 微笑版本
    coco_q_smile: {
      file: 'mascot.png',
      type: 'image',
      name: 'Coco Q Smile',
      description: '微笑的Coco',
    },

    // 可在此新增其他變體
    // coco_q_happy: { ... }
    // coco_q_surprise: { ... }
  },
};

/**
 * 取得吉祥物路徑或配置
 * @param {string} [assetKey] - 吉祥物鑰匙 (e.g., 'coco_q_celebrate')
 * @returns {string|object} - 如果指定 assetKey 則返回路徑，否則返回所有配置
 */
export function useMascot(assetKey = null) {
  if (assetKey) {
    const asset = MASCOT_CONFIG.assets[assetKey];
    if (!asset) {
      console.warn(`[useMascot] 吉祥物 "${assetKey}" 未找到`);
      return null;
    }
    return `${MASCOT_CONFIG.basePath}/${asset.file}`;
  }

  // 返回所有吉祥物配置
  return MASCOT_CONFIG;
}

/**
 * 取得吉祥物的完整配置信息
 * @param {string} assetKey - 吉祥物鑰匙
 * @returns {object|null} - 吉祥物配置或 null
 */
export function getMascotConfig(assetKey) {
  return MASCOT_CONFIG.assets[assetKey] || null;
}

/**
 * 取得所有可用的吉祥物鑰匙
 * @returns {string[]} - 吉祥物鑰匙陣列
 */
export function getMascotKeys() {
  return Object.keys(MASCOT_CONFIG.assets);
}

export default MASCOT_CONFIG;
