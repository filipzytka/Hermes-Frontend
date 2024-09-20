import Layout from "../../components/Layout";
import { FeaturesGrid } from "./FeaturesGrid";
import { HeroTitle } from "./HeroTitle";

const Home = () => {
  return (
    <Layout>
      <section data-cy="hero" id="hero" className="mx-6">
        <HeroTitle />
        <FeaturesGrid />
      </section>
      <div className="flex-grow"></div>
    </Layout>
  );
};

export default Home;
