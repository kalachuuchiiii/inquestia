export const surveys = [
  {
    title: "Social Media Habits",
    description: "Understanding how teens use social media daily.",
    questions: [
      {
        question: "How many hours a day do you spend on social media?",
        option: "text",
        choices: [],
        id: "survey001_q1",
        required: Math.random() > 0.5
      },
      {
        question: "Which platform do you use the most?",
        id: "survey001_q2",
        option: "custom",
        choices: [
          { label: "Facebook", value: "facebook" },
          { label: "Instagram", value: "instagram" },
          { label: "TikTok", value: "tiktok" },
          { label: "YouTube", value: "youtube" },
          { label: "Twitter", value: "twitter" }
        ],
        required: Math.random() > 0.5
      }
    ],
    targetRespondents: 100,
    totalRespondents: 63,
    user: {
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      username: "socialguru12"
    },
    createdAt: "2025-07-06T14:23:00.000Z",
    _id: "survey001",
    topics: ["mediaandcommunication", "technology"]
  },
  {
    title: "Gaming Preferences",
    description: "Exploring gaming habits and favorite genres.",
    questions: [
      {
        question: "What genre of games do you play the most?",
        option: "custom",
        choices: [
          { label: "Action", value: "action" },
          { label: "RPG", value: "rpg" },
          { label: "Puzzle", value: "puzzle" },
          { label: "Shooter", value: "shooter" },
          { label: "Strategy", value: "strategy" }
        ],
        id: "survey002_q1",
        required: Math.random() > 0.5
      },
      {
        question: "Do you prefer single-player or multiplayer games?",
        option: "custom",
        choices: [
          { label: "Single-player", value: "single-player" },
          { label: "Multiplayer", value: "multiplayer" }
        ],
        id: "survey002_q2",
        required: Math.random() > 0.5
      }
    ],
    targetRespondents: 75,
    totalRespondents: 48,
    user: {
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      username: "gamerchic21"
    },
    createdAt: "2025-07-02T09:15:00.000Z",
    _id: "survey002",
    topics: ["technology"]
  },
  {
    title: "Study Methods",
    description: "Which study techniques work best for students?",
    questions: [
      {
        question: "Do you prefer group or solo studying?",
        option: "custom",
        choices: [
          { label: "Group", value: "group" },
          { label: "Solo", value: "solo" }
        ],
        id: "survey003_q1",
        required: Math.random() > 0.5
      },
      {
        question: "How often do you use flashcards or practice quizzes?",
        option: "custom",
        choices: [
          { label: "Always", value: "always" },
          { label: "Sometimes", value: "sometimes" },
          { label: "Rarely", value: "rarely" },
          { label: "Never", value: "never" }
        ],
        id: "survey003_q2",
        required: Math.random() > 0.5
      }
    ],
    targetRespondents: 200,
    totalRespondents: 172,
    user: {
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      username: "studybro"
    },
    createdAt: "2025-07-30T17:45:00.000Z",
    _id: "survey003",
    topics: ["education"]
  }
];