
export const USERNAME_MIN = 3;
export const USERNAME_MAX = 24;
export const USERNAME_REGEX = /^[a-z0-9_]+$/;

export const USERNAME_MSG = {
  min: "Username must be at least 3 characters",
  max: "Username must be at most 24 characters",
  pattern: "Username may only contain lowercase letters, numbers, and underscores",
};

export const NICKNAME_MIN = 2;
export const NICKNAME_MAX = 32;
export const NICKNAME_REGEX = /^[a-zA-Z0-9 _.-]+$/;

export const NICKNAME_MSG = {
  min: "Nickname must be at least 2 characters",
  max: "Nickname must be at most 32 characters",
  pattern: "Nickname contains invalid characters",
};

export const BIO_MAX = 100;
export const BIO_MSG = {
  max: "Bio must be 100 characters or less",
};

export const INTERESTS_MAX = 10;

export const INTERESTS_MSG = {
  max: "You can select up to 10 interests",
};

export const STREAK_MIN = 1;
export const STREAK_MAX = 10000;

export const STREAK_MSG = {
  min: "Streak must be at least 1",
  max: "Streak cannot exceed 10,000",
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
  max: "Booster points cannot exceed 100",
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
  min: "Ban duration must be at least 1 day",
  max: "Ban duration cannot exceed 10 years",
};

export const AVATAR_MSG = {
  url: "Avatar must be a valid URL",
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

