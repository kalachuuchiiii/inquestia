import { optionList } from '../../data/optionList.jsx';

const Option = ({questionData, handleChange, answer}) => {
  const { option } = questionData
  
  
 const options = {
    text: () => optionList["text"]({ handleChange, value: answer}), 
    custom: () => optionList["custom"]({
      handleChange, choices: questionData.choices?.list, answer
    })
  }
  
  const optionToRender = options[option]();
  
  
return <div className = "mb-6 mt-1 py-2 border-l-2 border-l-blue-200">
  {optionToRender}
</div>
}

export default Option