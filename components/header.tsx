import Ancher from "atom/ancher";

const Header = () => {
  return (
    <div className="fixed w-full flex-1 bg-white">
      <nav className="w-11/12 border-b-2 border-gray-300 m-auto mb-30">
        <div className="space-x-10 flex-1 px-48 py-6">
          <Ancher path="/">Home</Ancher>
          <Ancher path="#">Profile</Ancher>
          <Ancher path="#">Dev</Ancher>
          <Ancher path="#">Posts</Ancher>
          <Ancher path="#">Want</Ancher>
        </div>
      </nav>
    </div>
  );
};

export default Header;
