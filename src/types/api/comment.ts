import { Author } from "src/types/api/author";

export interface Comment {
  id: number;
  content: string;
  author: Author;
  replies: Comment[];
  createdDatetime: string;
}
