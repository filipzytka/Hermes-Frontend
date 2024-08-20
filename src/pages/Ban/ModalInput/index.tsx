import { useState, useRef } from "react";
import { Autocomplete } from "@mantine/core";

type Props = {
  onValueChange: (email: string) => void;
  placeholder: string;
};

const ModalInput = ({ onValueChange, placeholder }: Props) => {
  const timeoutRef = useRef<number>(-1);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setData([]);
    onValueChange(val);
  };
  return (
    <Autocomplete
      data={data}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default ModalInput;
