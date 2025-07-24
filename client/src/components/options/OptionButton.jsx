import AnimationWrapper from '../AnimationWrapper.jsx';
import { IoIosClose } from "react-icons/io";

const OptionButton = ({value, label, onRemove}) => {


  return <AnimationWrapper variants="emerge" className=" text-left backdrop-brightness-50 flex justify-between   items-center w-full truncate rounded-xl">
    <p className="truncate  px-3 py-1">{label}</p>
    <button onClick={onRemove} className="pr-3 py-1"><IoIosClose /></button>
  </AnimationWrapper>
}

export default OptionButton