import { Action } from '@ngrx/store';

export const ADD_TO_CART_BUTTON_SHOULD_CHANGE =
  '[SHARED] ADD_TO_CART_BUTTON_SHOULD_CHANGE';
export const SET_SLIDER_IMAGE_COLOR_AND_INDEX =
  '[SHARED] SET_SLIDER_IMAGE_COLOR_AND_INDEX';

export class AddToCartButtonShouldChange implements Action {
  readonly type = ADD_TO_CART_BUTTON_SHOULD_CHANGE;
  constructor(public payload: { shouldChange: boolean }) {}
}

export class SetSliderImageColorAndIndex implements Action {
  readonly type = SET_SLIDER_IMAGE_COLOR_AND_INDEX;
  constructor(public payload: { color: string; colorIndex: number }) {}
}

export type UIActions =
  | AddToCartButtonShouldChange
  | SetSliderImageColorAndIndex;
