export type TableConfig = {
  head: string;
  rows: Array<string>;
  icon: string;
}

export type TableData = {
  data: TableConfig;
  classNames?: string;
}

export default TableData