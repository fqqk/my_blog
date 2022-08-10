import Ancher from "atom/ancher";

const Header = () => {
  return (
    <header className="fixed top-0 bg-neutral-50 w-full">
      <nav className="w-4/5 flex lg:flex-row items-center justify-between px-10 py-6 mx-auto border-x-2 border-pink-400">
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
      <hr className="w-11/12 border-b-2 border-neutral-200 m-auto" />
    </header>
  );
};

export default Header;
