import fs from "fs";
import matter from "gray-matter";
import Pagination from "../../components/Pagination";
import Layout from "components/layout";
import PostPreview from "components/post-preview";
import Head from "next/head";
import { CMS_NAME } from "lib/constants";

const PAGE_SIZE = 10;

const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

export async function getStaticPaths() {
  const files = fs.readdirSync("_posts");
  const count = files.length;
  console.log("filecount", count);

  const paths = range(1, Math.ceil(count / PAGE_SIZE)).map((i) => ({
    params: { page: i.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const current_page = params.page;
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

  const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));

  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );

  const slicedPosts = sortedPosts.slice(
    PAGE_SIZE * (current_page - 1),
    PAGE_SIZE * current_page
  );

  return {
    props: {
      posts: slicedPosts,
      pages,
      current_page,
    },
  };
}

const Page = ({ posts, pages, current_page }) => {
  return (
    <Layout>
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
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
      <Pagination pages={pages} current_page={current_page} />
    </Layout>
  );
};

export default Page;
