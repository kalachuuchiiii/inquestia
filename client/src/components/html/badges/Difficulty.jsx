
const defaultDifficulty = "Easy";
const DifficultyBadge = ({ difficulty = defaultDifficulty}) => {
  
  const colors = {
    easy: 'bg-red-200 text-black', 
    medium: 'bg-red-300 text-neutral-50 ', 
    hard: 'bg-red-400 text-neutral-50  '
  }
  
  const color = colors[difficulty.toLowerCase()];

return <div className = {` ${color} px-4 py-1 rounded-lg text-center text-xs w-fit`}>
  {difficulty || defaultDifficulty}
</div>
}

export default DifficultyBadge