import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

type Props = {
  children: ReactNode;
};

const ToasterWrapper = ({ children }: Props) => {
  return (
    <>
      <Toaster position="bottom-right" />
      {children}
    </>
  );
};

export default ToasterWrapper;
