export const USERNAME_MIN = 6;
export const USERNAME_MAX = 24;
export const USERNAME_REGEX = /^[a-z0-9_]+$/; //A username can only contain lowercase letters, numbers, and underscores. No spaces, no symbols, no uppercase.

export const BIO_MAX = 250;
export const NICKNAME_MIN = 2;
export const NICKNAME_MAX = 32;
export const NICKNAME_REGEX = /^[a-zA-Z0-9 _.-]+$/; //Only letters, numbers, spaces, underscores, dots, and hyphens are allowed

export const INTERESTS_MAX = 10;
export const INTERESTS_MIN = 1;

export const STREAK_MIN = 1;

export const CORE_MIN = 0;
export const CORE_MAX = 999999999;

export const LINKS_MAX = 6;
export const LINK_MIN = 6;
export const LINK_MAX = 46;

export const BAN_MIN_DAYS = 1;
export const BAN_MAX_DAYS = 3650;

const MAX_MB = 20;
export const AVATAR_MAX_SIZE = MAX_MB * 1024 * 1024;

export const USER_BOOSTER_MIN = 0;
export const USER_BOOSTER_MAX = 500;
export const BOOST_COST = 10000;

export const INTEREST_ENUM = [
  "adventure",
  "animals",
  "art",
  "architecture",
  "artificial intelligence",
  "astronomy",
  "board games",
  "blockchain",
  "card games",
  "cars",
  "cinema",
  "climate change",
  "cooking",
  "culture",
  "cybersecurity",
  "data science",
  "dance",
  "debate",
  "design",
  "drawing",
  "education",
  "environment",
  "e-sports",
  "engineering",
  "entrepreneurship",
  "fashion",
  "finance",
  "food",
  "gaming",
  "gardening",
  "health",
  "history",
  "law",
  "literature",
  "machine learning",
  "marketing",
  "mathematics",
  "meditation",
  "mobile development",
  "mindfulness",
  "mythology",
  "music",
  "nature",
  "ocean",
  "parenting",
  "photography",
  "photography editing",
  "personal",
  "philosophy",
  "podcasting",
  "politics",
  "programming",
  "psychology",
  "relationships",
  "robotics",
  "self-improvement",
  "space exploration",
  "sports",
  "startups",
  "sustainability",
  "technology",
  "theater",
  "travel",
  "travel blogging",
  "vlogging",
  "volunteering",
  "web development",
  "wine",
  "writing",
  "yoga",
  "tea",
  "coffee",
  "DIY",
  "comedy",
  "painting",
  "sculpture",
  "motorcycles",
] as const;

export type Interest = (typeof INTEREST_ENUM)[number];

