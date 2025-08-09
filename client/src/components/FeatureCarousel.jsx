import { features } from '../data/features.jsx';
import List from '../components/List.jsx';
import FeatureCard from '../components/FeatureCard.jsx';

const FeatureList = () => {

  return <div className=" w-full flex flex-col items-center justify-start">
    <div className = "text-left  mb-10 w-full p-4">
          <h1 className = "text-4xl flex flex-col lato">What more  <span className = "i"> is there to know?</span></h1>
          <p className = "text-base">Features that elevates your experience</p>
    </div>
    <List className="px-2 py-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mr-auto gap-8" list={features} renderItem={(feature) => <FeatureCard feature={feature} />} />
  </div>
}

export default FeatureList