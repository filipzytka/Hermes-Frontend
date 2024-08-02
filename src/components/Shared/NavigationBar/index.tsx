import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { LogOutUser } from "../../../services/user-service";
import Modal from "../../Modal";
import { SendEmail } from "../../../services/email-service";
import { render } from "@react-email/components";
import Welcome from "../../Email/Welcome";
import useModal from "../../../hooks/useModal";

const NavigationBar = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isShowing, setIsShowing, toggle } = useModal();

  const handleSignOut = async () => {
    navigate("/login");
    await LogOutUser();
    setAuth(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleShare = () => {
    setMenuOpen(false);
    toggle();
  };

  const handleSendEmail = async (email: string) => {
    const html = render(<Welcome username={email}></Welcome>);
    console.log(email);
    await SendEmail(email, html);
    setIsShowing(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full top-0 start-0 mt-8">
      <div className="max-w-screen-xl flex flex-nowrap md:flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png"
            className="h-8"
            alt="Hermes logo"
          />{" "}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Hermes
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-8">
          <button
            onClick={handleMenuToggle}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm
               text-gray-500 rounded-lg md:hidden
               hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200
               dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            {!menuOpen && (
              <svg
                className="w-5 h-5 outline-none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            )}
          </button>
          <button
            onClick={handleShare}
            className="hidden md:block text-white text-xl hover:text-cyan-600"
          >
            Add collaborator
          </button>
          <button
            onClick={handleSignOut}
            className="hidden md:block text-white text-xl hover:text-cyan-600"
          >
            Sign out
          </button>
        </div>
      </div>
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-black/95 bg-opacity-95
          transition-transform transform font-bold text-xl ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } z-30`}
      >
        <div className="flex items-center justify-end p-6 mt-8">
          <button
            onClick={handleMenuToggle}
            type="button"
            className="text-white"
          >
            <svg
              className="w-6 h-6"
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
        <ul className="flex flex-col items-start ms-10 mt-8 space-y-4">
          <li>
            <button
              onClick={handleShare}
              className="block py-2 px-3 rounded md:hover:bg-transparent md:hover:text-cyan-600 md:p-0 md:dark:hover:text-cyan-600 text-white"
            >
              Add collaborator
            </button>
            <button
              onClick={handleSignOut}
              className="block py-2 px-3 rounded md:hover:bg-transparent md:hover:text-cyan-600 md:p-0 md:dark:hover:text-cyan-600 text-white"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
      <Modal
        title="Invite collaborator"
        inputLabel="Email"
        inputType="email"
        buttonLabel="Send"
        isShowing={isShowing}
        onButtonClick={handleSendEmail}
        onClose={toggle}
      />
    </nav>
  );
};

export default NavigationBar;
