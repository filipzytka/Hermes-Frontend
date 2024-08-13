import Footer from "../../components/Shared/Footer";
import NavigationBar from "../../components/Shared/NavigationBar";
import FeaturesCards from "./FeaturesCards";
import HeroBullets from "./HeroBullets";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <HeroBullets />
      <FeaturesCards />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
};

export default Home;
