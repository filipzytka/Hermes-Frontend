import Layout from "../../components/Layout";
import { FeaturesGrid } from "./FeaturesGrid";
import { HeroTitle } from "./HeroTitle";

const Home = () => {
  return (
    <Layout>
      <main data-cy="hero" className="mx-6">
        <HeroTitle />
        <FeaturesGrid />
      </main>
      <div className="flex-grow"></div>
    </Layout>
  );
};

export default Home;
