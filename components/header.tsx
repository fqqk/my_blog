import Ancher from "atom/ancher";

const Header = () => {
  return (
    <header className="fixed top-0 bg-neutral-50 w-full">
      <nav className="w-11/12 border-b-2 border-neutral-200 flex lg:flex-row items-center justify-between px-48 py-6 m-auto">
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
