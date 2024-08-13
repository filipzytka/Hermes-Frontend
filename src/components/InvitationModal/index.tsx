import { useState } from "react";
import ReactDOM from "react-dom";
import { popUp } from "../../utils/Popup";
import { GenerateToken } from "../../services/token-service";
import { useAuth } from "../../hooks/useAuth";
import { FaAddressBook } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

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
    const response = await GenerateToken(email);

    if (!response.success) {
      return;
    }

    const generatedToken = response.token;

    onSend(inputEmail, generatedToken);

    popUp("Invitation has been sent successfully", "success");
    onClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  return isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
          <main
            id="content"
            role="main"
            className="fixed inset-0 flex justify-center items-center z-50"
          >
            <div className="relative mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <div className="px-5 py-5">
                <div className="absolute right-4 top-4">
                  <button onClick={onClose}>
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
                </div>
                <div className="flex flex-col justify-center items-center text-center">
                  <FaAddressBook className="dark:text-white text-cyan-600 w-10 h-10" />
                </div>
                <h1 className="block text-2xl  text-gray-800 dark:text-white mt-2">
                  {"Add a collaborator to Hermes"}
                </h1>
                <div className="mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-4">
                      <div>
                        <label className="block text-sm font-semibold ml-1 mb-3 dark:text-white text-gray-800">
                          {"Search by email"}
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <CiSearch />
                          </span>
                          <input
                            autoComplete="on"
                            placeholder="Find people"
                            onChange={handleInputChange}
                            type="email"
                            className="py-1 pl-8 pr-4 block w-full border-2
                             border-gray-500 rounded-md text-sm
                             focus:border-cyan-600
                             focus:ring-cyan-700 shadow-sm
                             outline-none dark:bg-gray-800 bg-slate-50 dark:text-white text-gray-800"
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <button
                          type="submit"
                          className="py-1 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold
                            bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            transition-all text-sm dark:focus:ring-offset-gray-800 max-w-20"
                        >
                          {"Send"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </>,
        document.getElementById("modal-root") as HTMLElement
      )
    : null;
};

export default InvitationModal;
