import { ICartItem } from './ICart';

export interface IData {
  readonly isFetching: boolean;
  readonly products: ICartItem[];
  readonly errors?: string | null;
}

export interface IDataAction {
  type: string;
  payload?: {
    isFetching: boolean;
    dataRady?: boolean;
    products?: [];
    message?: any;
    errors?: string | null;
  };
}

export type ApiResponse = Record<string, any>;

export interface Cart extends ApiResponse {
  id: number;
}
