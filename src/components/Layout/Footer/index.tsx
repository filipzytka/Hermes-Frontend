import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex bg-black/20 min-h-16 justify-center items-center shadow-lg w-full shrink-0 overflow-hidden mt-8 md:mt-20">
      <a href="https://discord.com/">
        <FaDiscord
          size={20}
          className="mx-5 text-gray-200 hover:animate-pulse cursor-pointer"
        />
      </a>
      <a href="https://x.com/home">
        <FaXTwitter
          size={20}
          className="mx-5 text-gray-200 hover:animate-pulse cursor-pointer"
        />
      </a>
      <a href="https://youtube.com" className="mx-5">
        <FaYoutube
          size={20}
          className="text-gray-200 hover:animate-pulse cursor-pointer"
        />
      </a>
    </footer>
  );
};

export default Footer;
