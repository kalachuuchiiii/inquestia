
import PointRankedCard from '../card/PointRankedUser.jsx';
import { useEffect, useState } from 'react';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
const PointRankingList = () => {

  const [isAllTimeHigh, setIsAllTimeHigh] = useState(false);
  const [currentHighest, setCurrentHighest] = useState([]);
  const [allTimeHigh, setAllTimeHigh] = useState([]);
  const [userRank, setUserRank] = useState({
    point: {
      highest: 0, 
      lowest: 0
    }, 
    rank: 1
  });

  const [getLeaderboard, { isLoading, error }] = useAsync(async ({ isAllTimeHigh = false}) => {
    if((isAllTimeHigh && allTimeHigh?.length > 0) || (!isAllTimeHigh && currentHighest?.length > 0))return; 
    
    const res = await fetchApi("get", "/user/leaderboard", {
      isAllTimeHigh
    });
    if(!res.success){
      throw new Error("Fetching of leaderboard has failed.");
    }
    
    setUserRank(res.leaderboard.userRank[0]);
    
    const { hallOfFamers = []} = res.leaderboard;
    
    setUserRank(res.leaderboard.userRank[0])
    
    if(isAllTimeHigh && allTimeHigh?.length === 0){
      setAllTimeHigh(hallOfFamers);
      return;
    }
    
    if(!isAllTimeHigh && currentHighest?.length === 0){
      setCurrentHighest(hallOfFamers);
      return;
    }
    
  }, [isAllTimeHigh, allTimeHigh, currentHighest])

  useEffect(() => {
    if(isLoading)return;
    getLeaderboard({ isAllTimeHigh });
  }, [isAllTimeHigh])
  
  const ranklist = {
    true: allTimeHigh, 
    false: currentHighest
  };


  return <div className="w-full space-y-6">
    <div className="text-center w-full">
      <h1 className="text-3xl  lato">Hall of Famers</h1>
      <p>These users racked up the most points—keep answering to rise in the leaderboard!</p>
    </div>
    <div className="w-full justify-center flex gap-1 ">
      <button onClick={() => setIsAllTimeHigh(false)} className={`w-full p-2 text-center  ${!isAllTimeHigh && "border-b-1 border-b-neutral-100"}`}>Current Highest</button>
      <button onClick={() => setIsAllTimeHigh(true)} className={`w-full p-2 text-center ${isAllTimeHigh && "border-b-1 border-b-neutral-100"}`}>All-Time Highest</button>
    </div>
    <div className="backdrop-brightness-50 rounded">
      <div className="grid place-items-center grid-cols-10 p-3">
        <p className="col-span-1 col-start-1">Rank</p>
        <p className="col-span-7 col-start-2">User</p>
        <p className="col-span-2 col-start-9">Points</p>
      </div>
      <div className = "min-h-96" >
        {
          isLoading ? <div className = "w-full text-sm opacity-60 text-center">
            Preparing the leaderboard...
          </div> : ranklist[isAllTimeHigh].map((user, i) => <PointRankedCard key = {i} sort = {isAllTimeHigh ? "highest" : "current"} user={user} /> )
        }
      </div>
      <div className = "text-center border-t-1 border-t-neutral-100 my-2 opacity-80 w-full p-2 text-base">
        <h1>You’re ranked <span className = " bg-neutral-100 px-2 py-1 lato text-zinc-900 rounded">#{userRank.rank}</span> on the leaderboard with {userRank.point[isAllTimeHigh ? "highest" : "current"]} points!</h1>
      </div>
      <h1 className = "text-center text-xs opacity-50">
        Each month, current points are recalculated to 30%, keeping momentum while refreshing progress.
      </h1>
    </div>
  </div>
}

export default PointRankingList