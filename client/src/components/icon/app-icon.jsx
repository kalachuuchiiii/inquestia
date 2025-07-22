import InquestiaLight from './app-light.jsx';
import InquestiaDark from './app-dark.jsx';

const Inquestia = ({className = "grid place-content-center", size = "10", theme = "dark"}) => {
  
  const logos = {
    dark: <InquestiaDark /> ,
    light: <InquestiaLight />
  }

return <div className = {`${className} max-w-30 max-h-30 size-${size}`}>
  {
   logos[theme]
  }
</div>
}

export default Inquestia