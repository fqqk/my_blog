import { FaGithub, FaTwitter } from "react-icons/fa";
import { SiAcclaim, SiZenn } from "react-icons/si";
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
      <div className="w-full mx-auto py-28">
        <div className="ml-8">
          <div className="flex sp:space-x-4 tab:space-x-8 pc:space-x-10 mr-12 mb-4 items-center">
            <div>
              <span className="sp:text-xs tab:text-base pc:text-lg">
                follow
              </span>
              <figure className="rounded-full w-8 h-8 truncate inline-block align-middle mx-2">
                <img src="/favicon/IT_Fox_64x64.png" alt="IT_Fox" />
              </figure>
              <span>:</span>
            </div>
            <a href="https://twitter.com/fqqk_t0ma" target="blank">
              <FaTwitter size={"1.5rem"} color={"#1DA1F2"} />
            </a>
            <a href="https://github.com/fqqk" target="blank">
              <FaGithub size={"1.5rem"} />
            </a>
            <a href="https://zenn.dev/fqqk" target="blank">
              <SiZenn color={"#1DA1F2"}/>
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
