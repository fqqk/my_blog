import DateFormatter from "./date-formatter";
import Link from "next/link";

type Props = {
  title: string;
  created_at: string;
  slug: string;
  categories: string[];
};

const PostPreview = ({ title, created_at, slug, categories }: Props) => {
  return (
    <div className="w-4/6 mx-auto my-10">
      <div className="text-lg">
        <DateFormatter dateString={created_at} />
        <Link href={`/categories/${categories}`}>
          <a className="bg-pink-500 rounded-full p-2 hover:bg-pink-300 text-white duration-200 ml-3 text-sm">
            {categories}
          </a>
        </Link>
      </div>
      <h3 className="text-3xl mb-3 mt-1 leading-snug text-pink-500 font-bold">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="underline">{title}</a>
        </Link>
      </h3>
    </div>
  );
};

export default PostPreview;
