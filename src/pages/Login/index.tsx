import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import UserForm from "../../components/UserForm/index.tsx";
import Footer from "../../components/Shared/Footer";
import { popUp } from "../../utils/Popup/index.ts";
import TailwindImg from "../../assets/tailwind-css-logo.png";
import { loginUser } from "../../api/auth.ts";
import FormWrapper from "../../components/wrapper/PageWrapper/index.tsx";
import ButtonWrapper from "../../components/wrapper/ButtonWrapper/index.tsx";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth, setRole, setEmail } = useAuth();

  const handleLoginData = async (email: string, password: string) => {
    const response = await loginUser(email, password);
    if (!response.success) {
      popUp(response.payload!.message, "error");
      return;
    }

    setAuth(true);
    setRole(response.payload!.role);
    setEmail(response.payload!.email);
    navigate("/");
  };

  return (
    <FormWrapper>
      <UserForm
        mainLabel="Sign in"
        imgUrl={TailwindImg}
        isEmailInput
        isPasswordInput
        onFormSubmit={handleLoginData}
      >
        <div className="mt-6" />
        <ButtonWrapper>
          <SignInButton />
        </ButtonWrapper>
      </UserForm>
      <Footer />
    </FormWrapper>
  );
};

const SignInButton = () => {
  return (
    <button className="text-sm bg-gray-700 p-2 text-slate-100 hover:bg-gray-800 w-28 rounded-lg">
      Sign in
    </button>
  );
};

export default Login;
