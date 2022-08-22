import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="leading-none text-pink-500 text-center text-2xl font-bold  md:text-3xl lg:text-4xl mb-16 mt-8">
      {children}
    </h1>
  );
};

export default PostTitle;
