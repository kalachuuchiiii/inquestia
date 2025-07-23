import QuestList from '../../components/lists/QuestList.jsx';
import { quests } from '../../data/mockData/quests.js';

const Quests = () => {
  const easy = quests.filter(quest => quest.difficulty === "Easy");
  const medium = quests.filter(quest => quest.difficulty === "Medium");
  const hard = quests.filter(quest => quest.difficulty === "Hard");


return <div className = "p-2">
  <div className = "mt-6 p-2 text-white mb-10">
   <h1 className = "text-5xl lato">Your Weekly Quests</h1>
  <p className = "text-base text-black ">Completing quests helps you earn points and climb the leaderboard. The more quests you finish, the closer you get to reaching the top and unlocking recognition for your activity and consistency.</p>
  </div>
  <QuestList quests = {easy} />
  <QuestList quests = {medium} />
  <QuestList quests = {hard} />
</div>
}

export default Quests