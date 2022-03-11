export interface PaginationParams {
  _limit: number;
  _page: number;
  _total: number;
}

export interface ListRespons<T> {
  data: T[];
  pagination: PaginationParams;
}
