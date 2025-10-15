import { FaRankingStar, FaRobot, FaFilter, FaCoins } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { motion } from "framer-motion";

export const features = [
  {
    feature: "Leaderboard Ranking",
    description:
      "Climb the leaderboard and see how your contributions compare with other users. Earn recognition for your activity, stay motivated, and engage in friendly competition as you progress through the ranks.",
    icon: <FaRankingStar />,
  },
  {
    feature: "Streaks",
    description:
      "Stay consistent with daily streaks that reward you for regular participation. Build strong research habits, track your progress visually, and keep your motivation high with ongoing engagement milestones.",
    icon: <FaFire />,
  },
  {
    feature: "AI Summarization",
    description:
      "Save time and get clear insights with automated AI summaries of your surveys. In just seconds, transform complex response data into meaningful highlights and key takeaways for faster decision-making.",
    icon: <BsStars />,
  },
  {
    feature: "Answer Filtering System",
    description:
      "Take full control of your survey results with a dynamic answer filtering system. Select specific responses or criteria before generating AI summaries, allowing you to focus on the most relevant insights and patterns for your research.",
    icon: <FaFilter />,
  },
  {
    feature: "Core Points to Load Exchange",
    description:
      "Earn Core Points through active participation and meaningful contributions, then exchange them for prepaid mobile load. It’s a rewarding way to recognize your engagement while supporting your connectivity and continued involvement.",
    icon: <FaCoins />,
  },
  {
    feature: "AI Chatbot named Inko!",
    description:
      "Inko is an intelligent chatbot integrated into the system, designed to help users explore and understand platform features with ease. Powered by research-trained data, Inko provides insightful answers, assists with survey creation, and guides users in navigating the system efficiently — making research support available anytime.",
    icon: (
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="mb-4 p-4 rounded-full dark:inquestia-bg-dark inquestia-bg"
      >
        <FaRobot size={40} className="text-white drop-shadow-lg" />
      </motion.div>
    ),
  },
];
