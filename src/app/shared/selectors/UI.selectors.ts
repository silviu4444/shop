import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ImageSliderState } from '../store/UI/ui.reducer';

const UIButtonShouldChange = (state: AppState) =>
  state.UIStore.addToCart.addToCartButtonShouldChange;

const UIImageSlider = (state: AppState) => state.UIStore.itemImageSlider;

export const selectUIButtonShouldChange = createSelector(
  UIButtonShouldChange,
  (buttonShouldChange: boolean) => buttonShouldChange
);

export const selectUIImagesSlider = createSelector(
  UIImageSlider,
  (imageSlider: ImageSliderState) => imageSlider
);
