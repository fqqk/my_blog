import Prism from "prismjs";
import React, { useEffect } from "react";
import NextImage from "next/image";

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
      <div className="mt-32">
        <a href="https://www.buymeacoffee.com/fqqk" target="_blank">
          <NextImage
            src={"https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"}
            alt={"Buy Me A Coffee"}
            width={217}
            height={60}
          />
        </a>
      </div>
    </div>
  );
};

export default PostBody;
