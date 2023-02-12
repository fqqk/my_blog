import DateFormatter from "./date-formatter";
import Link from "next/link";
import { IconContext } from "react-icons";
import { SiRuby } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiRubyonrails } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiCss3 } from "react-icons/si";

type Props = {
  title: string;
  created_at: string;
  slug: string;
  categories: string[];
};

const PostPreview = ({ title, created_at, slug, categories }: Props) => {
  type icon = JSX.Element | null;
  let icon;
  const tags = categories.map((category) => {
    switch (category) {
      case "react":
        icon = (
          <IconContext.Provider
            value={{
              color: "#ffffff",
              className: "inline sp:w-4 sp:h-4 tab:w-5 tab:h-5 pc:w-6 pc:h-6",
            }}
          >
            <SiReact />
          </IconContext.Provider>
        );
        break;
      case "typescript":
        icon = (
          <IconContext.Provider
            value={{
              color: "#ffffff",
              className:
                "inline sp:w-3.5 sp:h-3.5 tab:w-4 tab:h-4 pc:w-4 pc:h-4",
            }}
          >
            <SiTypescript />
          </IconContext.Provider>
        );
        break;
      case "ruby":
        icon = (
          <IconContext.Provider
            value={{
              color: "#ffffff",
              className:
                "inline sp:w-4 sp:h-4 tab:w-4.5 tab:h-4.5 pc:w-5 pc:h-5",
            }}
          >
            <SiRuby />
          </IconContext.Provider>
        );
        break;
      case "ror":
        icon = (
          <IconContext.Provider
            value={{
              color: "#ffffff",
              className:
                "inline sp:w-4 sp:h-4 tab:w-4.5 tab:h-4.5 pc:w-5 pc:h-5",
            }}
          >
            <SiRubyonrails />
          </IconContext.Provider>
        );
        break;
      case "js":
        icon = (
          <IconContext.Provider
            value={{
              color: "#ffffff",
              className:
                "inline sp:w-3.5 sp:h-3.5 tab:w-4 tab:h-4 pc:w-4 pc:h-4",
            }}
          >
            <SiJavascript />
          </IconContext.Provider>
        );
        break;
      case "tailwind":
        icon = (
          <IconContext.Provider
            value={{
              color: "#ffffff",
              className:
                "inline sp:w-3.5 sp:h-3.5 tab:w-4 tab:h-4 pc:w-4 pc:h-4",
            }}
          >
            <SiTailwindcss />
          </IconContext.Provider>
        );
        break;
      case "css":
        icon = (
          <IconContext.Provider
            value={{
              color: "#ffffff",
              className:
                "inline sp:w-3.5 sp:h-3.5 tab:w-4 tab:h-4 pc:w-4 pc:h-4",
            }}
          >
            <SiCss3 />
          </IconContext.Provider>
        );
        break;
      default:
        icon = null;
    }
    return (
      <Link href={`/categories/${category}`}>
        <a className="bg-pink-500 rounded-full hover:bg-pink-300 text-white duration-200 ml-3 sp:text-xxs sp:p-1.5 tab:text-xs pc:text-sm pc:p-2">
          {icon ? icon : category}
        </a>
      </Link>
    );
  });

  return (
    <section className="w-5/6 mx-auto my-10">
      <DateFormatter dateString={created_at} />
      {tags}
      <h3 className="mb-12 mt-3 leading-snug hover:text-pink-500 duration-200 font-bold sp:text-xl tab:text-2xl pc:text-3xl">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="border-b-2 border-pink-500">{title}</a>
        </Link>
      </h3>
    </section>
  );
};

export default PostPreview;
