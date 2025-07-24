

import PointRankingList from '../../components/lists/PointRankingList.jsx';
import StreakRankingList from '../../components/lists/StreakRankingList.jsx';
import { useEffect, useState } from 'react';
const users = [
  {
    username: "sunny_dev",
    nickname: "Sunny",
    avatar: "https://i.pravatar.cc/150?img=1",
    points: 1280
  },
  {
    username: "artbylena",
    nickname: "Lena",
    avatar: "https://i.pravatar.cc/150?img=2",
    points: 1543
  },
  {
    username: "codeghost",
    nickname: "Ghost",
    avatar: "https://i.pravatar.cc/150?img=3",
    points: 1021
  },
  {
    username: "waveform_jay",
    nickname: "Jay",
    avatar: "https://i.pravatar.cc/150?img=4",
    points: 900
  },
  {
    username: "skylinegal",
    nickname: "Sky",
    avatar: "https://i.pravatar.cc/150?img=5",
    points: 1870
  },
  {
    username: "nova_pixel",
    nickname: "Nova",
    avatar: "https://i.pravatar.cc/150?img=6",
    points: 775
  },
  {
    username: "zenquill",
    nickname: "Zen",
    avatar: "https://i.pravatar.cc/150?img=7",
    points: 1640
  },
  {
    username: "cipherkid",
    nickname: "Cipher",
    avatar: "https://i.pravatar.cc/150?img=8",
    points: 1199
  },
  {
    username: "vibingvivi",
    nickname: "Vivi",
    avatar: "https://i.pravatar.cc/150?img=9",
    points: 980
  },
  {
    username: "logicline",
    nickname: "Logic",
    avatar: "https://i.pravatar.cc/150?img=10",
    points: 1102
  }
];
const streakRanked = [
  {
    username: "sunny_dev",
    nickname: "Sunny",
    avatar: "https://i.pravatar.cc/150?img=1",
    streak: 25
  },
  {
    username: "artbylena",
    nickname: "Lena",
    avatar: "https://i.pravatar.cc/150?img=2",
    streak: 42
  },
  {
    username: "codeghost",
    nickname: "Ghost",
    avatar: "https://i.pravatar.cc/150?img=3",
    streak: 13
  },
  {
    username: "waveform_jay",
    nickname: "Jay",
    avatar: "https://i.pravatar.cc/150?img=4",
    streak: 37
  },
  {
    username: "skylinegal",
    nickname: "Sky",
    avatar: "https://i.pravatar.cc/150?img=5",
    streak: 68
  },
  {
    username: "nova_pixel",
    nickname: "Nova",
    avatar: "https://i.pravatar.cc/150?img=6",
    streak: 7
  },
  {
    username: "zenquill",
    nickname: "Zen",
    avatar: "https://i.pravatar.cc/150?img=7",
    streak: 60
  },
  {
    username: "cipherkid",
    nickname: "Cipher",
    avatar: "https://i.pravatar.cc/150?img=8",
    streak: 15
  },
  {
    username: "vibingvivi",
    nickname: "Vivi",
    avatar: "https://i.pravatar.cc/150?img=9",
    streak: 54
  },
  {
    username: "logicline",
    nickname: "Logic",
    avatar: "https://i.pravatar.cc/150?img=10",
    streak: 31
  }
];

const Leaderboards = () => {
  const [mode, setMode] = useState("point");
  

return <div className = "p-2">
    <div >
      {
        mode === "point" ?       <PointRankingList switchToStreakList = {() => setMode("streak")} rankedUsers = {users} /> : <StreakRankingList switchToPointList = {() => setMode("point")}  rankedUsers = {streakRanked} />
      }
  </div>
  
  
</div>
}

export default Leaderboards