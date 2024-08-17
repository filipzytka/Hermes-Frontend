import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../../components/UserForm";
import Footer from "../../components/Shared/Footer";
import { LogOutUser, RegisterUser } from "../../api/user";
import { popUp } from "../../utils/Popup";
import { UseToken, ValidateToken } from "../../api/token";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import TailwindImg from "../../assets/tailwind-css-logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);
  const [token, setToken] = useState("");
  const { loading, setLoading } = useAuth();
  const [inviter, setInviter] = useState("");

  const handleRegisterData = async (email: string, password: string) => {
    const response = await RegisterUser(email, password, token);

    if (!response.success) {
      popUp(response.message!, "error");
      return;
    }

    await UseToken(token);

    navigate("/login");
  };

  useEffect(() => {
    setLoading(true);

    const queryParams = new URLSearchParams(location.search);
    const searchedToken = queryParams.get("token");
    if (!searchedToken) {
      navigate("/login");
      return;
    }

    setToken(searchedToken);

    const validateToken = async () => {
      const response = await ValidateToken(searchedToken);
      setLoading(false);

      if (!response.success) {
        navigate("/login");
      }

      setInviter(response.createdBy);
      await LogOutUser();
    };

    validateToken();
  }, []);

  useEffect(() => {
    setVisible(false);

    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-between items-center w-full h-screen flex-col">
      <div />
      <UserForm
        visible={visible}
        mainLabel={`You have been invited by ${inviter} to create an account`}
        imgUrl={TailwindImg}
        isEmailInput
        isPasswordInput
        isRepeatPasswordInput
        onFormSubmit={handleRegisterData}
      >
        <div className="sm:absolute sm:right-6 sm:bottom-6 flex flex-wrap justify-end items-end mt-2">
          <button
            type="submit"
            className="text-sm bg-gray-800 p-2 text-slate-100 hover:bg-gray-800 w-28 rounded-md"
          >
            Sign up
          </button>
        </div>
      </UserForm>
      <Footer />
    </div>
  );
};

export default Register;
