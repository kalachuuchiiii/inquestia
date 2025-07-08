import { memo, useMemo } from "react";

import useSearchQuery from '../hooks/useSearchQuery.js';

const TopicCard = ({topic}) => {
  const { compare: isSelected, setSearchQuery } = useSearchQuery({ key: "topic", initial:"technology"})

return <div role = "button" onClick = {() => setSearchQuery(topic.value)} className = {` ${isSelected && ""} my-4 bg-zinc-100  truncate rounded-lg px-4 py-2`}>
  <p>{topic.label}</p>
</div>
}

export default memo(TopicCard);