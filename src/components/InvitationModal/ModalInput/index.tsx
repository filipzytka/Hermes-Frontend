import { useState } from "react";
import { Autocomplete } from "@mantine/core";

type Props = {
  onEmailChange: (email: string) => void;
};

const ModalInput = ({ onEmailChange }: Props) => {
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    setData([]);
    onEmailChange(val);
  };
  return <Autocomplete data={data} onChange={handleChange} />;
};

export default ModalInput;
