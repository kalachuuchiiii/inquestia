export const questions = [
  {
    _id: "q001",
    surveyId: "survey001",
    question: "How many hours a day do you spend on social media?",
    option: "text",
    choices: { allowMultipleChoice: false, list: [] },
    required: true
  },
  {
    _id: "q002",
    surveyId: "survey001",
    question: "Which platform do you use the most?",
    option: "custom",
    choices: {
      allowMultipleChoice: false,
      list: [
        { label: "Facebook", value: "facebook" },
        { label: "Instagram", value: "instagram" },
        { label: "TikTok", value: "tiktok" },
        { label: "YouTube", value: "youtube" },
        { label: "Twitter", value: "twitter" }
      ]
    },
    required: true
  },
  {
    _id: "q003",
    surveyId: "survey002",
    question: "What genre of games do you play the most?",
    option: "custom",
    choices: {
      allowMultipleChoice: true,
      list: [
        { label: "Action", value: "action" },
        { label: "RPG", value: "rpg" },
        { label: "Puzzle", value: "puzzle" },
        { label: "Shooter", value: "shooter" },
        { label: "Strategy", value: "strategy" }
      ]
    },
    required: Math.random() > 0.5
  },
  {
    _id: "q004",
    surveyId: "survey002",
    question: "Do you prefer single-player or multiplayer games?",
    option: "custom",
    choices: {
      allowMultipleChoice: false,
      list: [
        { label: "Single-player", value: "single-player" },
        { label: "Multiplayer", value: "multiplayer" }
      ]
    },
    required: Math.random() > 0.5
  },
  {
    _id: "q005",
    surveyId: "survey003",
    question: "Do you prefer group or solo studying?",
    option: "custom",
    choices: {
      allowMultipleChoice: false,
      list: [
        { label: "Group", value: "group" },
        { label: "Solo", value: "solo" }
      ]
    },
    required: Math.random() > 0.5
  },
  {
    _id: "q006",
    surveyId: "survey003",
    question: "How often do you use flashcards or practice quizzes?",
    option: "custom",
    choices: {
      allowMultipleChoice: false,
      list: [
        { label: "Always", value: "always" },
        { label: "Sometimes", value: "sometimes" },
        { label: "Rarely", value: "rarely" },
        { label: "Never", value: "never" }
      ]
    },
    required: Math.random() > 0.5
  }
];