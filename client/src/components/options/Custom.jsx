import List from '../List.jsx';

const CustomOption = ({handleChange = () => {}, choices = {}, answer = []}) => {


return <div>
  <p className = "text-xs m-2">Choices</p>
  <List list = {choices} className = "flex flex-col gap-2  py-2  mx-2 mb-4" renderItem = {({label, value}) => <button type = "button" className = {`${answer.includes(value) ? " bg-blue-100 outline outline-blue-400" : "outline-none bg-neutral-50"} shadow-sm rounded-lg px-6 py-3 truncate text-left`} onClick = {handleChange} value = {value}>
  { label }
</button>} />
</div>
}

export default CustomOption