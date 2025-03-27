import { Author } from "src/types/api/author";
import { Comment } from "src/types/api/comment";
import { Category } from "src/types/api/category";

export interface Post {
  id: number;
  title: string;
  content: string;
  author: Author;
  thumbnail: string;
  isPinned: boolean;
  numComments: number;
  views: number;
  category: Category;
  comments: Comment[];
  createdDatetime: string;
}

export interface PostSummary {
  id: number;
  title: string;
  category: Category;
  author: Author;
  thumbnail: string;
  numComments: number;
  isPinned: boolean;
  views: number;
  createdDatetime: string;
}

export interface PostPreview {
  id: number;
  title: string;
  shortenContent: string;
  author: Author;
  views: number;
  created: string;
  numComments: number;
  thumbnail: string;
  isPinned: boolean;
}

export interface PostWritten {
  title: string;
  content: string;
  categoryId: number;
  isPinned: boolean;
  thumbnail: string;
}

export interface PostDetail extends Post {
  comments: Comment[];
}
