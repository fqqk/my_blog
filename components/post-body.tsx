import Prism from "prismjs";
import React, { useEffect } from "react";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostBody;
