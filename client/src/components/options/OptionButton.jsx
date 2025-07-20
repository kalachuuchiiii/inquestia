import AnimationWrapper from '../AnimationWrapper.jsx';
import { IoIosClose } from "react-icons/io";

const OptionButton = ({value, label, onRemove}) => {


  return <AnimationWrapper variants="emerge" className=" text-left flex justify-between bg-blue-100  items-center w-full truncate rounded-xl text-blue-900">
    <p className="truncate  px-3 py-1">{label}</p>
    <button onClick={onRemove} className="pr-3 py-1"><IoIosClose /></button>
  </AnimationWrapper>
}

export default OptionButton