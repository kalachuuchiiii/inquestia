/* eslint-disable react/react-in-jsx-scope */
import { features } from "../data/features.jsx";
import FeatureCard from "../components/FeatureCard.jsx";

const FeatureList = () => {
  return (
    <section className="w-full px-6  sm:px-12 py-16 dark:bg-zinc-950 bg-gray-50">
      {/* Section Header */}
      <div className="max-w-3xl mb-12 text-center mx-auto">
        <h2 className="text-4xl sm:text-3xl font-bold text-gray-900 dark:text-neutral-100">
          What more <span className="text-blue-600">is there to know?</span>
        </h2>
        <p className="mt-3 text-lg  text-gray-600">
          Features that elevate your experience
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-8 max-w-6xl mx-auto">
        {features?.map((feature, i) => (
          <FeatureCard key={feature._id || i} i = {i} feature={feature} />
        ))}
      </div>
    </section>
  );
};

export default FeatureList;
