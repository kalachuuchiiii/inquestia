import { topics } from '../data/topics.js';
import TopicCard from './TopicCard.jsx';
import { MdEdit } from "react-icons/md";

const TopicsList = ({ setTopic }) => {


  return <div className="w-full overflow-x-auto scrollbar-none p-1 ">
    <div className="flex gap-2 items-center w-max">
      <p className="px-2">Topics</p>
      <div className="w-max flex gap-2 items-center">
        {topics.map((topic, index) => (
          <TopicCard key={index} setTopic={setTopic} topic={topic} />
        ))}
      </div>
      <button className="p-2 text-2xl "><MdEdit /></button>
    </div>
  </div>
}

export default TopicsList