import { topics } from '../data/topics.js';
import TopicCard from './TopicCard.jsx';
import List from './List.jsx';
import { MdEdit } from "react-icons/md";

const TopicsList = ({setTopic}) => {


return <div className = "w-full overflow-x-auto scrollbar-none p-1  text-white">
  <div className = "flex gap-2 items-center w-max">
      <p className = "mx-4 font-bold italic text-lg truncate">Topics</p>
  <List list = {topics} className = "w-max flex gap-2  items-center" renderItem = {(topic) => <TopicCard setTopic = {setTopic} topic = {topic} />} />
  <button className = "p-2 text-2xl "><MdEdit /></button>
  </div>
</div>
}

export default TopicsList