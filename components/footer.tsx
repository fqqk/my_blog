import Container from "./container";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 dark:bg-gray-800">
      <hr className="w-11/12 border-b-2 border-neutral-200 m-auto z-0" />
      <div className="w-4/5 mx-auto border-x-2 border-pink-400">
        <div className="py-4 flex flex-col lg:flex-row items-center justify-between">
          <Link href="/">
            <a className="ml-12 hover:text-pink-500 duration-200">
              <p className="underline">back to top</p>
            </a>
          </Link>

          <div className="flex  lg:flex-row  items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://twitter.com/fqqk_t0ma"
              target="blank"
              className=" hover:text-pink-500 font-semibold  py-3 px-8  duration-200"
            >
              Twitter
            </a>
            <a
              href="https://github.com/fqqk"
              target="blank"
              className=" hover:text-pink-500 font-semibold  py-3 px-8  duration-200"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
