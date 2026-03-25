export type Post = {
  id: string;
  author: string;
  title: string;
  content: string;
  commentsCount?: number;
  createdAt: number;
};
