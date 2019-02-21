export interface ICartItems {
  forEach(arg0: (el: ICartItem) => void): any;
  [index: number]: ICartItem;
}

export interface ICartItem {
  activesku: string;
  title: string;
  subtitle: string;
  currency: string;
  category: string;
  img: string;
  price: number;
  qty: number;
}
