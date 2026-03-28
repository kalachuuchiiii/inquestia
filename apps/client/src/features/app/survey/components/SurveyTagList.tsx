import type { TAGS_ENUM } from "@inquestia/constants";
import { _capitalize } from "chart.js/helpers";

const SurveyTagList = ({ tags = [] }:{ tags: typeof TAGS_ENUM[number][]}) => {

return (
  <div className="grid shrink-1 grid-cols-3 pr-2 pl-1 gap-x-1 w-full mx-auto ">
    {tags.map((t) => (
      <p key={t} className="col-span-1 italic text-left truncate ">
        {_capitalize(t)}
      </p>
    ))}
  </div>
);
}

export default SurveyTagList;