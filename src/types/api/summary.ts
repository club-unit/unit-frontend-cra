import { PostSummary } from "src/types/api/post";

export interface BoardSummary {
  slug: string;
  posts: PostSummary[];
}
