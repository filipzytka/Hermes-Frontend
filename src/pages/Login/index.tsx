import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../services/user-service";
import { useAuth } from "../../hooks/useAuth";
import UserForm from "../../components/UserForm/index.tsx";
import Footer from "../../components/Shared/Footer";
import { popUp } from "../../utils/index.ts";

const Login = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setAuth, setRole } = useAuth();

  const handleLoginData = async (email: string, password: string) => {
    const response = await LoginUser(email, password);

    if (!response.success) {
      popUp(response.error.message, "error");
      return;
    }
    setAuth(true);
    setRole(response.role);
    navigate("/");
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
        mainLabel="Sign in"
        imgUrl="https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png"
        isEmailInput
        isPasswordInput
        onFormSubmit={handleLoginData}
      >
        <div className="mt-6">
          <h4 className="text-xs text-left pe-1 inline">No account?</h4>
          <Link
            to="/register"
            className="text-xs text-left pe-1 m-0 inline text-sky-700 cursor-pointer hover:text-sky-800"
          >
            Create new account
          </Link>
        </div>
        <div className="mt-2">
          <h4 className="text-xs text-left pe-1 inline">Forgot password?</h4>
          <Link
            to="/forgetpassword"
            className="text-xs text-left pe-1 m-0 inline text-sky-700 cursor-pointer hover:text-sky-800"
          >
            New password
          </Link>
        </div>
        <div className="sm:absolute sm:right-6 sm:bottom-6 flex flex-wrap justify-end items-end mt-2">
          <button className="text-sm dark:bg-gray-700 p-2 text-slate-100 hover:dark:bg-gray-800 w-28 rounded-md">
            Sign in
          </button>
        </div>
      </UserForm>
      <Footer />
    </div>
  );
};

export default Login;
