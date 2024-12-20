import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import { createTags } from "lib/createTags";

type Props = {
  title: string;
  created_at: string;
  updated_at: string;
  tags: string[];
};

const PostHeader = ({ title, created_at, updated_at, tags }: Props) => {
  const _tags = createTags(tags);
  return (
    <>
      <div className="sp:w-11/12 pc:w-3/5 mx-auto mb-12">
        <PostTitle>{title}</PostTitle>
        <div className="flex justify-between">
          <div>{_tags}</div>
          <div>
            <div className="text-gray-400 text-right sp:text-xs tab:text-sm pc:text-lg">
              created_at:
              <DateFormatter dateString={created_at} />
            </div>
            <div className="text-gray-400 text-right sp:text-xs tab:text-sm pc:text-lg">
              updated_at:
              <DateFormatter dateString={updated_at} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
