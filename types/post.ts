type PostType = {
  slug: string;
  title: string;
  created_at: string;
  updated_at: string;
  coverImage?: string;
  excerpt?: string;
  ogImage?: {
    url: string;
  };
  content: string;
  categories: string[];
};

export default PostType;
