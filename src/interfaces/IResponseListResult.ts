import { IPagination } from './IPagination';

export interface IResponseListResult<T> {
  items: T[];
  pagination: IPagination;
}
export interface IResponseSingleResult<T> {
  item: T;
  pagination: IPagination;
}
