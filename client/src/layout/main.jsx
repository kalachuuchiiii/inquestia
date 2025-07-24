import StarryNight from './themes/Dark.jsx';
import OceanLight from './themes/Light.jsx';
import App from '../App.jsx';
const MainTheme = ({theme = "dark"}) => {


return <div className = "w-full">
  {
    theme === "dark" ? <StarryNight /> : <OceanLight />
  }
  <div className = {` ${theme === "dark" ? " text-white placeholder-white " : " text-black placeholder-black/80 "} w-full`}>
    <App />
  </div>
</div>
}

export default MainTheme