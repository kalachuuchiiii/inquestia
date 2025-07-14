import List from '../List.jsx';

const CustomOption = ({handleChange, choices, answer}) => {


return <List list = {choices} className = "flex flex-col gap-1 mx-2 mb-4" renderItem = {({label, value}) => <button type = "button" className = {`${answer.includes(value) ? " border-blue-400" : "border-transparent"} border-l-2 rounded-r-xl p-2 text-left`} onClick = {handleChange} value = {value}>
  { label }
</button>} />
}

export default CustomOption