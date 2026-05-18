import { memo } from "react";
import { motion } from "framer-motion";
import millify from "millify";
import type { User } from "@inquestia/schemas";
import { UserBadge } from "@/components/ui/UserBadge";

const UserDashboard = memo(({ user }: { user: User }) => {
  const highestStreak = user.streak?.highest ?? 0;
  const currentStreak = user.streak?.current ?? 0;
  const currentCores = user.core?.current ?? 0;

  return (
    <div className="flex py-6 lg:flex-row flex-col items-start lg:items-center gap-8">
      <UserBadge user={user}>
        <UserBadge.Avatar className="size-46  " />
      </UserBadge>
      <motion.div
        className="w-full flex flex-col  rounded-2xl "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex lg:flex-row flex-col mb-6 lg:mb-0 items-start  lg:gap-6 ">
          <header className="flex my-2 flex-col">
            <p className="text-2xl leading-4 font-semibold tracking-tighter">
              {user.nickname || user.username}
            </p>
            <p className="opacity-75 text-lg">{user.username}</p>
          </header>
          <UserBadge user={user}>
            <UserBadge.Badge />
          </UserBadge>
        </div>

        <div className="grid grid-cols-1  sm:grid-cols-2 gap-5">
          <motion.div whileHover={{ scale: 1.03 }}>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 relative z-10">
              Highest Streak
            </p>
            <h1
              className="text-3xl flex items-center gap-2 font-bold text-red-600 dark:text-red-400 
                 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)] relative z-10"
            >
              <img src="/streak.gif" className="lg:size-8" /> {highestStreak}{" "}
              day
              {highestStreak !== 1 ? "s" : ""}
            </h1>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 relative z-10">
              Current Streak
            </p>
            <p className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 relative z-10">
              {currentStreak} day{currentStreak !== 1 ? "s" : ""}
            </p>
          </motion.div>

          {/* Cores Section (Pink Glow Theme) */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="flex items-start lg:items-center lg:justify-start flex-col h-full">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 relative z-10">
                Core Points
              </p>
              <h1
                className="text-5xl  flex items-center gap-2 font-bold text-pink-500 dark:text-fuchsia-400 
                 drop-shadow-[0_0_6px_rgba(255,105,180,0.6)] relative z-10"
              >
                <img src="/point.gif" className="lg:size-12" />{" "}
                {millify(currentCores)}
              </h1>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

export default UserDashboard;
