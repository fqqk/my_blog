import Ancher from "atom/ancher";
import { ChangeThemeButton } from "atom/ChangeThemeButton";

const Header = () => {
  return (
    <header className="fixed top-0 bg-neutral-50 w-full dark:bg-gray-800 z-50">
      <nav className="w-4/5 flex lg:flex-row items-center justify-between px-10 py-6 mx-auto border-x-2 border-pink-400">
        <div className="space-x-10 items-center  ">
          <Ancher path="/">Home</Ancher>
          <Ancher path="/profile">Profile</Ancher>
          <Ancher path="#">Dev</Ancher>
          <Ancher path="#">Posts</Ancher>
        </div>
        <div className="flex items-center space-x-10">
          <Ancher path="#">Want</Ancher>
          <ChangeThemeButton />
        </div>
      </nav>
      <hr className="w-11/12 border-b-2 border-neutral-200 m-auto" />
    </header>
  );
};

export default Header;
