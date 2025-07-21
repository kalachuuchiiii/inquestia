import Bar from '../html/Bar.jsx';
import DifficultyBadge from '../html/badges/Difficulty.jsx';
const defaultQuest = {
  objective: '..',
  targetNumber: 3,
  totalNumber: 0,
  difficulty: 'easy',
  points: 0,
  description: "Loading..."
}

const QuestCard = ({ quest = defaultQuest }) => {

  const { objective, targetNumber, totalNumber, difficulty, points, description } = quest ?? defaultQuest;

  return <div className="px-4 py-6 rounded-xl shadow-md space-y-3 ">

    <div className = "">
      <div className="mt-4 mb-2">
        <p className="text-lg mt-4 truncate font-semibold">{objective}</p>
        <p className="text-sm italic">{description}</p>
      </div>
      <DifficultyBadge difficulty={difficulty} />
    </div>

    <div className="pl-1">
      <Bar target={targetNumber} total={totalNumber} />
      <p className="text-xs">{points} Points</p>
    </div>
  </div>
}

export default QuestCard