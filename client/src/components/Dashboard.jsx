const Dashboard = () => {


return (<div className = "pr-8 pl-4 text-white bg-zinc-900/60 text-sm space-y-4 rounded my-8 py-4 mx-auto ">
  <div className = "flex gap-4 justify-start items-center text-left divide-x-1 ">
    <div>
          <p className = "font-bold">Your Streak</p> 
    <p>3</p>
    </div>
  </div>
   <div className = "flex  justify-start items-center gap-4 text-left divide-x-1">
    <div className = "pr-4">
      <p className = " font-bold">Your points</p>
      <p>{100}</p>
    </div>
    <div>
              <h1 className = " lato">Surveys</h1>
        <p>Earn points by answering surveys</p>

    </div>
  </div> 
</div>)
}

export default Dashboard