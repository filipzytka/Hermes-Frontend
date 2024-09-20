import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

type Props = {
  children: ReactNode;
};

const ToasterWrapper = ({ children }: Props) => {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  );
};

export default ToasterWrapper;
