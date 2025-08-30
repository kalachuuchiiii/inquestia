import { useSelector, useDispatch } from 'react-redux';
import { IoStatsChartOutline } from "react-icons/io5";

const Dashboard = ({user = {}}) => {


  return <div className="italic flex gap-1 items-center text-xs scrollbar-none overflow-x-auto serif" >
    <div className="px-6 flex gap-2 items-center shrink-0">f
      <IoStatsChartOutline size="18" />  Stats
    </div>
    <div className="w-fit shrink-0">
      <h1 >Highest Streak <span className="lato ">{user.streak.highest} day(s)_</span></h1>
      <h1 className="ml-3 opacity-60">Current Streak <span className="lato">{user.streak.current} day(s)</span></h1>
    </div>
    <div className="w-fit shrink-0">
      <h1 >Highest Points: <span className="lato ">{user.point.highest} </span></h1>
      <h1 className="ml-3 opacity-60" >Current Points: <span className="lato">{user.point.current} </span></h1>
    </div>
  </div>
}

export default Dashboard