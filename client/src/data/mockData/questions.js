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
    _id: "q1011",
    surveyId: "survey101",
    question: "What is your favorite music genre?",
    option: "custom",
    choices: {
      allowMultipleChoice: false,
      list: [
        { label: "Pop", value: "pop" },
        { label: "Rock", value: "rock" },
        { label: "Hip-hop", value: "hiphop" },
        { label: "Jazz", value: "jazz" },
        { label: "Classical", value: "classical" },
        { label: "Other", value: "other" }
      ]
    },
    required: true
  },
  {
    _id: "q1012",
    surveyId: "survey101",
    question: "How many hours a day do you listen to music?",
    option: "text",
    choices: { allowMultipleChoice: false, list: [] },
    required: true
  },
  {
    _id: "q1013",
    surveyId: "survey101",
    question: "Which platform do you use most for listening to music?",
    option: "custom",
    choices: {
      allowMultipleChoice: false,
      list: [
        { label: "Spotify", value: "spotify" },
        { label: "Apple Music", value: "apple_music" },
        { label: "YouTube", value: "youtube" },
        { label: "SoundCloud", value: "soundcloud" },
        { label: "Other", value: "other" }
      ]
    },
    required: false
  },

  // Survey 102 - Teen Sleep Patterns
  {
    _id: "q1021",
    surveyId: "survey102",
    question: "What time do you usually go to bed on weekdays?",
    option: "text",
    choices: { allowMultipleChoice: false, list: [] },
    required: true
  },
  {
    _id: "q1022",
    surveyId: "survey102",
    question: "Do you feel rested when you wake up?",
    option: "custom",
    choices: {
      allowMultipleChoice: false,
      list: [
        { label: "Yes, always", value: "always" },
        { label: "Sometimes", value: "sometimes" },
        { label: "Rarely", value: "rarely" },
        { label: "Never", value: "never" }
      ]
    },
    required: true
  },
  {
    _id: "q1023",
    surveyId: "survey102",
    question: "How many hours of sleep do you get on average per night?",
    option: "text",
    choices: { allowMultipleChoice: false, list: [] },
    required: true
  },
  {
    _id: "q1031",
    surveyId: "survey103",
    question: "What online platform does your school use most?",
    option: "custom",
    choices: {
      allowMultipleChoice: false,
      list: [
        { label: "Google Classroom", value: "google_classroom" },
        { label: "Microsoft Teams", value: "teams" },
        { label: "Zoom", value: "zoom" },
        { label: "Moodle", value: "moodle" },
        { label: "Other", value: "other" }
      ]
    },
    required: true
  },
  {
    _id: "q1032",
    surveyId: "survey103",
    question: "What do you find most challenging about online learning?",
    option: "text",
    choices: { allowMultipleChoice: false, list: [] },
    required: true
  },
  {
    _id: "q1033",
    surveyId: "survey103",
    question: "Do you prefer online learning or face-to-face learning?",
    option: "custom",
    choices: {
      allowMultipleChoice: false,
      list: [
        { label: "Online", value: "online" },
        { label: "Face-to-face", value: "f2f" },
        { label: "Hybrid", value: "hybrid" }
      ]
    },
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