import ModalStyle from './ModalStyle.jsx';

const questionPreset = {
    text: {
     question: '', 
     answer: '', 
     type: 'text', 
     isRequired: false
    }, 
    select: {
      question: '', 
      answers: [], 
      multipleChoice: false, 
      choices: [],
      type: 'select',
      isRequired: false
    }
  }
  

const NewQuestion = ({onClose = () => {}, addQuestion = () => {}}) => {
  
  const handleAddQuestion = (e) => {
    const { value } = e.target; 
    const selectedPreset = questionPreset[value];
    addQuestion(selectedPreset);
    onClose();
  }

const buttonStyle = 'w-full p-2 '
return <ModalStyle onClose = {onClose} label = "Add a new question">
  <p>In which way you want the respondents to answer?</p>
  <div className = "flex divide-y-1 flex-col items-start gap-2 ">
    <button onClick = {handleAddQuestion} value = "text" className = {buttonStyle}>By typing their answer</button>
    <button onClick = {handleAddQuestion} value = "select" className = {buttonStyle}>By selecting custom options</button>
  </div>
</ModalStyle>
}

export default NewQuestion