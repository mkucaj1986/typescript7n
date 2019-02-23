import { ICartItem } from 'interfaces/ICart';

export interface IStore {
  products: ICartItem[];
  isFetching: boolean;
  totalPrice: number;
  dataRady: boolean;
  errors: string | null;
}
