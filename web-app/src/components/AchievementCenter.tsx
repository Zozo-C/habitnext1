'use client';

import { motion } from 'framer-motion';
import { achievementsData, achievementLabels } from '@/data/mockData';

interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  requirement: number;
}

interface AchievementCenterProps {
  onClose?: () => void;
}

export default function AchievementCenter({ onClose }: AchievementCenterProps) {
  const unlockedCount = achievementsData.filter(a => a.unlocked).length;
  const totalCount = achievementsData.length;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 p-4 md:p-6"
    >
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              🏆 成就中心
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              已解鎖 <span className="font-semibold text-[#169E6B]">{unlockedCount}</span> / {totalCount} 個成就
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="hidden md:block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="關閉"
            >
              ✕
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-[#169E6B] to-[#128E5F] rounded-full"
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {achievementsData.map((achievement: Achievement) => (
          <motion.div
            key={achievement.id}
            variants={itemVariants}
            className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
              achievement.unlocked
                ? 'bg-white border-[#169E6B]/20 shadow-sm hover:shadow-md hover:border-[#169E6B]/40'
                : 'bg-gray-50 border-gray-200 opacity-75'
            }`}
          >
            {/* Achievement Card Content */}
            <div className="flex gap-4">
              {/* Emoji Badge */}
              <motion.div
                animate={achievement.unlocked ? { scale: 1 } : { opacity: 0.6 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold transition-colors duration-300 ${
                  achievement.unlocked
                    ? 'shadow-md'
                    : 'bg-gray-200'
                }`}
                style={achievement.unlocked ? { backgroundColor: `${achievement.color}20` } : {}}
              >
                {achievement.emoji}
              </motion.div>

              {/* Info Section */}
              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">
                    {achievement.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                    {achievement.description}
                  </p>
                </div>

                {/* Progress or Status */}
                {achievement.unlocked ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#169E6B]/10 text-[#169E6B]">
                      ✓ {achievementLabels.unlocked}
                    </span>
                    {achievement.unlockedDate && (
                      <span className="text-xs text-gray-500">
                        {achievementLabels.unlockedDate} {achievement.unlockedDate}
                      </span>
                    )}
                  </motion.div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 font-medium">
                        {achievementLabels.progress}: {achievement.progress}/{achievement.requirement}
                      </span>
                      <span className="text-gray-500">
                        {Math.round((achievement.progress / achievement.requirement) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(achievement.progress / achievement.requirement) * 100}%` }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="h-full rounded-full transition-all duration-300"
                        style={{ backgroundColor: achievement.color }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State would go here if no achievements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-6 bg-gradient-to-r from-[#169E6B]/5 to-[#128E5F]/5 rounded-2xl border border-[#169E6B]/10 text-center"
      >
        <p className="text-sm text-gray-600">
          繼續完成任務，解鎖更多成就吧！💪
        </p>
      </motion.div>
    </motion.div>
  );
}
