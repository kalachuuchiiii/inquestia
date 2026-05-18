import type { TAGS_ENUM } from "@inquestia/constants";
import { _capitalize } from "chart.js/helpers";
import { Tags } from "lucide-react";

const SurveyTagList = ({
  tags = [],
}: {
  tags: (typeof TAGS_ENUM)[number][];
}) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Tags className="lg:size-4" />{" "}
      {tags.map((t) => (
        <p key={t} className="col-span-1 italic text-left truncate ">
          {_capitalize(t)}
        </p>
      ))}
    </div>
  );
};

export default SurveyTagList;
