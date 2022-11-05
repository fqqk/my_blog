import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
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
      <div className="w-3/5 mx-auto">
        <PostTitle>{title}</PostTitle>
        <div className="flex justify-between">
          <div>
            <Link href={`/categories/${categories}`}>
              <a className="bg-pink-500 rounded-full p-2 hover:bg-pink-300 text-white duration-200 ml-3 text-sm">
                {categories}
              </a>
            </Link>
          </div>
          <div>
            <div className="text-gray-400 text-right">
              created_at:
              <DateFormatter dateString={created_at} />
            </div>
            <div className="text-gray-400 text-right">
              updated_at:
              <DateFormatter dateString={updated_at} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 md:mb-16 sm:mx-0">
        {/* <CoverImage title={title} src={coverImage} /> */}
      </div>
    </>
  );
};

export default PostHeader;
