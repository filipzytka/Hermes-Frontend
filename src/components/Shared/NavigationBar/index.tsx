import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { logOutUser } from "../../../api/user";
import TailwindImg from "../../../assets/tailwind-css-logo.png";

const NavigationBar = () => {
  const { setAuth, role } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await logOutUser();
    setAuth(false);
    navigate("/login");
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="dark:bg-gray-900 w-full mt-8">
      <div className="max-w-screen-xl flex flex-nowrap md:flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={TailwindImg} className="h-8" alt="Hermes logo" />
          <span className="text-2xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">
            Hermes
          </span>
        </Link>
        <div className="flex gap-8">
          <button
            onClick={handleMenuToggle}
            type="button"
            className="flex items-center p-2 w-10 h-10 justify-center text-sm
               text-gray-800 rounded-lg md:hidden
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
          <Link
            to="/"
            className="hidden md:block dark:text-gray-100 text-gray-800 text-xl hover:text-cyan-600"
          >
            Home
          </Link>
          {role === "admin" ? (
            <div className="relative hidden md:block">
              <button
                onClick={handleDropdownToggle}
                className="dark:text-gray-100 text-gray-800 text-xl hover:text-cyan-600 flex items-center"
              >
                Collaborators
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div
                  className="absolute z-10 mt-2 bg-white divide-y divide-gray-100
                 rounded-lg shadow w-full dark:bg-gray-700
                  dark:divide-gray-600"
                >
                  <ul className="text-gray-700 dark:text-gray-300">
                    <li>
                      <Link
                        to="/collaborators"
                        className="block px-4 py-2 hover:bg-cyan-50 dark:hover:bg-gray-600
                        dark:hover:text-white rounded-t-lg"
                      >
                        Manage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/statistics"
                        className="block px-4 py-2 hover:bg-cyan-50
                        dark:hover:bg-gray-600 dark:hover:text-white rounded-b-lg"
                      >
                        Statistics
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : null}
          <Link
            to="/faq"
            className="hidden md:block dark:text-gray-100 text-gray-800 text-xl hover:text-cyan-600"
          >
            FAQ
          </Link>
        </div>
        <button
          onClick={handleSignOut}
          className="hidden md:block dark:text-gray-100 text-gray-800 text-xl hover:text-cyan-600"
        >
          Sign out
        </button>
      </div>
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-white dark:bg-black/95 bg-opacity-95
          transition-transform transform font-bold text-xl ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } z-30`}
      >
        <div className="flex items-center justify-end p-6 mt-8">
          <button
            onClick={handleMenuToggle}
            type="button"
            className="text-gray-800 dark:text-white"
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
            {role === "admin" ? (
              <>
                <Link
                  to="/collaborators"
                  className="block py-2 px-3 rounded md:hover:bg-transparent
                md:hover:text-cyan-600 md:p-0
                md:dark:hover:text-cyan-600 dark:text-white text-gray-800"
                >
                  Manage collaborators
                </Link>
                <Link
                  to="/statistics"
                  className="block py-2 px-3 rounded md:hover:bg-transparent
                md:hover:text-cyan-600 md:p-0
                md:dark:hover:text-cyan-600 dark:text-white text-gray-800"
                >
                  Statistics
                </Link>
              </>
            ) : null}
            <Link
              to="/faq"
              className="block py-2 px-3 rounded md:hover:bg-transparent
                md:hover:text-cyan-600 md:p-0
                md:dark:hover:text-cyan-600 dark:text-white text-gray-800"
            >
              FAQ
            </Link>
            <button
              onClick={handleSignOut}
              className="block py-2 px-3 rounded md:hover:bg-transparent
              md:hover:text-cyan-600 md:p-0
              md:dark:hover:text-cyan-600 dark:text-white text-gray-800"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
