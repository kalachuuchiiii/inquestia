import { useEffect, useState } from 'react';


const StarryNight = () => {
  useEffect(() => {
    document.body.style.color = "white";
    document.body.style.backgroundColor = "#18181b"
    return()=>{
      document.body.style.color = "white";
    }
  }, [])

return <div className = "absolute z-[-100]  pointer-events-none w-full  overflow-hidden">
  <div className = "w-[180%] sm:w-[140%] md:w-[100%]">
    <img className = "w-full" src = "/starrynight.png" />
  </div>
</div>
}

export default StarryNight