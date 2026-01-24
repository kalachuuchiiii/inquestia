import { memo } from "react";
import { IoStatsChartOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { GiAtomicSlashes } from "react-icons/gi";
import { FaFire } from "react-icons/fa";
import type { UserDTO } from "@shared/types";

const UserDashboard = memo(({ user }: { user: UserDTO }) => {
  const highestStreak = user.streak.highest;
  const currentStreak = user.streak.current;
  const currentCores = user.core.current;

  return (
    <motion.div
      className="w-full flex flex-col rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <IoStatsChartOutline size={22} className="text-blue-600" />
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          Stats Overview
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Streak Section */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative p-5 rounded-xl border border-violet-200 dark:border-violet-800 
             shadow-[0_0_12px_rgba(168,85,247,0.25)] dark:shadow-[0_0_15px_rgba(139,92,246,0.25)] 
             bg-gradient-to-r from-violet-50 to-purple-100 dark:from-violet-950 dark:to-purple-950 
             transition overflow-hidden"
        >
          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-300/10 to-transparent blur-xl pointer-events-none" />

          <p className="text-sm text-zinc-600 dark:text-zinc-400 relative z-10">
            Highest Streak
          </p>
          <h1
            className="text-3xl flex items-center gap-2 font-bold text-violet-600 dark:text-violet-400 
                 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)] relative z-10"
          >
            <FaFire /> {highestStreak} day{highestStreak !== 1 ? "s" : ""}
          </h1>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 relative z-10">
            Current Streak
          </p>
          <p className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 relative z-10">
            {currentStreak} day{currentStreak !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Cores Section (Pink Glow Theme) */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative p-5 rounded-xl border border-pink-200 dark:border-pink-700 
             shadow-[0_0_12px_rgba(255,182,193,0.25)] dark:shadow-[0_0_15px_rgba(255,105,180,0.3)] 
             bg-gradient-to-r from-pink-50 to-rose-100 dark:from-pink-950 dark:to-fuchsia-950 
             transition overflow-hidden"
        >
          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0  bg-gradient-to-br from-pink-300/10 to-transparent blur-xl pointer-events-none" />

          <div className="flex items-start md:items-center justify-center flex-col h-full">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 relative z-10">
              Core Points
            </p>
            <h1
              className="text-5xl  flex items-center gap-2 font-bold text-pink-500 dark:text-fuchsia-400 
                 drop-shadow-[0_0_6px_rgba(255,105,180,0.6)] relative z-10"
            >
              <GiAtomicSlashes /> {currentCores}
            </h1>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default UserDashboard;
