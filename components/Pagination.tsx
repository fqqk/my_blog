import Link from "next/link";

const Pagination = ({ pages, current_page = 1 }) => {
  return (
    <div className="flex items-center space-x-1 mt-8 justify-center">
      {pages.map((page) => (
        <Link href={`/page/${page}`} key={page}>
          <a
            className={`px-4 py-2 border rounded-full hover:bg-pink-500 hover:text-white ${
              current_page == page && "bg-slate-300 text-black"
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
