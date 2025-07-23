import useSearchQuery from '../hooks/useSearchQuery.js';
import { CgFeed } from "react-icons/cg";
import { useEffect, useState } from 'react';

const CurrentTopic = ({topic}) => {


  return (
    <div className = "px-2">
          <div className="backdrop-brightness-150 rounded-lg  mb-6">
      <div className = "flex justify-between p-1 items-center gap-1"> 
      <input className = "px-2 outline-none" placeholder = {topic} />
        <button className = "bg-neutral-100/80 px-5 py-2 shadow-md text-black rounded-lg">Search</button>
      </div>
    </div>
    </div>
  )
}

export default CurrentTopic