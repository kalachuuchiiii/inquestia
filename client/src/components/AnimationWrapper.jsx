import allVariants from '../variants/index.js';
import { motion } from 'framer-motion';
import { memo } from 'react';
const AnimationWrapper = ({variants = "fade", className = "", children, layout = false, onClick}) => {
  
  return (
     <motion.div
  variants = {allVariants[variants]}
   initial = "hidden" 
   animate = "visible" 
   exit = "hidden"
   layout = {layout}
   className = {className}
   onClick = {onClick}
  >
    {
      children
    }
  </motion.div>
  )

}

export default memo(AnimationWrapper)