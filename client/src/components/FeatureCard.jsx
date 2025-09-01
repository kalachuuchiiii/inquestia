import { memo } from "react";

const FeatureCard = ({ feature }) => {
  return (
    <div className="p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <main className="flex flex-col gap-4">
        {/* Icon + Title */}
        <div className="flex items-center gap-4">
          <div className="text-blue-600 text-3xl">{feature.icon}</div>
          <h3 className="text-xl font-semibold text-gray-900">{feature.feature}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-base leading-relaxed">
          {feature.description}
        </p>
      </main>
    </div>
  );
};

export default memo(FeatureCard);
