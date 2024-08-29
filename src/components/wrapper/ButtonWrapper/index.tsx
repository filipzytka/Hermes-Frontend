import { ReactNode } from "react";

const ButtonWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`sm:absolute sm:right-6 sm:bottom-6 flex flex-wrap justify-end items-end mt-2`}
    >
      {children}
    </div>
  );
};

export default ButtonWrapper;
