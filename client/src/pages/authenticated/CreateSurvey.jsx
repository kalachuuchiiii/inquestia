import TemplateList from '../../components/template/TemplateList.jsx';
import Option from '../../components/options/Option.jsx';
import { useEffect, useState } from 'react';
import UserIcon from '../../components/UserIcon.jsx';
import user from '../../data/user.js';
import NewQuestionList from '../../components/newQuestion/newQuestionList.jsx'
const CreateSurvey = () => {
  const [survey, setSurvey] = useState([{
    question: "",
    option: "text", 
    choices: []
  }]);
  

return <div className = "p-3">
  <UserIcon user = {user}>
    <UserIcon.Card >
      <p className = "text-sm">New Survey</p>
    </UserIcon.Card>
  </UserIcon>
<NewQuestionList newQuestions = {survey} />
</div>
}

export default CreateSurvey