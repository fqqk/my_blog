import fs from "fs";
import matter from "gray-matter";
import Pagination from "../../components/Pagination";
import Layout from "components/layout";
import Head from "next/head";
import { BLOG_NAME } from "lib/constants";
import ArchiveMenu from "components/ArchiveMenu";
import MoreStories from "components/more-stories";

const PAGE_SIZE = 10;

const range = (start: number, end: number, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

export async function getStaticPaths() {
  const files = fs.readdirSync("_posts");
  const count = files.length;
  const paths = range(1, Math.ceil(count / PAGE_SIZE)).map((i) => ({
    params: { page: i.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

type ParamsProps = {
  params: {
    page: number;
  };
};

export async function getStaticProps({ params }: ParamsProps) {
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
    new Date(postA.frontMatter.created_at) >
    new Date(postB.frontMatter.created_at)
      ? -1
      : 1
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

type Props = {
  posts: {
    frontMatter: {
      [key: string]: any;
    };
    slug: string;
  }[];
  pages: number[] | null;
  current_page: number | undefined;
};

const Page = ({ posts, pages, current_page }: Props) => {
  const morePosts = posts.map((post) => {
    return {
      slug: post.slug,
      title: post.frontMatter.title,
      created_at: post.frontMatter.created_at,
      updated_at: post.frontMatter.updated_at,
      tags: post.frontMatter.tags,
      content: "",
    };
  });
  // Note: 'yyyy-mm-dd -> yyyy'
  const created_at_list = morePosts.map((post) => post.created_at.slice(0, 4));
  // Note: データの重複をなくし、年配列を作成
  // Memo: posts/indexでも使用しているので後ほど共通化
  const years = created_at_list.filter(
    (element, index) => created_at_list.indexOf(element) === index
  );
  return (
    <Layout>
      <Head>
        <title>{BLOG_NAME}</title>
      </Head>
      <ArchiveMenu years={years} />
      {posts.length > 0 && <MoreStories posts={morePosts} />}
      <Pagination pages={pages} current_page={current_page} />
    </Layout>
  );
};

export default Page;
