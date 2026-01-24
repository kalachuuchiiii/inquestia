import { UserBadge } from "src/types";

export const USERNAME_MIN = 6;
export const USERNAME_MAX = 24;
export const USERNAME_REGEX = /^[a-z0-9_]+$/;

export const USERNAME_MSG = {
  min: `Username must be at least ${USERNAME_MIN} characters.`,
  max: `Username must be at most ${USERNAME_MAX} characters.`,
  pattern: "Username may only contain lowercase letters, numbers, and underscores",
};

export const NICKNAME_MIN = 2;
export const NICKNAME_MAX = 32;
export const NICKNAME_REGEX = /^[a-zA-Z0-9 _.-]+$/;

export const NICKNAME_MSG = {
  min: `Nickname must be at least ${NICKNAME_MIN} characters.`,
  max: `Nickname must be at most ${NICKNAME_MAX} characters`,
  pattern: "Nickname contains invalid characters",
};

export const BIO_MAX = 100;
export const BIO_MSG = {
  max: `Bio must be ${BIO_MAX} characters or less`,
}

export const INTERESTS_MAX = 10;
export const INTERESTS_MIN = 1;
export const INTERESTS_MSG = {
  range: `You can only have ${INTERESTS_MIN}-${INTERESTS_MAX} interests.`,
  invalid: 'Invalid Interest.'
};

export const STREAK_MIN = 1;

export const STREAK_MSG = {
  min: `Streak must be at least ${STREAK_MIN}`
};

export const CORE_MIN = 0;
export const CORE_MAX = 100000;

export const CORE_MSG = {
  min: "Core cannot be negative",
  max: "Core is too large",
};

export const BOOSTER_MIN = 0;
export const BOOSTER_MAX = 100;

export const BOOSTER_MSG = {
  min: "Booster points cannot be negative",
  max: `Booster points cannot exceed ${BOOSTER_MAX}`,
};

export const LINKS_MAX = 6;
export const LINK_MIN = 6;
export const LINK_MAX = 46;
export const LINK_MSG = {
  min: "Link is too short",
  max: "Link is too long",
  invalid: "Invalid URL format",
};

export const BAN_MIN_DAYS = 1;
export const BAN_MAX_DAYS = 3650;

export const BAN_MSG = {
  min: `Ban duration must be at least ${BAN_MIN_DAYS} day`,
  max: `Ban duration cannot exceed ${BAN_MAX_DAYS} years`,
};



const MAX_MB = 20;
export const AVATAR_MAX_SIZE = MAX_MB * 1024 * 1024;


export const AVATAR_MSG = {
  url: "Avatar must be a valid URL",
  size: `File too large. Max (${MAX_MB}MB)`,
  type: 'File type must be an image.'
};


export const AVATAR_PUBLIC_ID_MSG = {
  min: "Avatar public id is too short",
  max: "Avatar public id is too long",
};
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

  "motorcycles"
] as const;




