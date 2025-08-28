
import Modal from '../AnimationWrapper.jsx'
import useScroll from '../../hooks/useScroll.js';
import { NavLink } from "react-router-dom";
const UnauthorizedModal = () => {
  
  useScroll({freeze: true})
  return (
    <Modal className = "fixed z-100 inset-0 flex justify-center items-center bg-zinc-950/80" variants = "fade">
      <div onClick = {e => e.stopPropagation()} className="bg-zinc-900 w-11/12 mx-auto sm:w-10/12 md:w-8/12 rounded-2xl p-6 shadow-xl border border-zinc-900 max-w-md mx-auto text-center space-y-4">
        <h2 className="text-xl font-semibold text-neutral-100">
          Login Required
        </h2>
        <p className="text-neutral-400 text-sm">
          You need to log in to start creating or answering surveys.
        </p>
        <div className="flex justify-center gap-5 pt-2">
          <NavLink to = "/login"
            className="bg-zinc-900 hover:bg-zinc-800 text-neutral-100 rounded-xl flex items-center gap-2"
          >
            Login
          </NavLink>
          <NavLink to = "/register"
            className="border-zinc-700 text-neutral-100 hover:bg-zinc-900 rounded-xl"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </Modal>
  )
}

export default UnauthorizedModal