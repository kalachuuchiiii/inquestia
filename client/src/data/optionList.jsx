
import Text from '../components/options/Text.jsx';
import Custom from '../components/options/Custom.jsx';


export const optionList = {
  text: (props) => <Text {...props} />,
  custom: (props) => <Custom {...props} />
}