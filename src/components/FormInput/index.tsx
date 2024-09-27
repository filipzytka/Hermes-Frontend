import TextField from "@mui/material/TextField";
import { ReactNode } from "react";

type FormType = "email" | "password";

type Props = {
  handleChange: (value: string) => void;
  handleBlur: () => void;
  children?: ReactNode;
  placeholder?: string;
  type: FormType;
};

const FormInput = ({
  handleChange,
  handleBlur,
  children,
  type,
  placeholder,
}: Props) => {
  return (
    <div>
      <TextField
        data-cy={`${type}-input`}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        type={type}
        required
        name={type}
        placeholder={placeholder}
        autoComplete={type}
        fullWidth
        variant="outlined"
      />
      {children}
    </div>
  );
};

export default FormInput;
