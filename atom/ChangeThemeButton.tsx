import React, { useState, useEffect, VFC } from "react";
import { useTheme } from "next-themes";
import { BiSun, BiMoon } from "react-icons/bi";

export const ChangeThemeButton: VFC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        aria-label="DarkModeToggle"
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {mounted && <>{theme === "dark" ? <BiSun size={"1.5rem"}/> : <BiMoon size={"1.5rem"}/>}</>}
      </button>
    </>
  );
};
