import AnimationWrapper from "./AnimationWrapper.jsx";
import { PiStarFour } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const WelcomeGreet = () => {
  return (
    <div className="px-6 sm:px-12 py-12  dark:bg-zinc-950 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">

  

        {/* Main Heading */}
        <h1 className="mt-6 text-4xl sm:text-5xl font-bold leading-tight dark:text-neutral-100 text-gray-900">
          Surveys that <span className="text-blue-600">Reach</span>
          <span className="block">More Possibilities</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg text-gray-600">
          Publish surveys online and unlock more opportunities with ease.
        </p>

        {/* Button */}
        <div className="mt-8">
          <NavLink
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg transition-all duration-200"
          >
            <PiStarFour size={20} />
            Get Started
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WelcomeGreet;
