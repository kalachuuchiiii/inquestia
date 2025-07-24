import UserList from '../List.jsx';
import StreakRankedCard from '../card/StreakRankedCard.jsx';

const StreakRankingList = ({rankedUsers = [], switchToPointList}) => {


return <div className = "w-full space-y-6">
      <div className = " text-center w-full">
      <h1 className = "text-3xl  lato">Top Streak Holders</h1>
  <p>Consistent performance reflected in their active streaks.</p>
  </div>
    <button onClick = {switchToPointList} className = "text-sm underline w-full text-center underline">Points</button>
  <div className = "backdrop-brightness-50">
      <div className = "grid place-items-center grid-cols-10 p-3">
    <p className = "col-span-1 col-start-1">Rank</p>
    <p className = "col-span-7 col-start-2">User</p>
    <p className = "col-span-2 col-start-9">Streak</p>
  </div>
  <div >
    <UserList className = "space-y-2" list = {rankedUsers} renderItem = {(user, i ) => <StreakRankedCard user = {user} i = {i} /> } />
  </div>
  </div>
</div>
}

export default StreakRankingList