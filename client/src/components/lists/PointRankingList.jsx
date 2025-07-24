import UserList from '../List.jsx';
import PointRankedCard from '../card/PointRankedUser.jsx';

const PointRankingList = ({rankedUsers = [], switchToStreakList}) => {


return <div className = "w-full space-y-6">
    <div className = "text-center w-full">
      <h1 className = "text-3xl  lato">Top Point Earners</h1>
  <p>These users racked up the most points—keep answering to rise in the leaderboard!</p>
  </div>
    <button onClick = {switchToStreakList} className = "text-sm w-full text-center underline">Streaks</button>
  <div className = "backdrop-brightness-50 rounded">
      <div className = "grid place-items-center grid-cols-10 p-3">
    <p className = "col-span-1 col-start-1">Rank</p>
    <p className = "col-span-7 col-start-2">User</p>
    <p className = "col-span-2 col-start-9">Points</p>
  </div>
  <div >
    <UserList className = "space-y-2" list = {rankedUsers} renderItem = {(user, i ) => <PointRankedCard user = {user} i = {i} /> } />
  </div>
  </div>
</div>
}

export default PointRankingList