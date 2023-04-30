import fs from "fs";
import matter from "gray-matter";
import Layout from "components/layout";
import PostPreview from "components/post-preview";
import FrontMatterType from "../../types/frontMatter";

type paramsType = {
  params: {
    category: string;
  };
};

export const getStaticProps = ({ params }: paramsType) => {
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
    new Date(postA.frontMatter.created_at) >
    new Date(postB.frontMatter.created_at)
      ? -1
      : 1
  );

  return {
    props: {
      posts: sortedPosts,
      params: params,
    },
  };
};

export const getStaticPaths = () => {
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

  const duplicate_categories = posts.flatMap((post) => {
    return post.frontMatter.categories;
  });

  const not_duplicate_categories = duplicate_categories.filter(
    (el, index, array) => {
      return array.indexOf(el) === index;
    }
  );

  const paths = not_duplicate_categories.map((category: string) => ({
    params: { category },
  }));

  return {
    paths,
    fallback: false,
  };
};

type Props = {
  posts: Array<{
    frontMatter: FrontMatterType;
    slug: string;
  }>;
  params: {
    category: string;
  };
};

const Category = ({ posts, params }: Props) => {
  const tag = params.category;
  return (
    <Layout>
      <div className="my-8">
        <section className="pt-10">
          <div className="my-20">
            <div className="w-5/6 mx-auto my-10">
              <h1 className="sp:text-xl tab:text-2xl pc:text-3xl font-bold">" {tag} "での絞り込み結果</h1>
            </div>
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
    </Layout>
  );
};

export default Category;
