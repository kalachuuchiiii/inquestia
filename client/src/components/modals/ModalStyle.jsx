import AnimationWrapper from '../AnimationWrapper.jsx';
import useScroll from '../../hooks/useScroll.js';
import { IoMdClose } from "react-icons/io";
import { createPortal } from 'react-dom';

const ModalStyle = ({label = "Verify your email.", displayCloseButton = true, onClose = () => {}, children = null}) => {
  
  useScroll({freeze: true})


return createPortal(
  <AnimationWrapper
    className="z-50 overflow-hidden fixed inset-0 backdrop-blur-xs"
    variants="fade"
  >
    <div className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 mx-auto h-full flex justify-center items-center ">
      <main className="bg-white overflow-auto shadow-xl h-[80vh] dark:bg-zinc-900  w-full p-3 rounded-2xl space-y-7">
        <div className="w-full text-center">
          <div className="w-full text-right text-sm">
            {displayCloseButton && (
              <button form="none" className="z-100" onClick={onClose}>
                <IoMdClose />
              </button>
            )}
          </div>
          <h1 className="text-xl font-bold">{label}</h1>
        </div>
        {children}
      </main>
    </div>
  </AnimationWrapper>,
  document.body
);
}

export default ModalStyle