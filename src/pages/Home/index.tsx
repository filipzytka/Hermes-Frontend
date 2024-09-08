import Layout from "../../components/Layout";
import HeroBullets from "./HeroBullets";

const Home = () => {
  return (
    <Layout>
      <section
        data-cy="hero-bullets"
        id="hero-bullets"
        className="mt-8 md:mt-32 mx-6"
      >
        <HeroBullets />
      </section>
      <div className="flex-grow"></div>
    </Layout>
  );
};

export default Home;
