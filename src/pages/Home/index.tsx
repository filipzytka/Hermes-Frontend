import Footer from "../../components/Shared/Footer";
import NavigationBar from "../../components/Shared/NavigationBar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
};

export default Home;
