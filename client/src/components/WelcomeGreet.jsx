import AnimationWrapper from './AnimationWrapper.jsx';
import { PiStarFour } from "react-icons/pi";

const WelcomeGreet = () => {
  return (
    <div className = "px-4" >
              <div className = "backdrop-brightness-120 px-6 py-2 w-fit rounded-xl">
          <p className = "z-20 text-xs font-semibold" >
            Terms Of Privacy
          </p>
        </div>
      <div className="space-y-6 mt-8 mb-16 text-left max-w-2xl">

        <div className = "space-y-3">
                  <p className="lato saturate-100 text-5xl sm:text-3xl ">
          Surveys that <span className = "block">Reaches</span> <span className = "block">
            More Possibilities
          </span></p>
        <h1 className="text-base ">A place where you can publish surveys online and unlock more opportunities.</h1>
                <button className = "flex text-lg sm:text-base items-center gap-2 px-6 py-2 rounded-xl backdrop-blue-lg ">
          <PiStarFour size = "20" /> <a href = "/register">Get Started</a>
        </button>
        </div>

      </div>
    </div>
  );
};

export default WelcomeGreet;