
import { useEffect } from 'react';
import App from '../App.jsx';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer.jsx';

const MainTheme = () => {

  const { mode } = useSelector((state) => state.theme);
  console.log(mode);

  useEffect(() => {
    if (mode === 'Dark') {
      document.documentElement.classList.add('dark');

    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);




return (
  <div className={` flex flex-col transition-colors duration-200 min-h-screen w-full`}>
    <div>
      <App />

    </div>
  </div>
);
}

export default MainTheme