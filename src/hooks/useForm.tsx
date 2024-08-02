import { useState } from "react";

const useForm = () => {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && email) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address." }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,30}$/;
    if (!passwordRegex.test(password) && password) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be 8-30 characters, include one capital letter and one number.",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, password: "" }));
    return true;
  };

  const validateRepeatPassword = (password: string, repeatPassword: string) => {
    if (password !== repeatPassword && repeatPassword && password) {
      setErrors((prev) => ({
        ...prev,
        repeatPassword: "Passwords must be the same",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, repeatPassword: "" }));
    return true;
  };

  const validate = (
    email: string,
    password: string,
    repeatPassword?: string
  ) => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isRepeatPasswordValid = repeatPassword
      ? validateRepeatPassword(password, repeatPassword)
      : true;

    if (isEmailValid && isPasswordValid && isRepeatPasswordValid) return true;

    return false;
  };

  const handleChange = (input: string, value: string, password?: string) => {
    switch (input) {
      case "email":
        validateEmail(value);
        break;
      case "password":
        validatePassword(value);
        break;
      case "repeatPassword":
        validateRepeatPassword(password!, value);
        break;
    }
  };

  return {
    errors,
    handleChange,
    validate,
  };
};

export default useForm;
