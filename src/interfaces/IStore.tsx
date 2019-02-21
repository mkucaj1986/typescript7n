import { ICartItem } from 'interfaces/ICart';

export interface IStore {
  products: ICartItem[];
  isFetching: boolean;
  dataRady: boolean;
}
