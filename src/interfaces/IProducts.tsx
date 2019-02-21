export default interface IProducts {
  readonly isFetching: boolean;
  readonly dataRady: boolean;
  readonly products: Cart[];
  readonly errors?: string | null;
}

export type ApiResponse = Record<string, any>;

export interface Cart extends ApiResponse {
  id: number;
}
