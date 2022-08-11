import { ReactNode, FunctionComponent } from "react";

type Props = {
  children?: ReactNode;
};

const Container: FunctionComponent = ({ children }: Props) => {
  return (
    <div className="container mx-auto px-5 mt-16">{children}Container.tsx</div>
  );
};

export default Container;
