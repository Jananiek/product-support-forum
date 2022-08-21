export interface IPagination {
  pages: number;
  pageSize: number;
  items: number;
  currentPage: number;
  activeItems?: number;
}
