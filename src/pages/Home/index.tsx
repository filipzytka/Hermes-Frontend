import Layout from "../../components/Layout";
import { FeaturesGrid } from "./HeroBullets/FeaturesGrid";
import { HeroTitle } from "./HeroBullets/HeroTitle";

const Home = () => {
  return (
    <Layout>
      <section data-cy="hero-bullets" id="hero-bullets" className="mx-6">
        <HeroTitle />
        <FeaturesGrid />
      </section>
      <div className="flex-grow"></div>
    </Layout>
  );
};

export default Home;
