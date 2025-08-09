import { useEffect, useState } from 'react';


const StarryNight = () => {
  useEffect(() => {
    document.body.style.color = "white";
    document.body.style.backgroundColor = "#09090b"
    return()=>{
      document.body.style.color = "white";
    }
  }, [])

return <div className = "absolute z-[-100]  pointer-events-none w-full  overflow-hidden">

</div>
}

export default StarryNight