import Layout from "../../components/Layout";
import { FeaturesGrid } from "./FeaturesGrid";
import { HeroTitle } from "./HeroTitle";

const Home = () => {
  return (
    <Layout>
      <HeroTitle />
      <FeaturesGrid />
    </Layout>
  );
};

export default Home;
