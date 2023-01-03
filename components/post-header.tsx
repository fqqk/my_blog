import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import Link from "next/link";

type Props = {
  title: string;
  created_at: string;
  updated_at: string;
  categories: string[];
};

const PostHeader = ({ title, created_at, updated_at, categories }: Props) => {
  return (
    <>
      <div className="sp:w-11/12 pc:w-3/5 mx-auto mb-12">
        <PostTitle>{title}</PostTitle>
        <div className="flex justify-between">
          <div>
            <Link href={`/categories/${categories}`}>
              <a className="bg-pink-500 rounded-full hover:bg-pink-300 text-white duration-200 ml-3 sp:text-xxs sp:p-1.5 tab:text-xs pc:text-sm pc:p-2">
                {categories}
              </a>
            </Link>
          </div>
          <div>
            <div className="text-gray-400 text-right sp:text-xs tab:text-sm pc:text-lg">
              created_at:
              <DateFormatter dateString={created_at} />
            </div>
            <div className="text-gray-400 text-right sp:text-xs tab:text-sm pc:text-lg">
              updated_at:
              <DateFormatter dateString={updated_at} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
