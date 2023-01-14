import Image from "next/image";

const PostImage: React.FC<JSX.IntrinsicElements["img"]> = ({
  src,
  alt,
  title,
}) => {
  if (src == undefined) {
    return (
      <h1 className="text-slate-400">
        画像が表示されませんでしたｍ（＿ ＿）ｍ
      </h1>
    );
  }
  return <Image src={src} alt={alt} title={title} />;
};
export default PostImage;
