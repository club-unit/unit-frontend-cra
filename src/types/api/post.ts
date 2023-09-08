import { Author } from "@/types/api/author";
import { Comment } from "@/types/api/comment";

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  author: Author;
  isPinned: boolean;
  views: number;
}

export interface PostDetail extends Post {
  comments: Comment[];
}
