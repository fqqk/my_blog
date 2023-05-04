import fs from "fs";
import matter from "gray-matter";
import Layout from "components/layout";
import PostPreview from "components/post-preview";
import FrontMatterType from "../../types/frontMatter";

type paramsType = {
  params: {
    tag: string;
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

  const tag = params.tag;

  const filteredPosts = posts.filter((post) => {
    return post.frontMatter.tags.includes(tag);
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

  const duplicate_tags = posts.flatMap((post) => {
    return post.frontMatter.tags;
  });

  const not_duplicate_tags = duplicate_tags.filter((el, index, array) => {
    return array.indexOf(el) === index;
  });

  const paths = not_duplicate_tags.map((tag: string) => ({
    params: { tag },
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
    tag: string;
  };
};

const tag = ({ posts, params }: Props) => {
  const tag = params.tag;
  return (
    <Layout>
      <div className="my-8">
        <section className="pt-10">
          <div className="my-20">
            <div className="w-5/6 mx-auto my-10">
              <h1 className="sp:text-xl tab:text-2xl pc:text-3xl font-bold">
                " {tag} "での絞り込み結果
              </h1>
            </div>
            {posts.map((post) => (
              <PostPreview
                key={post.slug}
                title={post.frontMatter.title}
                created_at={post.frontMatter.created_at}
                slug={post.slug}
                tags={post.frontMatter.tags}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default tag;