export const USER_BADGES: UserBadge[] = [
  { badge: "Newbie", pointsRequired: 0, style: "text-gray-500 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-lg" },
  { badge: "Survey Starter", pointsRequired: 12000, style: "text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-2 py-1 rounded-lg" },
  { badge: "Curious Mind", pointsRequired: 24000, style: "text-sky-600 bg-sky-50 dark:bg-sky-900/40 px-2 py-1 rounded-lg" },
  { badge: "Feedback Giver", pointsRequired: 36000, style: "text-teal-600 bg-teal-50 dark:bg-teal-900/40 px-2 py-1 rounded-lg" },
  { badge: "Insight Seeker", pointsRequired: 48000, style: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-1 rounded-lg" },
  { badge: "Active Participant", pointsRequired: 60000, style: "text-lime-600 bg-lime-50 dark:bg-lime-900/40 px-2 py-1 rounded-lg" },
  { badge: "Survey Enthusiast", pointsRequired: 72000, style: "text-green-600 bg-green-50 dark:bg-green-900/40 px-2 py-1 rounded-lg" },
  { badge: "Opinion Collector", pointsRequired: 84000, style: "text-amber-600 bg-amber-50 dark:bg-amber-900/40 px-2 py-1 rounded-lg" },
  { badge: "Community Helper", pointsRequired: 96000, style: "text-orange-600 bg-orange-50 dark:bg-orange-900/40 px-2 py-1 rounded-lg" },
  { badge: "Rising Voice", pointsRequired: 108000, style: "text-rose-600 bg-rose-50 dark:bg-rose-900/40 px-2 py-1 rounded-lg" },
  { badge: "Idea Contributor", pointsRequired: 120000, style: "text-pink-600 bg-pink-50 dark:bg-pink-900/40 px-2 py-1 rounded-lg" },
  { badge: "Survey Explorer", pointsRequired: 132000, style: "text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-900/40 px-2 py-1 rounded-lg" },
  { badge: "Insight Hunter", pointsRequired: 144000, style: "text-purple-600 bg-purple-50 dark:bg-purple-900/40 px-2 py-1 rounded-lg" },
  { badge: "Engaged Participant", pointsRequired: 156000, style: "text-violet-600 bg-violet-50 dark:bg-violet-900/40 px-2 py-1 rounded-lg" },
  { badge: "Data Enthusiast", pointsRequired: 168000, style: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-1 rounded-lg" },
  { badge: "Community Builder", pointsRequired: 180000, style: "text-blue-700 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-950/40 px-2 py-1 rounded-lg" },
  { badge: "Feedback Leader", pointsRequired: 192000, style: "text-cyan-600 bg-gradient-to-r from-cyan-50 to-sky-100 dark:from-cyan-900/40 dark:to-sky-950/40 px-2 py-1 rounded-lg" },
  { badge: "Survey Strategist", pointsRequired: 204000, style: "text-emerald-700 bg-gradient-to-r from-emerald-50 to-lime-100 dark:from-emerald-900/40 dark:to-lime-950/40 px-2 py-1 rounded-lg" },
  { badge: "Opinion Leader", pointsRequired: 216000, style: "text-amber-700 bg-gradient-to-r from-amber-50 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-950/40 px-2 py-1 rounded-lg" },
  { badge: "Survey Mentor", pointsRequired: 228000, style: "text-rose-700 bg-gradient-to-r from-rose-50 to-pink-100 dark:from-rose-900/40 dark:to-pink-950/40 px-2 py-1 rounded-lg" },
  { badge: "Insight Master", pointsRequired: 240000, style: "text-fuchsia-700 bg-gradient-to-r from-fuchsia-50 to-purple-100 dark:from-fuchsia-900/40 dark:to-purple-950/40 px-2 py-1 rounded-lg shadow-[0_0_10px_rgba(200,100,255,0.3)]" },
  { badge: "Community Expert", pointsRequired: 252000, style: "text-purple-700 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-950/40 px-2 py-1 rounded-lg shadow-[0_0_10px_rgba(180,120,255,0.4)]" },
  { badge: "Survey Visionary", pointsRequired: 264000, style: "text-violet-700 bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/40 dark:to-indigo-950/40 px-2 py-1 rounded-lg shadow-[0_0_12px_rgba(160,130,255,0.45)]" },
  { badge: "Insight Innovator", pointsRequired: 276000, style: "text-indigo-700 bg-gradient-to-r from-indigo-100 to-sky-100 dark:from-indigo-900/40 dark:to-sky-950/40 px-2 py-1 rounded-lg shadow-[0_0_14px_rgba(140,150,255,0.5)]" },
  { badge: "Community Legend", pointsRequired: 288000, style: "text-sky-700 bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/40 dark:to-blue-950/40 px-2 py-1 rounded-lg shadow-[0_0_15px_rgba(130,180,255,0.55)]" },
  { badge: "Survey Titan", pointsRequired: 300000, style: "text-blue-700 bg-gradient-to-r from-blue-100 to-fuchsia-100 dark:from-blue-900/40 dark:to-fuchsia-950/40 px-2 py-1 rounded-lg shadow-[0_0_16px_rgba(150,100,255,0.6)]" },
  { badge: "Insight Titan", pointsRequired: 315000, style: "text-violet-700 bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-900/40 dark:to-fuchsia-950/40 px-2 py-1 rounded-lg shadow-[0_0_18px_rgba(170,90,255,0.65)]" },
  { badge: "Community Godfather", pointsRequired: 330000, style: "text-fuchsia-600 bg-gradient-to-r from-fuchsia-100 to-pink-100 dark:from-fuchsia-900/40 dark:to-pink-950/40 px-2 py-1 rounded-lg shadow-[0_0_20px_rgba(190,70,255,0.7)] animate-pulse" },
  { badge: "Research Deity", pointsRequired: 340000, style: "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-violet-400 to-blue-400 font-bold shadow-[0_0_20px_rgba(150,90,255,0.8)] animate-pulse drop-shadow-lg" },
    { badge: "Survey Immortal", pointsRequired: 350000, style: "text-violet-500 bbh-sans-bartle-regular rounded-xl dark:text-violet-300 dark:shadow-[0_0_15px_rgba(130,80,255,0.45)] shadow-[0_0_15px_rgba(167,139,250,0.6)] backdrop-brightness-200 animate-pulse px-2" },
] as const;

