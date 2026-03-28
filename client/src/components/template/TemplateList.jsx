
import { templates } from '../../data/templates.js';
import TemplateCard from './TemplateCard.jsx';

const TemplateList = () => {
  
  
  return <div className = "flex divide-y-1 flex-col gap-4" >
    {
      templates.map((t, i) => <TemplateCard template = {t} key = {i} />)
    }
  </div>
}

export default TemplateList