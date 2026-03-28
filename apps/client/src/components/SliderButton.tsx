

import { useAppSelector } from '@/hooks/useAppSelector';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';

const SliderButton = ({ handlePrev = () => {}, handleNext = () => {}, current = 0, last = false}) => {
    const { isDark } = useAppSelector(state => state.theme);
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="p-1 rounded-full flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-40"
          aria-label="Previous question"
        >
          <HiOutlineChevronLeft
            className="size-6 md:size-8"
            color={isDark ? "#fff" : "#222"}
          />
          <p className="text-xs">Previous</p>
        </button>
      </div>
      <div className="">
        <button
          onClick={handleNext}
          disabled={last}
          className="p-1  flex items-center gap-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-40"
          aria-label="Next question"
        >
          <p className="text-xs ">Next</p>
          <HiOutlineChevronRight
            className="size-6 md:size-8"
            color={isDark ? "#fff" : "#222"}
          />
        </button>
      </div>
    </div>
  );
}

export default SliderButton
