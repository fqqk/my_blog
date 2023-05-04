import MoreStories from "../components/more-stories";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { BLOG_NAME } from "../lib/constants";
import Post from "../types/post";
import fs from "fs";
import matter from "gray-matter";
import Pagination from "components/Pagination";
import ArchiveMenu from "components/ArchiveMenu";

const PAGE_SIZE = 10;

const range = (start: number, end: number, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

type Props = {
  allPosts: Post[];
  posts: {
    frontMatter: {
      [key: string]: any;
    };
    slug: string;
  }[];
  pages: number[] | null;
};

const Index = ({ posts, pages, allPosts }: Props) => {
  const morePosts = allPosts;
  // Note: 'yyyy-mm-dd -> yyyy'
  const created_at_list = morePosts.map((post) => post.created_at.slice(0, 4));
  // Note: データの重複をなくし、年配列を作成
  // Memo: posts/indexでも使用しているので後ほど共通化
  const years = created_at_list.filter(
    (element, index) => created_at_list.indexOf(element) === index
  );

  return (
    <>
      <Layout>
        <Head>
          <title>{BLOG_NAME}</title>
        </Head>
        <ArchiveMenu years={years} />
        {posts.length > 0 && <MoreStories posts={morePosts} />}

        <Pagination pages={pages} />
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  // fetchNotion();
  const allPosts = getAllPosts([
    "title",
    "created_at",
    "updated_at",
    "slug",
    "ogImage",
    "tags",
  ]);

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
    new Date(postA.frontMatter.created_at) >
    new Date(postB.frontMatter.created_at)
      ? -1
      : 1
  );

  const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));

  return {
    props: {
      allPosts,
      posts: sortedPosts.slice(0, PAGE_SIZE),
      pages,
    },
  };
};
