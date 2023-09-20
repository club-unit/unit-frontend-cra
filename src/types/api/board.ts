import { Category } from "src/types/api/category";

export interface Board {
  name: string;
  slug: string;
  categories: Category[];
  children: Board[];
}
