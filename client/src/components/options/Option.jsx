import { optionList } from '../../data/optionList.jsx';

const Option = ({formField, handleChange, answer}) => {
  const { choices: {list}, option } = formField
  
  
 const options = {
    text: () => optionList["text"]({ handleChange, value: answer}), 
    custom: () => optionList["custom"]({
      handleChange, choices: list, answer
    })
  }
  
  const optionToRender = options[option]();
  
  
return <div className = "mb-6 mt-1 py-2 border-l-2 border-l-blue-200">
  {optionToRender}
</div>
}

export default Option