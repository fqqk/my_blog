import Link from "next/link";

const Pagination = ({ pages, current_page = 1 }) => {
  return (
    <div className="flex items-center space-x-1 mt-8 justify-center">
      {pages.map((page) => (
        <Link href={`/page/${page}`} key={page}>
          <a
            className={`border rounded-full hover:bg-pink-500 hover:text-white duration-200 ${
              current_page == page &&
              "bg-slate-300 text-black sp:text-xs sp:px-2 sp:py-1 tab:text-sm tab:px-3 tab:py-1.5 pc:text-base pc:px-4 pc:py-2"
            }`}
          >
            {page}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
