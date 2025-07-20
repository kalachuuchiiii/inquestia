import { optionList } from '../../data/optionList.jsx';

const Option = ({questionData = {}, readOnly = false, handleChange = () => {}, answer = []}) => {
  const { option } = questionData
  
  
 const options = {
    text: () => optionList["text"]({ handleChange, readOnly, value: answer}), 
    custom: () => optionList["custom"]({
      handleChange, choices: questionData.choices?.list, answer
    })
  }
  
  const optionToRender = options[option]();
  
  
return <div className = "">
  {optionToRender}
</div>
}

export default Option