import { Action } from '@ngrx/store';
import { CartItem } from '../../interfaces/interfaces';

export const ADD_ITEM_TO_CART = '[SHARED] AddItemToCart';

export class AddItemToCart implements Action {
  readonly type = ADD_ITEM_TO_CART;
  constructor(public payload: { item: CartItem }) {}
}

export type CartActions = AddItemToCart;
