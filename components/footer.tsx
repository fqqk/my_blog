import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { SiAcclaim } from "react-icons/si";
import { RefObject } from "react";

type Props = {
  targetEl: RefObject<HTMLDivElement>;
};

const Footer = ({ targetEl }: Props) => {
  const scrollTop = () => {
    targetEl?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-neutral-50 dark:bg-gray-800">
      <div className="w-11/12 mx-auto border-x-2 border-pink-400 py-28">
        <div className="ml-12">
          <div className="flex sp:space-x-4 tab:space-x-8 pc:space-x-10 mr-12 mb-4 items-center">
            <span className="sp:text-xs tab:text-base pc:text-lg">fqqk :</span>
            <a href="https://twitter.com/fqqk_t0ma" target="blank">
              <FaTwitter size={"1.5rem"} color={"#1DA1F2"} />
            </a>
            <a href="https://github.com/fqqk" target="blank">
              <FaGithub size={"1.5rem"} />
            </a>
          </div>
          <div className="flex items-center cursor-pointer hover:text-pink-500 duration-200 sp:text-xs tab:text-base pc:text-lg">
            <SiAcclaim />
            <button className="underline ml-2" onClick={scrollTop}>
              back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
