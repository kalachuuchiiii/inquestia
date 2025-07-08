import WelcomeGreet from '../../components/WelcomeGreet.jsx';
import FeatureCarousel from "../../components/FeatureCarousel.jsx";
import Footer from '../../components/Footer.jsx';

const WelcomePage = () => {


return <div className = " space-y-20">
  <WelcomeGreet />
  <FeatureCarousel />
  <Footer />
</div>
}

export default WelcomePage