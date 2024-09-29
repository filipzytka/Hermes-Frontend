import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const MainWrapper = ({ children }: Props) => {
  return (
    <main data-cy="hero" className="mx-6">
      {children}
    </main>
  );
};
