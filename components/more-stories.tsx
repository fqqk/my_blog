import PostPreview from "./post-preview";
import Post from "../types/post";
import ArchiveSection from "./ArchiveSection";

type Props = {
  posts: Post[];
};

type YearPostDataType = {
  year: string;
  year_posts: Post[];
};

const MoreStories = ({ posts }: Props) => {
  // Note: 'yyyy-mm-dd -> yyyy'
  const created_at_list = posts.map((post) => post.created_at.slice(0, 4));
  // Note: データの重複をなくし、年配列を作成
  // Memo: posts/indexでも使用しているので後ほど共通化
  const years = created_at_list.filter(
    (element, index) => created_at_list.indexOf(element) === index
  );
  const post_data_by_year_group: YearPostDataType[] = [];
  years.forEach((year, index) => {
    const postsData = posts.filter((i) => i.created_at.slice(0, 4) === year);
    const post = {
      year: year,
      year_posts: postsData,
    };
    post_data_by_year_group[index] = post;
  });

  const yearPostList = post_data_by_year_group.map((post_data) => {
    const postList = post_data.year_posts.map((post) => {
      return (
        <PostPreview
          key={post.slug}
          title={post.title}
          created_at={post.created_at}
          slug={post.slug}
          tags={post.tags}
        />
      );
    });

    return (
      <>
        <ArchiveSection year={post_data.year} />
        {postList}
      </>
    );
  });

  return <div className="my-20">{yearPostList}</div>;
};

export default MoreStories;
