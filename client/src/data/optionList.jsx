
import Text from '../components/options/Text.jsx';
import Custom from '../components/options/Custom.jsx';

const yesNoMaybeChoices = [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }, {
  label: "Maybe", value: "maybe"
}]
export const optionList = {
  text: (props) => <Text {...props} />,
  custom: (props) => <Custom {...props} />,
  yesNoMaybe: (props) => <Custom choices = {yesNoMaybeChoices} {...props} />
}