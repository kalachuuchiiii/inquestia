import TextCard from '../card/answerQuestion/TextCard.jsx';
import SelectCard from '../card/answerQuestion/SelectCard.jsx';
const AnswerQuestionList = ({questionList = []}) => {
  
  const questionCard = {
    text: (q, i) => <TextCard  question = {q} index = {(i + 1)}/>, 
    select: (q, i) => <SelectCard question = {q} index = {(i + 1)} />
  }


return <div className = " " >
  <div className = "text-sm px-2 opacity-50">Questions provided for you:</div>
  {
    questionList.map((q, i) => questionCard[q.type](q, i))
  }
</div>
}

export default AnswerQuestionList