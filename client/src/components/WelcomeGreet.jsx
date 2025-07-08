import AnimationWrapper from './AnimationWrapper.jsx';
import { PiStarFour } from "react-icons/pi";

const WelcomeGreet = () => {
  return (
    <AnimationWrapper
      variants="fromBottom"
      className="h-[88vh] px-4"
    >
      <div className="space-y-6 my-16 text-left max-w-2xl">
        <div className = "space-y-3">
                  <p className="lato text-4xl leading-10">
          Surveys that <span className = "block">Reaches</span> <span className = "block">
            More <span className = "text-gradient">Possibilities.</span>
          </span></p>
        <h1 className="text-base text-zinc-900">A place where you can publish surveys online and unlock more opportunities.</h1>
        </div>
        <button className = "flex gap-2 items-center text-black bg-gradient-to-l from-purple-100 rounded-xl px-6 py-2 shadow-md shadow-pink-100 to-pink-100">
          <PiStarFour /> <a href = "/home">Get Started</a>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default WelcomeGreet;