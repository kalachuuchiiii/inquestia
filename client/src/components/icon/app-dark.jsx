import inquestiaDarkFile from "../../../public/inquestia-dark.webp";

const InquestiaDark = ({className = ""}) => {


return <div className = {className}>
  <img className = "w-full h-full object-cover"  src = {inquestiaDarkFile} alt = "Inquestia" />
</div>
}

export default InquestiaDark