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
      <DateFormatter dateString={created_at} />
      <Link href={`/categories/${categories}`}>
        <a className="bg-pink-500 rounded-full hover:bg-pink-300 text-white duration-200 ml-3 sp:text-xxs sp:p-1.5 tab:text-xs pc:text-sm pc:p-2">
          {categories}
        </a>
      </Link>
      <h3 className="mb-3 mt-1 leading-snug text-pink-500 font-bold sp:text-xl tab:text-2xl pc:text-3xl">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="underline">{title}</a>
        </Link>
      </h3>
    </div>
  );
};

export default PostPreview;
