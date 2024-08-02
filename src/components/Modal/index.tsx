import { useState } from "react";
import ReactDOM from "react-dom";
import { popUp } from "../../utils";

type Props = {
  title: string;
  inputLabel: string;
  inputType: string;
  buttonLabel: string;
  isShowing: boolean;
  onButtonClick: (input: string) => void;
  onClose: () => void;
};

const Modal = ({
  title,
  inputLabel,
  inputType,
  buttonLabel,
  isShowing,
  onButtonClick,
  onClose,
}: Props) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onButtonClick(inputValue);
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
              <div className="px-8 py-16 sm:px-14">
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
                <div className="flex justify-between text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    {title}
                  </h1>
                </div>
                <div className="mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-y-4">
                      <div>
                        <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                          {inputLabel}
                        </label>
                        <div className="relative">
                          <input
                            onChange={handleInputChange}
                            type={inputType}
                            className="py-3 px-4 block w-full sm:w-72 border-2
                             border-gray-200 rounded-md text-sm
                             focus:border-cyan-600
                             focus:ring-cyan-700 shadow-sm
                             outline-none"
                            required
                          ></input>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold
                      bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      transition-all text-sm dark:focus:ring-offset-gray-800"
                      >
                        {buttonLabel}
                      </button>
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

export default Modal;
