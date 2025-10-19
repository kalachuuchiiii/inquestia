import WelcomeGreet from '../../components/WelcomeGreet.jsx';
import FeatureCarousel from "../../components/FeatureCarousel.jsx";
import { useDispatch } from 'react-redux';
import { getSession } from '../../state/slice/user.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingDisplay from '../../components/html/LoadingDisplay.jsx';
import { fetchApi } from '../../utils/fetchApi.js';

const WelcomePage = () => {
   const dispatch = useDispatch();
   const [hasLoaded, setHasLoaded] = useState(false);
   const nav = useNavigate();
  const isLoggedIn = async() => {
    const res = await fetchApi('post', '/user/is-logged-in');
    setHasLoaded(true);
    if(res?.isLoggedIn === true){
      nav('/home')
    }
  }

  useEffect(( ) => {
   isLoggedIn()
  }, [])


return hasLoaded ? <div className = " space-y-20">
  <WelcomeGreet />
  <FeatureCarousel />
</div> : <LoadingDisplay>Looking for sessions...</LoadingDisplay>
}

export default WelcomePage