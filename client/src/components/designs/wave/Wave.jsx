import CyanWave from './Cyan.jsx';
import YellowWave from './Yellow.jsx';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import AnimationWrapper from '../../AnimationWrapper.jsx';

const WaveDesign = () => {
  
  const [currIndex, setCurrIndex] = useState(0); 
  const designs = [
    <CyanWave />, 
    <YellowWave />
    ]
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrIndex(prev => prev === (designs.length - 1) ? 0 : prev + 1);
    }, 10000)
    
    return()=>{
      clearInterval(intervalId);
    }
  }, [])
  
return <div className = "absolute inset-x-0 top-0  z-[-100]">
  <div className = " w-[100vw]">
    <div className = "w-full grid overflow-hidden ">
                <AnimatePresence >
      <AnimationWrapper className = "col-span-1 col-start-1 w-[170%] sm:w-[140%] md:w-[110%] object-cover row-span-1 row-start-1" key = {currIndex} variants = "longFade">
                          {designs[currIndex]}
      </AnimationWrapper>
    </AnimatePresence>
    </div>
  </div>
</div>
}

export default WaveDesign