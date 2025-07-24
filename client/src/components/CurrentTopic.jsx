import useSearchQuery from '../hooks/useSearchQuery.js';
import { CgFeed } from "react-icons/cg";
import { useEffect, useState } from 'react';

const CurrentTopic = ({topic}) => {


  return (
    <div className = "px-2">
          <div className="backdrop-brightness-150 rounded-lg">
      <div className = "flex justify-between p-1 items-center gap-1"> 
      <input className = "px-2 placeholder-black outline-none" placeholder = {topic} />
        <button className = "px-5 py-2 bg-white text-black rounded-lg">Search</button>
      </div>
    </div>
    </div>
  )
}

export default CurrentTopic