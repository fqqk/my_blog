import Link from "next/link";
import { IconContext } from "react-icons";
import { SiRuby } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiRubyonrails } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiCss3 } from "react-icons/si";

export function createTags(tags: string[]) {
  type icon = JSX.Element | null;
  let icon;
  const _tags = tags.map((tag) => {
    switch (tag) {
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
      <Link href={`/tags/${tag}`}>
        <a className="bg-pink-500 rounded-full hover:bg-pink-300 text-white duration-200 ml-3 sp:text-xxs sp:p-1.5 tab:text-xs pc:text-sm pc:p-2">
          {icon ? icon : tag}
        </a>
      </Link>
    );
  });

  return _tags;
}
