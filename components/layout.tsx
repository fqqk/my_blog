import Header from "components/header";
import Footer from "./footer";
import Meta from "./meta";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const scrollTopRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Meta />
      <Header />
      <div
        className="min-h-screen w-11/12 m-auto border-pink-400 border-x-2"
        ref={scrollTopRef}
      >
        <main>{children}</main>
      </div>
      <Footer targetEl={scrollTopRef}/>
    </>
  );
};

export default Layout;
