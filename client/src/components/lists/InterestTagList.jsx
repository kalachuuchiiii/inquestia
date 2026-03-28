import { interests } from '../../data/interests.js';
import { capitalize } from '../../utils/capitalize.js';

const InterestTagList = ({ selected = [], select = () => {} }) => {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-3 rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-lg border border-blue-100/50 dark:border-blue-900/40">
      {interests.map((interest, i) => {
        const isSelected = selected?.includes(interest);
        return (
          <button
            type="button"
            onClick={() => select(interest)}
            key={i}
            className={`group relative flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-out outline-none
              ${
                isSelected
                  ? "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)] scale-[1.03]"
                  : "bg-white/80 dark:bg-zinc-800/70 text-gray-800 dark:text-gray-200 border border-gray-200/40 dark:border-gray-700/50 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
              }`}
          >
            {/* Glow ring animation */}
            {isSelected && (
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 opacity-30 blur-md animate-pulse"></span>
            )}
            <span className="relative z-10">{capitalize(interest)}</span>
          </button>
        );
      })}
    </div>
  );
};

export default InterestTagList;
