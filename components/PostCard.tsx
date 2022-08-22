import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <a>{post.frontMatter.title}</a>
    </Link>
  );
};

export default PostCard;
