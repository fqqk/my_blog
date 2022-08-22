module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "prismjs",
      {
        languages: [
          "javascript",
          "js",
          "css",
          "html",
          "bash",
          "ruby",
          "typescript",
          "markdown",
          "json",
          "docker",
        ],
        plugins: ["line-highlight", "line-numbers", "show-language"],
        theme: "tomorrow",
        css: true,
      },
    ],
  ],
};
