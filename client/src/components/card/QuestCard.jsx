import Bar from '../html/Bar.jsx';
import DifficultyBadge from '../html/badges/Difficulty.jsx';
const defaultQuest = {
  objective: '..', 
  targetNumberOfAction: 3, 
  totalNumberOfAction: 0, 
  difficulty: 'easy', 
  points: 0
}

const QuestCard = ({quest = defaultQuest}) => {
  
  const { objective, targetNumberOfAction, totalNumberOfAction, difficulty, points } = quest ?? defaultQuest;

return <div className = "p-2 rounded-xl shadow-md space-y-3 ">
  <div>
      <p className = "text-lg font-semibold">{objective}</p>
      <DifficultyBadge difficulty = {difficulty || "Easy"} />
  </div>
  <div className = "pl-1">
      <Bar target = {targetNumberOfAction} total = {totalNumberOfAction} /> 
  <p className = "text-xs">{points} Points</p>
  </div>
</div>
}

export default QuestCard