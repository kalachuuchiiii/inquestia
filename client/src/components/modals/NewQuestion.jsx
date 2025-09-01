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

const buttonStyle = 'w-full p-2 rounded-lg text-zinc-900 dark:text-neutral-100 hover:bg-neutral-200 hover:dark:bg-zinc-700 transition-all';
return (
  <ModalStyle onClose={onClose} label="Add a new question">
         <p className="w-full text-sm text-center">
        In which way you want the respondents to answer?
      </p>
    <div className=" flex-col items-start gap-2 ">
 
      <button onClick={handleAddQuestion} value="text" className={buttonStyle}>
        By text answer
      </button>
      <button
        onClick={handleAddQuestion}
        value="select"
        className={buttonStyle}
      >
       By selecting an option
      </button>
    </div>
  </ModalStyle>
);
}

export default NewQuestion