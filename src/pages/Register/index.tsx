import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "../../components/UserForm";
import Footer from "../../components/Shared/Footer";
import { RegisterUser } from "../../services/user-service";
import { popUp } from "../../utils";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);

  const handleRegisterData = async (email: string, password: string) => {
    const response = await RegisterUser(email, password);

    if (!response.success) {
      popUp(response.error.message, "error");
      return;
    }
    navigate("/login");
  };

  useEffect(() => {
    setVisible(false);

    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  return (
    <div className="flex justify-between items-center w-full h-screen flex-col">
      <div />
      <UserForm
        visible={visible}
        mainLabel="Create account"
        imgUrl="https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png"
        isEmailInput
        isPasswordInput
        isRepeatPasswordInput
        onFormSubmit={handleRegisterData}
      >
        <div className="mt-6">
          <h4 className="text-xs text-left pe-1 inline">
            Already have an account?
          </h4>
          <Link
            to="/login"
            className="text-xs text-left pe-1 m-0 inline text-sky-700 cursor-pointer hover:text-sky-800"
          >
            Sign in
          </Link>
        </div>
        <div className="sm:absolute sm:right-6 sm:bottom-6 flex flex-wrap justify-end items-end mt-2">
          <button
            type="submit"
            className="text-sm dark:bg-gray-800 p-2 text-slate-100 hover:dark:bg-gray-800 w-28 rounded-md"
          >
            Sign up
          </button>
        </div>
      </UserForm>
      <Footer />
    </div>
  );
};

export default RegisterPage;
