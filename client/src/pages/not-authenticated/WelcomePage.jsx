import WelcomeGreet from '../../components/WelcomeGreet.jsx';
import FeatureCarousel from "../../components/FeatureCarousel.jsx";
import { useDispatch } from 'react-redux';
import { getSession } from '../../state/slice/user.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
   const dispatch = useDispatch()
   const nav = useNavigate();
  const isLoggedIn = async() => {
    const res = await dispatch(getSession());
    if(res?.payload?.authenticated === true){
      nav('/home')
    }
  }

  useEffect(( ) => {
   isLoggedIn()
  }, [])


return <div className = " space-y-20">
  <WelcomeGreet />
  <FeatureCarousel />
</div>
}

export default WelcomePage