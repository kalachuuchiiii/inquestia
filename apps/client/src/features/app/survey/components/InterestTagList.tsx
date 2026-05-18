import { Button } from "@/components/ui/button";
import { INTEREST_ENUM, type Interest } from "@inquestia/constants";

import { _capitalize } from "chart.js/helpers";

const InterestTagList = ({
  selected,
  select,
}: {
  selected: Interest[];
  select: (interest: (typeof INTEREST_ENUM)[number]) => void;
}) => {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-3 rounded-2xl">
      {INTEREST_ENUM.map((interest, i) => {
        const isSelected = selected.includes(interest);
        return (
          <Button
            type="button"
            onClick={() => select(interest)}
            key={i}
            variant={isSelected ? "default" : "outline"}
          >
            <span className="relative z-10 h-fit  text-wrap line-clamp-2">
              {_capitalize(interest)}
            </span>
          </Button>
        );
      })}
    </div>
  );
};

export default InterestTagList;
