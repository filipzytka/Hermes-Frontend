import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const FormWrapper = ({ children }: Props) => {
  return (
    <div className="flex justify-between items-center w-full h-screen flex-col">
      <div />
      {children}
    </div>
  );
};

export default FormWrapper;
