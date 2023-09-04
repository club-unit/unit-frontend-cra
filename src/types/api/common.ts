export type CommonListResponse<T> = T[];

export type CommonPagedResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};