export type Badge = {
  badge: string;
  pointsRequired: number;
  style: string;
};
export const USER_BADGES: Badge[] = [
  {
    badge: "Newbie",
    pointsRequired: 0,
    style:
      "text-zinc-500 dark:text-zinc-500 px-3.5 py-1 rounded-full font-medium",
  },
  {
    badge: "Survey Starter",
    pointsRequired: 12000,
    style:
      "text-blue-400 dark:text-blue-400 px-3.5 py-1 rounded-full font-medium bg-blue-400/5 [text-shadow:0_0_8px_rgba(96,165,250,0.25)]",
  },
  {
    badge: "Curious Mind",
    pointsRequired: 24000,
    style:
      "text-sky-400 dark:text-sky-400 px-3.5 py-1 rounded-full font-medium bg-sky-400/5 [text-shadow:0_0_10px_rgba(56,189,248,0.28)]",
  },
  {
    badge: "Feedback Giver",
    pointsRequired: 36000,
    style:
      "text-teal-400 dark:text-teal-400 px-3.5 py-1 rounded-full font-medium bg-teal-400/5 [text-shadow:0_0_10px_rgba(45,212,191,0.28)]",
  },
  {
    badge: "Insight Seeker",
    pointsRequired: 48000,
    style:
      "text-emerald-400 dark:text-emerald-400 px-3.5 py-1 rounded-full font-medium bg-emerald-400/5 [text-shadow:0_0_12px_rgba(52,211,153,0.30)]",
  },
  // === Intermediate Tier — light glow begins ===
  {
    badge: "Active Participant",
    pointsRequired: 60000,
    style:
      "text-lime-400 dark:text-lime-400 px-3.5 py-1 rounded-full font-semibold bg-lime-400/5 [text-shadow:0_0_12px_rgba(163,230,53,0.30)]",
  },
  {
    badge: "Survey Enthusiast",
    pointsRequired: 72000,
    style:
      "text-green-400 dark:text-green-400 px-3.5 py-1 rounded-full font-semibold bg-green-400/5 [text-shadow:0_0_12px_rgba(74,222,128,0.30)]",
  },
  {
    badge: "Opinion Collector",
    pointsRequired: 84000,
    style:
      "text-amber-400 dark:text-amber-400 px-3.5 py-1 rounded-full font-semibold bg-amber-400/5 [text-shadow:0_0_12px_rgba(251,191,36,0.30)]",
  },
  {
    badge: "Community Helper",
    pointsRequired: 96000,
    style:
      "text-orange-400 dark:text-orange-400 px-3.5 py-1 rounded-full font-semibold bg-orange-400/5 [text-shadow:0_0_14px_rgba(251,146,60,0.32)]",
  },
  {
    badge: "Rising Voice",
    pointsRequired: 108000,
    style:
      "text-red-400 dark:text-red-400 px-3.5 py-1 rounded-full font-semibold bg-red-400/5 [text-shadow:0_0_14px_rgba(248,113,113,0.32)]",
  },
  // === Advanced Tier — glow strengthens ===
  {
    badge: "Idea Contributor",
    pointsRequired: 120000,
    style:
      "text-pink-400 dark:text-pink-400 px-3.5 py-1 rounded-full font-semibold bg-pink-400/5 [text-shadow:0_0_14px_rgba(244,114,182,0.33)]",
  },
  {
    badge: "Survey Explorer",
    pointsRequired: 132000,
    style:
      "text-fuchsia-400 dark:text-fuchsia-400 px-3.5 py-1 rounded-full font-semibold bg-fuchsia-400/5 [text-shadow:0_0_16px_rgba(232,121,249,0.35)]",
  },
  {
    badge: "Insight Hunter",
    pointsRequired: 144000,
    style:
      "text-purple-400 dark:text-purple-400 px-3.5 py-1 rounded-full font-bold bg-purple-400/[0.07] [text-shadow:0_0_16px_rgba(192,132,252,0.35)]",
  },
  {
    badge: "Engaged Participant",
    pointsRequired: 156000,
    style:
      "text-violet-400 dark:text-violet-400 px-3.5 py-1 rounded-full font-bold bg-violet-400/[0.07] [text-shadow:0_0_18px_rgba(167,139,250,0.38)]",
  },
  {
    badge: "Data Enthusiast",
    pointsRequired: 168000,
    style:
      "text-indigo-400 dark:text-indigo-400 px-3.5 py-1 rounded-full font-bold bg-indigo-400/[0.07] [text-shadow:0_0_18px_rgba(129,140,248,0.38)]",
  },
  // === Elite Tier — dual-layer glow ===
  {
    badge: "Community Builder",
    pointsRequired: 180000,
    style:
      "text-blue-300 dark:text-blue-300 px-3.5 py-1 rounded-full font-bold bg-indigo-500/[0.09] [text-shadow:0_0_18px_rgba(99,102,241,0.45),0_0_30px_rgba(99,102,241,0.20)]",
  },
  {
    badge: "Feedback Leader",
    pointsRequired: 192000,
    style:
      "text-cyan-300 dark:text-cyan-300 px-3.5 py-1 rounded-full font-bold bg-cyan-500/[0.09] [text-shadow:0_0_20px_rgba(6,182,212,0.45),0_0_34px_rgba(6,182,212,0.20)]",
  },
  {
    badge: "Survey Strategist",
    pointsRequired: 204000,
    style:
      "text-emerald-300 dark:text-emerald-300 px-3.5 py-1 rounded-full font-bold bg-emerald-500/[0.09] [text-shadow:0_0_20px_rgba(16,185,129,0.45),0_0_34px_rgba(16,185,129,0.20)]",
  },
  {
    badge: "Opinion Leader",
    pointsRequired: 216000,
    style:
      "text-yellow-300 dark:text-yellow-300 px-3.5 py-1 rounded-full font-bold bg-amber-500/[0.08] [text-shadow:0_0_20px_rgba(245,158,11,0.45),0_0_34px_rgba(245,158,11,0.20)]",
  },
  {
    badge: "Survey Mentor",
    pointsRequired: 228000,
    style:
      "text-rose-300 dark:text-rose-300 px-3.5 py-1 rounded-full font-bold bg-rose-500/[0.08] [text-shadow:0_0_20px_rgba(239,68,68,0.42),0_0_34px_rgba(239,68,68,0.18)]",
  },
  // === Master Tier — three-layer glow ===
  {
    badge: "Insight Master",
    pointsRequired: 240000,
    style:
      "text-purple-300 dark:text-purple-300 px-4 py-1 rounded-full font-bold bg-purple-500/[0.10] [text-shadow:0_0_22px_rgba(168,85,247,0.55),0_0_40px_rgba(168,85,247,0.25)]",
  },
  {
    badge: "Community Expert",
    pointsRequired: 252000,
    style:
      "text-violet-300 dark:text-violet-300 px-4 py-1 rounded-full font-bold bg-violet-500/[0.10] [text-shadow:0_0_22px_rgba(139,92,246,0.55),0_0_40px_rgba(139,92,246,0.25)]",
  },
  {
    badge: "Survey Visionary",
    pointsRequired: 264000,
    style:
      "text-indigo-200 dark:text-indigo-200 px-4 py-1 rounded-full font-bold bg-indigo-500/[0.10] [text-shadow:0_0_24px_rgba(99,102,241,0.55),0_0_44px_rgba(99,102,241,0.28)]",
  },
  {
    badge: "Insight Innovator",
    pointsRequired: 276000,
    style:
      "text-sky-200 dark:text-sky-200 px-4 py-1 rounded-full font-bold bg-sky-500/[0.10] [text-shadow:0_0_24px_rgba(14,165,233,0.55),0_0_44px_rgba(14,165,233,0.28)]",
  },
  // === Legendary Tier — deep ambient glow ===
  {
    badge: "Community Legend",
    pointsRequired: 288000,
    style:
      "text-indigo-200 dark:text-indigo-200 px-4 py-1 rounded-full font-extrabold bg-indigo-500/[0.12] [text-shadow:0_0_26px_rgba(99,102,241,0.65),0_0_50px_rgba(99,102,241,0.30),0_0_80px_rgba(99,102,241,0.15)]",
  },
  {
    badge: "Survey Titan",
    pointsRequired: 300000,
    style:
      "text-fuchsia-200 dark:text-fuchsia-200 px-4 py-1 rounded-full font-extrabold bg-fuchsia-500/[0.11] [text-shadow:0_0_28px_rgba(217,70,239,0.65),0_0_52px_rgba(217,70,239,0.30),0_0_80px_rgba(217,70,239,0.15)]",
  },
  {
    badge: "Insight Titan",
    pointsRequired: 315000,
    style:
      "text-violet-200 dark:text-violet-200 px-4 py-1 rounded-full font-extrabold bg-violet-500/[0.12] [text-shadow:0_0_28px_rgba(139,92,246,0.68),0_0_54px_rgba(139,92,246,0.32),0_0_90px_rgba(139,92,246,0.18)]",
  },
  {
    badge: "Community Godfather",
    pointsRequired: 330000,
    style:
      "text-fuchsia-100  dark:text-fuchsia-100 px-4 py-1 rounded-full font-extrabold bg-fuchsia-600/90 [text-shadow:0_0_30px_rgba(192,38,211,0.70),0_0_58px_rgba(192,38,211,0.35),0_0_100px_rgba(192,38,211,0.20)]",
  },
  {
    badge: "Research Deity",
    pointsRequired: 340000,
    style:
      "bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent px-4 py-1 rounded-full font-extrabold drop-shadow-[0_0_10px_rgba(192,38,211,0.60)] drop-shadow-[0_0_22px_rgba(139,92,246,0.35)]",
  },
  {
    badge: "Survey Immortal",
    pointsRequired: 350000,
    style:
      "text-violet-300 dark:text-violet-300 px-4 py-1 rounded-full font-extrabold bg-violet-500/[0.09] [text-shadow:0_0_12px_rgba(167,139,250,1),0_0_24px_rgba(167,139,250,0.80),0_0_48px_rgba(167,139,250,0.40),0_0_80px_rgba(139,92,246,0.20)] drop-shadow-[0_0_6px_rgba(167,139,250,0.50)]",
  },
] as const;
