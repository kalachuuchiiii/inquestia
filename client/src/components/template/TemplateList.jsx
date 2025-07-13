import List from '../List.jsx';
import { templates } from '../../data/templates.js';
import TemplateCard from './TemplateCard.jsx';

const TemplateList = () => {


return <List className = "flex divide-y-1 flex-col gap-4" list = {templates} renderItem = {(template) => <TemplateCard template = {template} />} />
}

export default TemplateList