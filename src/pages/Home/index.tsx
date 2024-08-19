import Footer from "../../components/Shared/Footer";
import NavigationBar from "../../components/Shared/NavigationBar";
import FeaturesCards from "./FeaturesCards";
import HeroBullets from "./HeroBullets";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <section id="hero-bullets" className="mt-8 md:mt-32">
        <HeroBullets />
      </section>
      <section id="feature-cards" className="m-6">
        <FeaturesCards />
      </section>
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
};

export default Home;
