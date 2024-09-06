import Layout from "../../components/Layout";
import HeroBullets from "./HeroBullets";

const Home = () => {
  return (
    <Layout>
      <section id="hero-bullets" className="mt-8 md:mt-32 mx-6">
        <HeroBullets />
      </section>
      {/* <section id="feature-cards">
        <FeaturesCards />
      </section> */}
      <div className="flex-grow"></div>
    </Layout>
  );
};

export default Home;
