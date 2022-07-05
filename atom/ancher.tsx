import Link from "next/link";

type Props = {
  children: string;
  path: string;
};

const Ancher = ({ children, path }: Props) => {
  return (
    <Link href={path}>
      <a className="font-bold font-sans text-lg hover:text-pink-500 duration-200">
        {children}
      </a>
    </Link>
  );
};

export default Ancher;
