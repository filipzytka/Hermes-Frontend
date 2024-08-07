import React, { ReactNode, useState } from "react";
import useForm from "../../hooks/useForm";

type Props = {
  visible: boolean;
  mainLabel: string;
  imgUrl: string;
  isEmailInput?: boolean;
  isPasswordInput?: boolean;
  isRepeatPasswordInput?: boolean;
  children: ReactNode;
  onFormSubmit?: (
    email: string,
    password: string,
    repeatPassword?: string
  ) => void;
};

const UserForm = ({
  visible,
  mainLabel,
  imgUrl,
  isEmailInput,
  isPasswordInput,
  isRepeatPasswordInput,
  onFormSubmit,
  children,
}: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { errors, handleChange, validate } = useForm();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !validate(
        email,
        password,
        isRepeatPasswordInput ? repeatPassword : undefined
      )
    )
      return;
    onFormSubmit!(
      email,
      password,
      isRepeatPasswordInput ? repeatPassword : undefined
    );
  };

  return (
    <div className="flex flex-col bg-slate-100 shadow-lg w-screen h-screen rounded-md sm:relative sm:max-w-96 sm:max-h-96 sm:my-10">
      <form
        noValidate
        className="mx-10 my-6 w-auto"
        onSubmit={handleFormSubmit}
      >
        <img alt="" src={imgUrl} className="h-8 w-8 object-contain mb-2"></img>
        <div
          className={`transition-all duration-300 ${
            visible ? "opacity-1" : "opacity-0"
          }`}
        >
          <h2 className="text-left pb-4 font-medium text-xl">{mainLabel}</h2>
          {isEmailInput && (
            <>
              <input
                autoComplete="on"
                id="email-input"
                type="email"
                className={`bg-slate-100 text-sm outline-none border-b-2 border-gray-400 focus:border-gray-600 block w-full text-left mt-2 ${
                  errors.email && `border-red-500 focus:border-red-600`
                }
                `}
                placeholder="E-mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleChange("email", e.target.value);
                }}
              ></input>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 break-words whitespace-normal">
                  {errors.email}
                </p>
              )}
            </>
          )}
          {isPasswordInput && (
            <>
              <input
                autoComplete="on"
                id="password-input"
                type="password"
                className={`bg-slate-100 text-sm outline-none border-b-2 border-gray-400 focus:border-gray-600 block w-full mt-6 ${
                  errors.password && `border-red-500 focus:border-red-600`
                }
                `}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleChange("password", e.target.value);
                }}
              ></input>
              {errors.password && (
                <p className="text-red-600 text-sm mt-2 text-wrap w-72">
                  {errors.password}
                </p>
              )}
            </>
          )}
          {isRepeatPasswordInput && (
            <input
              autoComplete="on"
              id="repeat-password-input"
              type="password"
              className="bg-slate-100 text-sm outline-none border-b-2 border-gray-400 focus:border-gray-600 block w-full mt-6"
              placeholder="Confirm password"
              onChange={(e) => {
                setRepeatPassword(e.target.value);
                handleChange("repeatPassword", e.target.value, password);
              }}
            ></input>
          )}
          {errors.repeatPassword && (
            <p className="text-red-600 text-sm mt-2 text-wrap w-72">
              {errors.repeatPassword}
            </p>
          )}
          {children}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
