import PostPreview from "./post-preview";
import Post from "../types/post";

type Props = {
  posts: Post[];
};

const MoreStories = ({ posts }: Props) => {
  console.log(posts);
  return (
    <section className="pt-10">
      <div className="my-20">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            created_at={post.created_at}
            slug={post.slug}
            categories={post.categories}
          />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
