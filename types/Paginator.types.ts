export type PaginatorConfig = {
  iconPrevious: string;
  iconNext: string;
  size: string;
  maxNumbers: number;
  id?: string;
}

export type PaginatorData = {
  data: PaginatorConfig;
  onClick?: () => void;
}

export default PaginatorData
