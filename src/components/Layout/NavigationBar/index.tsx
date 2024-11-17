import { useState } from "react";
import { Link } from "react-router-dom";
import TailwindImg from "../../../assets/tailwind-css-logo.png";
import { logoutUser } from "../../../api/auth";
import { useAuth } from "../../../hooks/useAuth";
import { popUp } from "../../../utils/Popup";
import { useMutation } from "@tanstack/react-query";

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { auth, setAuth } = useAuth();

  const { mutateAsync: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => logoutUser(),
    onSuccess: async () => {
      popUp("Signed out successfully", "success");
      setAuth(false);
    },
  });

  const handleSignOut = async () => {
    await logoutMutate();
    setMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="w-full mt-8">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-6">
        <Link to="/" className="flex items-center">
          <img src={TailwindImg} className="h-8 m-1 p-1" alt="Hermes logo" />
          <span className="text-2xl font-semibold whitespace-nowrap text-white">
            Hermes
          </span>
        </Link>

        <div className="flex items-center">
          <button
            onClick={handleMenuToggle}
            type="button"
            className="flex items-center justify-center text-sm
            text-red rounded-lg md:hidden
             focus:outline-none focus:ring-2 
           text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
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
          <div className="hidden md:flex gap-8">
            {auth && (
              <Link
                data-cy="link-dashboard"
                to="/admin/dashboard/home"
                className="text-gray-100 text-xl hover:text-cyan-600"
              >
                Dashboard
              </Link>
            )}
            <Link
              data-cy="link-home"
              to="/"
              className="text-gray-100  text-xl hover:text-cyan-600"
            >
              Home
            </Link>
            <Link
              data-cy="link-faq"
              to="/faq"
              className="text-gray-100 text-xl hover:text-cyan-600"
            >
              FAQ
            </Link>
            {!auth ? (
              <Link data-cy="link-signin" to="/login">
                <button className="text-gray-100  text-xl hover:text-cyan-600">
                  Sign in
                </button>
              </Link>
            ) : (
              <button
                onClick={handleSignOut}
                className="text-gray-100 text-xl hover:text-cyan-600"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-black/95 bg-opacity-95
          transition-transform transform font-bold text-xl ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } z-30`}
      >
        <div className="flex items-center justify-end py-7 px-5 mt-8">
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
            {auth && (
              <Link
                to="/admin/dashboard/home"
                className="block py-2 px-3 rounded md:hover:bg-transparent
                             md:p-0
                            md:hover:text-cyan-600 text-white"
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/"
              className="block py-2 px-3 rounded md:hover:bg-transparent
                 md:p-0
                md:hover:text-cyan-600 text-white"
            >
              Home
            </Link>
            <Link
              to="/faq"
              className="block py-2 px-3 rounded md:hover:bg-transparent
               md:p-0
                md:hover:text-cyan-600 text-white"
            >
              FAQ
            </Link>
            {auth ? (
              <button
                onClick={handleSignOut}
                className="block py-2 px-3 rounded md:hover:bg-transparent
     md:p-0
    md:hover:text-cyan-600 text-white"
              >
                Sign out
              </button>
            ) : (
              <Link to="login">
                <button
                  className="block py-2 px-3 rounded md:hover:bg-transparent
   md:p-0
    md:hover:text-cyan-600 text-white"
                >
                  Sign in
                </button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
