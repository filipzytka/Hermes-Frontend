import { ReactNode, useState } from "react";
import ReactDOM from "react-dom";
import { popUp } from "../../utils/Popup";
import { generateToken } from "../../api/token";
import { useAuth } from "../../hooks/useAuth";
import { FaAddressBook } from "react-icons/fa";
import InvitationModalForm from "./Form/InvitationModalForm";

type Props = {
  isShowing: boolean;
  onSend: (username: string, token: string) => void;
  onClose: () => void;
};

const InvitationModal = ({ isShowing, onSend, onClose }: Props) => {
  const [inputEmail, setInputValue] = useState("");
  const { email } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await generateToken(email);

    if (!response.success) {
      return;
    }

    const generatedToken = response.payload!.token;

    onSend(inputEmail, generatedToken!);

    popUp("Invitation has been sent successfully", "success");
    onClose();
  };

  return isShowing
    ? ReactDOM.createPortal(
        <>
          <InvitationModalWrapper>
            <div className="absolute right-4 top-4">
              <CloseButton handler={onClose} />
            </div>
            <InvitationModalHeader />
            <InvitationModalForm
              submitHandler={handleSubmit}
              emailChangeHandler={setInputValue}
            />
          </InvitationModalWrapper>
        </>,
        document.getElementById("modal-root") as HTMLElement
      )
    : null;
};

type CloseBtnProps = {
  handler: () => void;
};

const CloseButton = ({ handler }: CloseBtnProps) => {
  return (
    <button onClick={handler}>
      <svg
        className="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  );
};

type InvitationModalWrapperProps = {
  children: ReactNode;
};

const InvitationModalWrapper = ({ children }: InvitationModalWrapperProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      <main
        id="content"
        role="main"
        className="fixed inset-0 flex justify-center items-center z-50"
      >
        <div className="relative mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-900 dark:border-gray-700 px-5 py-5">
          {children}
        </div>
      </main>
    </>
  );
};

const InvitationModalHeader = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center">
        <FaAddressBook className="dark:text-white text-cyan-600 w-10 h-10" />
      </div>
      <h1 className="block text-2xl  text-gray-800 dark:text-white mt-2">
        Invite a collaborator to Hermes
      </h1>
    </>
  );
};

export default InvitationModal;
