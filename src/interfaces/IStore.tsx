import { ICartItem } from 'interfaces/ICart';

export interface IStore {
  products: any;
  isFetching: boolean;
  dataRady: boolean;
}

export interface ICartItems {
  items: ICartItem;
}
