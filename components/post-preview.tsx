import DateFormatter from "./date-formatter";
import Link from "next/link";
import { createTags } from "lib/createTags";

type Props = {
  title: string;
  created_at: string;
  slug: string;
  categories: string[];
};

const PostPreview = ({ title, created_at, slug, categories }: Props) => {
  const tags = createTags(categories);

  return (
    <div className="w-4/6 mx-auto my-10">
      <DateFormatter dateString={created_at} />
      {tags}
      <h3 className="mb-12 mt-3 leading-snug text-pink-500 font-bold sp:text-xl tab:text-2xl pc:text-3xl">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="underline">{title}</a>
        </Link>
      </h3>
    </div>
  );
};

export default PostPreview;
