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

const buttonStyle = 'mx-auto hover:backdrop-brightness-90 p-2 rounded w-full my-1';
return (
  <ModalStyle onClose={onClose} label="Add a new question">
         <p className="w-full text-sm text-center">
        In which way you want the respondents to answer?
      </p>
    <div className=" flex items-start gap-2 ">
 
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