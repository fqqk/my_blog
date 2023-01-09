import Header from "components/header";
import Footer from "./footer";
import Meta from "./meta";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      <div
        className="min-h-screen w-11/12 m-auto border-pink-400 border-x-2"
        id="top-of-scroll"
      >
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
