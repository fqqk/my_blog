import fs from "fs";
import matter from "gray-matter";
import PostCard from "../../components/PostCard";
import Layout from "components/layout";
import PostPreview from "components/post-preview";

export const getStaticProps = ({ params }) => {
  const files = fs.readdirSync("_posts");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(`_posts/${fileName}`, "utf-8");
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  const category = params.category;

  const filteredPosts = posts.filter((post) => {
    return post.frontMatter.categories.includes(category);
  });

  const sortedPosts = filteredPosts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );

  return {
    props: {
      posts: sortedPosts,
    },
  };
};

export const getStaticPaths = () => {
  const categories = ["react", "typescript"];
  const paths = categories.map((category) => ({ params: { category } }));

  return {
    paths,
    fallback: false,
  };
};

const Category = ({ posts }) => {
  return (
    <Layout>
      <div className="my-8">
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
          <div className="my-44">test</div>
          <section className="pt-10">
            <div className="my-20">
              {posts.map((post) => (
                <PostPreview
                  key={post.slug}
                  title={post.frontMatter.title}
                  created_at={post.frontMatter.created_at}
                  slug={post.slug}
                  categories={post.frontMatter.categories}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
