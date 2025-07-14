import List from '../List.jsx';
import NewQuestionCard from './newQuestionCard.jsx';

const NewQuestionList= ({newQuestions = []}) => {


return <List list = {newQuestions} renderItem = {(newQuestion) => <NewQuestionCard newQuwstion = {newQuestion} />} />
}

export default NewQuestionList