import { capitalize } from '../../utils/capitalize.js';

const SurveyTagList = ({ tags = []}) => {

return <div className="grid shrink-1 grid-cols-3 pr-2 pl-1 gap-x-1 w-full mx-auto ">
          {
            tags.map((t) => <p key = {t} className="col-span-1 text-left truncate ">{capitalize(t)}</p>)
          }
     </div>
}

export default SurveyTagList;