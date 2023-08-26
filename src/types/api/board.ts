import { Category } from "@/types/api/category";

export interface Board {
  name: string;
  slug: string;
  categories: Category[];
  children: Board[] | null;
}
