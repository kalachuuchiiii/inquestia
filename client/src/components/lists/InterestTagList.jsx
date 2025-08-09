import { interests } from '../../data/interests.js';
import { capitalize } from '../../utils/capitalize.js';

const InterestTagList = ({ selected = [], select = () => {}}) => {


return <div className = "grid w-full grid-cols-2  rounded-lg">
{
  interests.map((interest, i) => <div role = "button" onClick = {() => select(interest)} key = {i}
  className = {` ${i % 2 !== 0 && 'translate-y-8'} ${ selected?.includes(interest) && ' backdrop-brightness-200  animate-pulse'}  p-2 border-l-1 border-l-white`}>
 {capitalize(interest)}
  </div>)
}
</div>
}

export default InterestTagList