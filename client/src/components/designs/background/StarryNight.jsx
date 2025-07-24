import { useEffect, useState } from 'react';


const StarryNight = () => {
  useEffect(() => {
    document.body.style.color = "white";
    return()=>{
      document.body.style.color = "white";
    }
  }, [])

return <div className = "fixed z-[-100] inset-0 pointer-events-none">
<img className = "w-full h-full object-cover" src = "/starrynight.png" />
</div>
}

export default StarryNight