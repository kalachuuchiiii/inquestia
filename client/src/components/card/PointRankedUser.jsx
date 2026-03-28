import { motion } from "framer-motion";
import { GiAtomicSlashes } from "react-icons/gi";
import UserHeader from "../UserIcon.jsx";

const PointRanked = ({ user = {}, sort = "current" }) => {
  const cores = user?.core?.[sort] ?? 0;
  const rank = user?.rank ?? "-";

  // Rank-based glow colors
 const rankColors = {
 1: `
  from-blue-300 via-cyan-200 to-blue-500 
  text-blue-600 
  shadow-[0_0_15px_rgba(100,180,255,0.5)]
  bg-gradient-to-tr
  dark:from-black dark:via-zinc-900 dark:to-black
  dark:text-violet-300
  dark:shadow-[0_0_20px_rgba(130,80,255,0.6)]
`,

  2: `
    from-gray-200 via-slate-100 to-gray-400 
    text-gray-800 
    shadow-[0_0_12px_rgba(180,180,180,0.4)]
    bg-gradient-to-tr
    dark:from-blue-900 dark:via-indigo-950 dark:to-blue-950
    dark:text-blue-300
    dark:shadow-[0_0_20px_rgba(100,180,255,0.6)]
  `,
  3: `
    from-amber-300 via-orange-200 to-amber-500 
    text-amber-900 
    shadow-[0_0_12px_rgba(255,200,100,0.4)]
    bg-gradient-to-tr
    dark:from-pink-900 dark:via-fuchsia-950 dark:to-rose-950
    dark:text-pink-300
    dark:shadow-[0_0_20px_rgba(255,100,180,0.5)]
  `,
};

  const glow =
    rankColors[rank] ||
    "from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-700";

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotateX: 2 }}
      transition={{ duration: 0.25 }}
      className={`relative rounded-2xl p-[2px] 
                  bg-gradient-to-r ${glow} 
                  hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]
                  backdrop-blur-md transition-transform`}
    >
      {/* Inner Glass Container */}
      <UserHeader user = {user}>
        <div className="rounded-2xl bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md p-3 grid grid-cols-10 items-center">
        {/* Rank Number */}
        <div className="col-span-1 flex justify-center">
          <p
            className={`text-lg`}
          >
            {rank}
          </p>
        </div>

        {/* User Info */}
        <div className="flex col-span-7 shrink-0 items-center gap-3">
          <div><UserHeader.Avatar size="10" /></div>
          <div className="flex flex-col truncate leading-tight">
            <UserHeader.Nickname badgeSize = '2xl' className="font-semibold text-zinc-800 dark:text-zinc-100" />
            <UserHeader.Username
              showAt
              className="text-xs text-zinc-500 dark:text-zinc-400"
            />
          </div>
        </div>

        {/* Cores / Points */}
        <div className="col-span-2 text-right">
          <p className="font-semibold flex gap-2 items-center justify-end  drop-shadow-[0_0_8px_rgba(255,225,100,0.5)]">
            <GiAtomicSlashes className="text-xl animate-pulse-slow" /> {cores}
          </p>
        </div>
      </div>

        </UserHeader>
      {/* Optional hologram shimmer overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-80 pointer-events-none rounded-2xl"
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 100%",
        }}
      />
    </motion.div>
  );
};

export default PointRanked;
