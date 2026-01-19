import React, { memo } from "react";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const FeatureCard = ({ feature = {}, i = 1 }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`${i % 2 !== 0 ? ' translate-y-8 ' : ''}relative overflow-hidden p-6 rounded-2xl
                 bg-gradient-to-br from-white to-blue-50 
                 dark:from-zinc-900 dark:to-zinc-800 
                 shadow-md hover:shadow-xl
                 border border-transparent hover:border-blue-300
                 dark:hover:border-blue-500/40
                 transition-all duration-300 group`}
    >
      {/* Glow background on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl bg-gradient-to-r from-blue-400/20 via-violet-400/20 to-blue-300/20 transition duration-300" />

      <main className="relative flex flex-col gap-5">
        {/* Icon + Title */}
        <div className="flex items-center gap-4">
          <div className="text-3xl text-blue-600 dark:text-blue-400 drop-shadow-sm">
            {feature?.icon}
          </div>
          <h3 className="text-lg sm:text-xl font-semibold tracking-wide text-gray-900 dark:text-neutral-100">
            {feature?.feature}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          {feature?.description}
        </p>
      </main>
    </motion.div>
  );
};

export default memo(FeatureCard);

