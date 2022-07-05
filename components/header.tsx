import Ancher from "atom/ancher";

const Header = () => {
  return (
    <header className="fixed bg-neutral-50 w-full">
      <nav className="w-11/12 border-b-2 border-neutral-200 flex lg:flex-row items-center justify-between px-48 py-6">
        <div className="space-x-10 items-center  ">
          <Ancher path="/">Home</Ancher>
          <Ancher path="#">Profile</Ancher>
          <Ancher path="#">Dev</Ancher>
          <Ancher path="#">Posts</Ancher>
        </div>
        <div className="">
          <Ancher path="#">Want</Ancher>
        </div>
      </nav>
    </header>
  );
};

export default Header;

{
  /* <footer className="bg-neutral-50 ">
<div className="w-11/12 m-auto border-t-2 border-neutral-200">
  <div className="py-8 flex flex-col lg:flex-row items-center justify-between">
    <Link href="/">
      <a className="border-b-2 border-black m-auto hover:text-pink-500 duration-200 hover:border-pink-500 leading-none">
        <p className="">back to top</p>
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
  </div>
</div>
</footer> */
}
