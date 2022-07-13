import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import Author from "../types/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <div className="bg-red-300 w-3/5 mx-auto">
      <p>post-preview.tsx</p>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug text-pink-500">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="underline">{title}</a>
        </Link>
      </h3>
    </div>
  );
};

export default PostPreview;
