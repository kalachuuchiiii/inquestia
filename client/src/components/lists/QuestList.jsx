import QuestCard from '../card/QuestCard.jsx';

const QuestList = ({quests = [], className = 'flex flex-col gap-4 w-full', JSXPlaceholder = null}) => {


return <div className = {`${className} `} >
  {
    quests?.length > 0 ? quests.map((quest) => <QuestCard quest = {quest} />) : JSXPlaceholder
  }
</div>
}

export default QuestList