import Link from "next/link";

type Props = {
  children: string;
  path: string;
};

const Ancher = ({ children, path }: Props) => {
  return (
    <Link href={path}>
      <a className="font-sans font-bold hover:text-pink-500 duration-200 sp:text-xs tab:text-sm pc:text-lg">
        {children}
      </a>
    </Link>
  );
};

export default Ancher;
