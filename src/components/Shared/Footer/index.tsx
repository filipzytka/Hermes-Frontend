import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex dark:bg-black/20 min-h-16 justify-center items-center shadow-lg w-full shrink-0 overflow-hidden">
      <a href="https://discord.com/">
        <FaDiscord
          size={30}
          className="mx-5 text-cyan-600 dark:text-gray-200 hover:animate-pulse cursor-pointer"
        />
      </a>
      <a href="https://x.com/home">
        <FaXTwitter
          size={30}
          className="mx-5 text-cyan-600 dark:text-gray-200 hover:animate-pulse cursor-pointer"
        />
      </a>
      <a href="https://youtube.com" className="mx-5">
        <FaYoutube
          size={30}
          className="text-cyan-600 dark:text-cyan-200 hover:animate-pulse cursor-pointer"
        />
      </a>
    </footer>
  );
};

export default Footer;
