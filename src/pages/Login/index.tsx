import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/user.ts";
import { useAuth } from "../../hooks/useAuth";
import UserForm from "../../components/UserForm/index.tsx";
import Footer from "../../components/Shared/Footer";
import { popUp } from "../../utils/Popup/index.ts";
import TailwindImg from "../../assets/tailwind-css-logo.png";

const Login = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setAuth, setRole, setEmail } = useAuth();

  const handleLoginData = async (email: string, password: string) => {
    const response = await LoginUser(email, password);

    if (!response.success) {
      popUp(response.message, "error");
      return;
    }
    setAuth(true);
    setRole(response.role);
    setEmail(response.email);
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
        imgUrl={TailwindImg}
        isEmailInput
        isPasswordInput
        onFormSubmit={handleLoginData}
      >
        <div className="mt-6" />
        <div className="sm:absolute sm:right-6 sm:bottom-6 flex flex-wrap justify-end items-end mt-2">
          <button className="text-sm bg-gray-700 p-2 text-slate-100 hover:bg-gray-800 w-28 rounded-lg">
            Sign in
          </button>
        </div>
      </UserForm>
      <Footer />
    </div>
  );
};

export default Login;
