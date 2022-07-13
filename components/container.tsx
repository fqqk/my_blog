import { ReactNode, FunctionComponent } from "react";

type Props = {
  children?: ReactNode;
};

const Container: FunctionComponent = ({ children }: Props) => {
  return (
    <div className="container mx-auto px-5 bg-orange-200">
      {children}Container.tsx
    </div>
  );
};

export default Container;
