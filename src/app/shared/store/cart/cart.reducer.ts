import { CartItem } from '../../interfaces/interfaces';
import { isAlreadyInCart, updateState } from '../../utility-functions/cart-utility-functions';
import * as CartActions from './cart.actions';

export interface CartItemWithQuantity extends CartItem {
  numberOfItems: number;
}

export interface CartState {
  items: CartItemWithQuantity[];
}

const initialState: CartState = {
  items: []
};

export function cartReducer(
  state: CartState = initialState,
  action: CartActions.CartActions
) {
  switch (action.type) {
    case CartActions.ADD_ITEM_TO_CART:
      const payload = action.payload.item
      const stateItems = { items: [...state.items] };
      const isInCartIndex = isAlreadyInCart(payload, stateItems);
      const updatedItems = updateState(
        stateItems,
        isInCartIndex,
        payload
      );
      return {
        ...state,
        items: updatedItems
      };
    default:
      return state;
  }
}
