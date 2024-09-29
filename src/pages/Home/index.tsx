import Layout from "../../components/Layout";
import { FeaturesGrid } from "./FeaturesGrid";
import { HeroTitle } from "./HeroTitle";
import { MainWrapper } from "./MainWrapper";

const Home = () => {
  return (
    <Layout>
      <MainWrapper>
        <HeroTitle />
        <FeaturesGrid />
      </MainWrapper>
    </Layout>
  );
};

export default Home;
