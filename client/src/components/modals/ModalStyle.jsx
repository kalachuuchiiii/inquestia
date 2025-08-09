import AnimationWrapper from '../AnimationWrapper.jsx';
import useScroll from '../../hooks/useScroll.js';

const ModalStyle = ({label = "Verify your email.", onClose = () => {}, children = null}) => {
  
  useScroll({freeze: true})


return <AnimationWrapper className = "z-80 fixed inset-0 bg-black/85" variants = "fade">
  <div className = "w-11/12 md:w-8/12 mx-auto h-full flex justify-center items-center ">
     <main className = "bg-zinc-900 w-full p-3 rounded-lg space-y-7">
       <div className = "w-full text-center border-b-1 border-b-white">
         <div className = "w-full text-right text-sm">
           <button className = "z-100" onClick = {onClose}>Close</button>
         </div>
       <h1 className = "text-xl p-2 pb-5 lato">{label}</h1> 
       </div>
       {children}
       </main>
  </div>
</AnimationWrapper>
}

export default ModalStyle