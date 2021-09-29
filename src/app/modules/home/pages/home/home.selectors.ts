import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Laptop } from './models/laptop.model';
import { MobilePhone } from './models/phone.model';
import { HomeProducts } from './store/home.reducer';

const homeProductsCombined = (state: AppState) => {
  const result = [];
  Object.keys(state.homeStore.homeProducts).forEach((key) =>
    result.push(...state.homeStore.homeProducts[key])
  );
  return result;
};

const selectItem = (state: AppState) => state.homeStore.selectedItem;

const homeError = (state: AppState) => state.homeStore.homeError;

const homeProducts = (state: AppState) => state.homeStore.homeProducts;

const homeHasItems = (state: AppState) =>
  state.homeStore.homeProducts.laptops.length > 0;

export const selectHomeProductsCombined = createSelector(
  homeProductsCombined,
  (homeProducts) => homeProducts
);

export const selectedItem = createSelector(
  selectItem,
  (selectedItem: Laptop | MobilePhone) => selectedItem
);

export const selectHomeError = createSelector(
  homeError,
  (homeError: string) => homeError
);

export const selectHomeProducts = createSelector(
  homeProducts,
  (homeProducts: HomeProducts) => homeProducts
);

export const homeProductsHasItems = createSelector(
  homeHasItems,
  (hasItems: boolean) => hasItems
);
