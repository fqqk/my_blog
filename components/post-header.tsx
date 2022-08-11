import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";

type Props = {
  title: string;
  coverImage: string;
  created_at: string;
  updated_at: string;
};

const PostHeader = ({ title, coverImage, created_at, updated_at }: Props) => {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <PostTitle>{title}</PostTitle>
        <div>
          <div className=" text-gray-400">
            公開日:
            <DateFormatter dateString={created_at} />
          </div>
          <div className=" text-gray-400">
            最終更新日:
            <DateFormatter dateString={updated_at} />
          </div>
        </div>
      </div>

      <div className="mb-8 md:mb-16 sm:mx-0">
        {/* <CoverImage title={title} src={coverImage} /> */}
      </div>
    </>
  );
};

export default PostHeader;
