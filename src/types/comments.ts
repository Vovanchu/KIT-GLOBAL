export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: number;
}

export type Comments = Comment[];
