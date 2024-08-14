import { useMantineColorScheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";

type Props = {
  children: ReactNode;
};

const ToasterWrapper = ({ children }: Props) => {
  const { setColorScheme } = useMantineColorScheme();
  const preferredColorScheme = useColorScheme();

  useEffect(() => {
    setColorScheme(preferredColorScheme);
  }, [preferredColorScheme, setColorScheme]);
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  );
};

export default ToasterWrapper;
