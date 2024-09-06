import { ReactNode } from "react";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavigationBar />
      {children}
      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Layout;
