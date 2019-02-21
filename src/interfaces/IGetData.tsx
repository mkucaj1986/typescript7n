export interface IData {
  readonly isFetching: boolean;
  readonly data: Cart[];
  readonly errors?: string | null;
}

export interface IDataAction {
  type: string;
  payload?: {
    isFetching: boolean;
    dataRady?: boolean;
    data?: [];
    message?: any;
    errors?: string | null;
  };
}

export type ApiResponse = Record<string, any>;

export interface Cart extends ApiResponse {
  id: number;
}
