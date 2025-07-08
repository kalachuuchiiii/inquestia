import { FaRankingStar } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import { GrAchievement } from "react-icons/gr";
import { BsStars } from "react-icons/bs";
import { RiFilePaper2Line } from "react-icons/ri";

export const features = [
  {
    feature: "Leaderboard Ranking", 
    description: "See how you stack up against others.", 
    icon: <FaRankingStar />
  },
  {
    feature: "Streaks", 
    description: "Build habits with daily streaks.", 
    icon: <FaFire />
  },
  {
    feature: "Milestones", 
    description: "Celebrate progress as you grow.", 
    icon: <GrAchievement />
  },
{
  feature: "Quests", 
  description: "Complete daily quests to earn points and stay engaged.", 
  icon: <RiFilePaper2Line />
},
  {
    feature: "AI Summarization", 
    description: "Get quick summaries of your surveys", 
    icon: <BsStars />
  }
];