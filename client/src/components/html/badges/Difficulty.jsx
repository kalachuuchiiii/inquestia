
const defaultDifficulty = "Easy";
const DifficultyBadge = ({ difficulty = defaultDifficulty}) => {
  
  

return <div className = "px-4 py-1 rounded-lg text-center text-xs w-fit bg-zinc-900/60 text-white font-bold ">
  {difficulty || defaultDifficulty}
</div>
}

export default DifficultyBadge