import { features } from '../data/features.jsx';
import List from '../components/List.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import useSlider from '../hooks/useSlider.js';

const FeatureList = () => {

  return <div className=" w-full flex flex-col items-center justify-center">
    <div className = "text-left  mb-10 w-full p-4">
          <h1 className = "text-4xl flex flex-col lato">What more  <span className = "i"> is there to know?</span></h1>
          <p className = "text-base">Features that elevates your experience</p>
    </div>
    <List className="flex px-2 py-2 flex-col w-full items-center gap-8" list={features} renderItem={(feature) => <FeatureCard feature={feature} />} />
  </div>
}

export default FeatureList