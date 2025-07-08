import AnimationWrapper from './AnimationWrapper.jsx';
import { navRoutes } from '../data/navRoutes.jsx';
import List from './List.jsx';
import NavIcon from './NavIcon.jsx';
import detectPosition from '../utils/detectPositionInAList.js';
const Sidebar = () => {

return <AnimationWrapper
variants = "fromLeft"
className = "fixed z-10 my-auto flex items-center h-screen"
>
    <List className = "flex shadow-md  shadow-pink-100 rounded-4xl ml-2 text-zinc-800 bg-white  overflow-hidden text-2xl flex-col gap-2 justify-center" list = {navRoutes} renderItem = {(info, i) => <NavIcon position = {detectPosition(i, navRoutes.length - 1)} key = {info?.path} info = {info} />} />
  
</AnimationWrapper>
}

export default Sidebar