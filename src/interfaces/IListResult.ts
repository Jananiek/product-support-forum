export interface IListResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
