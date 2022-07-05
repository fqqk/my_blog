import Container from "./container";
import Link from "next/link";
import Tag from "atom/tag";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 ">
      <div className="w-11/12 mx-auto border-t-2 border-neutral-200">
        <div className="py-8 flex flex-col lg:flex-row items-center justify-between">
          <Link href="/">
            <a className="m-auto hover:text-pink-500 duration-200">
              <p className="underline">back to top</p>
            </a>
          </Link>

          <div className="flex  lg:flex-row  items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://twitter.com/fqqk_t0ma"
              target="blank"
              className=" hover:text-pink-500 font-semibold  py-3 px-12  duration-200"
            >
              Twitter
            </a>
            <a
              href="https://github.com/fqqk"
              target="blank"
              className=" hover:text-pink-500 font-semibold  py-3 px-12  duration-200"
            >
              Github
            </a>
          </div>
          <Tag category="fa" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
