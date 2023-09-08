import { Author } from "@/types/api/author";

export interface Comment {
  id: number;
  content: string;
  author: Author;
  children: Comment[];
  created: string;
}
