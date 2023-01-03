import MoreStories from "../components/more-stories";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Post from "../types/post";
import fs from "fs";
import matter from "gray-matter";
import Pagination from "components/Pagination";
import PostPreview from "components/post-preview";

const PAGE_SIZE = 10;

const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

type Props = {
  allPosts: Post[];
  posts: any;
  pages: any[];
};

const Index = ({ posts, pages }: Props) => {
  // const morePosts = allPosts;

  return (
    <>
      <Layout>
        <Head>
          <title>fqqk_devlog</title>
        </Head>
        {/* <div>{posts.length > 0 && <MoreStories posts={morePosts} />}</div> */}
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
        <Pagination pages={pages} />
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  // const allPosts = getAllPosts([
  //   "title",
  //   "created_at",
  //   "updated_at",
  //   "slug",
  //   "author",
  //   "coverImage",
  //   "excerpt",
  //   "categories",
  // ]);

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

  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );

  const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));

  return {
    props: {
      // allPosts,
      posts: sortedPosts.slice(0, PAGE_SIZE),
      pages,
    },
  };
};
