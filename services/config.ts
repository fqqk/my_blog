export type Config = {
  notion: {
    token: string;
    database_id: string;
  };
  property_names: {
    title: string;
    tag: string;
    public: string;
    file_name: string;
  };
  github: {
    repo: string;
    pat: string;
  };
  blog: {
    asset_dir: string;
    post_dir: string;
  }
}

export function initConfig():Config {
  return {
    notion: {
      token: process.env.NOTION_TOKEN ?? "",
      database_id: process.env.NOTION_DATABASE_ID ?? "",
    },
    property_names: {
      title: process.env.PROP_NAME_TITLE ?? "",
      tag: process.env.PROP_NAME_TAG ?? "",
      public: process.env.PROP_NAME_PUBLIC ?? "",
      file_name: process.env.PROP_NAME_FILE_NAME ?? "",
    },
    github: {
      repo: process.env.THIS_GITHUB_REPO ?? "",
      pat: process.env.THIS_GITHUB_PAT ?? "",
    },
    blog: {
      asset_dir: process.env.BLOG_ASSET_DIR ?? "",
      post_dir: process.env.BLOG_POST_DIR ?? "",
    }
  }
}