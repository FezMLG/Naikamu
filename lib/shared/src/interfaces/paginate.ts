export type Paginate<T> = {
  pageInfo: PageInfo;
  data: T;
};

export type PageInfo = {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
};
