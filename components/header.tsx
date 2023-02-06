import PostAnchor from "atom/PostAnchor";
import { ChangeThemeButton } from "atom/ChangeThemeButton";
import useMedia from "use-media";

const Header = () => {
  const isWide = useMedia({ minWidth: "520px" });
  return (
    <header className="fixed top-0 bg-neutral-50 w-full dark:bg-gray-800 z-50">
      {isWide ? (
        <>
          <nav className="w-11/12 flex lg:flex-row items-center justify-between px-10 py-6 mx-auto border-x-2 border-pink-400">
            <div className="space-x-8 items-center">
              <figure className="rounded-full w-12 h-12 truncate inline-block align-middle">
                <img src="/favicon/IT_Fox_64x64.png" alt="IT_Fox" />
              </figure>
              <PostAnchor path="/">Home</PostAnchor>
              <PostAnchor path="/portfolio">portfolio</PostAnchor>
              <PostAnchor path="#">rss</PostAnchor>
              <PostAnchor path="#">search</PostAnchor>
            </div>
            <div className="flex items-center space-x-10">
              <ChangeThemeButton />
            </div>
          </nav>
        </>
      ) : (
        <nav className="w-11/12 flex items-center justify-between px-10 py-6 mx-auto border-x-2 border-pink-400">
          <div className="mt-2 space-x-4">
            <figure className="rounded-full w-8 h-8 truncate inline-block align-middle">
              <img src="/favicon/IT_Fox_64x64.png" alt="IT_Fox" />
            </figure>
            <PostAnchor path="/">Home</PostAnchor>
            <PostAnchor path="/portfolio">portfolio</PostAnchor>
            <PostAnchor path="#">rss</PostAnchor>
            <PostAnchor path="#">search</PostAnchor>
          </div>
          <ChangeThemeButton />
        </nav>
      )}
    </header>
  );
};

export default Header;
