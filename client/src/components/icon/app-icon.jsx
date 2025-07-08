import InquestiaLight from './app-light.jsx';
import InquestiaDark from './app-dark.jsx';

const Inquestia = ({className = "grid place-content-center", size = "10"}) => {
  const theme = "dark";
  
  const logos = {
    dark: <InquestiaDark /> ,
    light: <InquestiaLight />
  }

return <div className = {`${className} size-${size}`}>
  {
   logos[theme]
  }
</div>
}

export default Inquestia