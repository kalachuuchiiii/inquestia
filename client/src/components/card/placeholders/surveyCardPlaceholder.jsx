import ArrowButton from '../../html/ArrowButton.jsx';
const SurveyCardPlaceholder = () => {


return <div className = "p-1 my-6 animate-pulse duration-150 w-full space-y-2" >
  <div className = "h-25 bg-zinc-700 rounded" /> 
  <div className = "space-y-1">
      <div className = "flex items-center gap-2">
    <div className = "w-8 h-8 rounded-full bg-zinc-700" /> 
    <div className = "flex w-full flex-col gap-1 ">
      <div className = "h-2 bg-zinc-700 rounded-lg w-8/12" /> 
      <div className = "h-2 rounded-lg w-6/12 opacity-70 bg-zinc-700" />
    </div>
  </div>
  <div className = "flex gap-1 justify-start w-full items-center opacity-70">
    <div className = "bg-zinc-700 rounded-lg w-2/12 h-2" /> 
    <div className = "bg-zinc-700 h-1 w-1 rounded-full" />
    <div className = "bg-zinc-700 h-2 rounded-lg w-3/12" />
  </div>
  </div>
  <div className = "flex my-8 gap-3 items-center w-full justify-between">
      <div className = "grid gap-y-1 gap-x-2 w-7/12 grid-cols-3">
    {
      Array(6).fill('').map((_) => <div className = "bg-zinc-700 opacity-40 h-2 rounded w-full" />)
    }
  </div>
  <div className = "flex p-3 w-5/12 items-center">
      <div className = "bg-zinc-700 rounded-lg h-2 w-10/12" />
  <ArrowButton />
  </div>
  </div>
  <div className = "w-full h-1 bg-zinc-700 rounded"></div>
</div>
}

export default SurveyCardPlaceholder