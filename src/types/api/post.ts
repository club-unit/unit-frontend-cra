import { Author } from "@/types/api/author";

export interface Post {
  id: number;
  title: string;
  content: string;
  author: Author;
  comments: Comment[];
  isNotice: boolean;
  views: number;
  likes: number;
  createdTime: string;
}
