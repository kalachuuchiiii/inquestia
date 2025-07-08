import allVariants from '../variants/index.js';
import { motion } from 'framer-motion';

const AnimationWrapper = ({variants = "fade", className = "", children}) => {
  
  return <motion.div
  variants = {allVariants[variants]}
   initial = "hidden" 
   animate = "visible" 
   exit = "hidden"
   className = {className}
  >
    {
      children
    }
  </motion.div>
}

export default AnimationWrapper