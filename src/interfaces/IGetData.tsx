export interface IData {
  isFetching?: boolean;
  count?: number;
  error?: boolean;
  message?: any;
}

export interface IDataAction {
  type: string;
  payload?: {
    count?: number;
    message?: any;
  };
}
