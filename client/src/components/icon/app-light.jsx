import inquestiaLightFile from "../../../public/inquestia-light.webp";

const InquestiaLight = ({className = "w-full h-full"}) => {


return <div className = {className}>
  <img className = "w-full h-full object-cover" src = {inquestiaLightFile} alt = "Inquestia" />
</div>
}

export default InquestiaLight