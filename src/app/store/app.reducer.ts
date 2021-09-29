import { ActionReducerMap } from '@ngrx/store';
import * as fromHome from '../modules/home/pages/home/store/home.reducer';
import * as fromUI from '../shared/store/UI/ui.reducer';
import * as fromCart from '../shared/store/cart/cart.reducer';

export interface AppState {
  homeStore: fromHome.HomeState;
  UIStore: fromUI.UIState;
  cartStore: fromCart.CartState
}

export const appReducer: ActionReducerMap<AppState> = {
  homeStore: fromHome.homeReducer,
  UIStore: fromUI.UIReducer,
  cartStore: fromCart.cartReducer
};
