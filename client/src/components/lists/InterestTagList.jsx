import { interests } from '../../data/interests.js';
import { capitalize } from '../../utils/capitalize.js';

const InterestTagList = ({ selected = [], select = () => {}}) => {


  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-2 rounded-lg">
      {interests.map((interest, i) => (
        <button
          type="button"
          onClick={() => select(interest)}
          key={i}
          className={`flex items-center justify-center px-3 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-sm font-medium transition-all duration-150
            ${selected?.includes(interest)
              ? "bg-blue-600 text-white scale-105 ring-2 ring-blue-400 dark:bg-blue-400 dark:text-zinc-900 dark:ring-blue-200"
              : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:scale-105"}
          `}
          style={{ minWidth: 0, minHeight: 0 }}
        >
          {capitalize(interest)}
        </button>
      ))}
    </div>
  );
}

export default InterestTagList