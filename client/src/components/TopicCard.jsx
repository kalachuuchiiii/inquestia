import { memo, useMemo } from "react";

import useSearchQuery from '../hooks/useSearchQuery.js';

const TopicCard = ({topic, setTopic}) => {
  const { compare: isSelected, setSearchQuery } = useSearchQuery({ key: "topic", initial:"technology"})
  
  const handleChangeTopic = () => {
    setSearchQuery(topic.value); 
    setTopic(topic.label);
  }

return <div role = "button" onClick = {handleChangeTopic} className = {` ${isSelected && ""} my-4 backdrop-brightness-150 text-black  truncate rounded-lg px-4 py-2`}>
  <p>{topic.label}</p>
</div>
}

export default memo(TopicCard);