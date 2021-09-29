import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

export const SelectCartItems = (state: AppState) => state.cartStore.items;

export const SelectTotalNumberOfItemsInCart = createSelector(
  SelectCartItems,
  (items) => {
    let number = 0;
    items.forEach((item) => (number += item.numberOfItems));
    return number;
  }
);
