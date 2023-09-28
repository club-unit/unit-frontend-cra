import { Author } from "src/types/api/author";
import { Comment } from "src/types/api/comment";

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  author: Author;
  isPinned: boolean;
  views: number;
  numComments: number;
  created: string;
}

export interface PostSummary {
  id: number;
  title: string;
  shortenContent: string;
  author: Author;
  views: number;
  created: string;
  numComments: number;
}

export interface PostDetail extends Post {
  comments: Comment[];
}
