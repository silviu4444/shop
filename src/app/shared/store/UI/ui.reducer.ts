import * as UIActions from './ui.actions';

interface AddToCartState {
  addToCartButtonShouldChange: boolean;
}

export interface ImageSliderState {
  colorIndex: number;
  color: string;
}

export interface UIState {
  addToCart: AddToCartState;
  itemImageSlider: ImageSliderState;
}

const initialState: UIState = {
  addToCart: {
    addToCartButtonShouldChange: null
  },
  itemImageSlider: {
    colorIndex: null,
    color: null
  }
};

export function UIReducer(
  state: UIState = initialState,
  action: UIActions.UIActions
) {
  switch (action.type) {
    case UIActions.ADD_TO_CART_BUTTON_SHOULD_CHANGE:
      const buttonShouldChange = action.payload.shouldChange;
      return {
        ...state,
        addToCart: { addToCartButtonShouldChange: buttonShouldChange }
      };
    case UIActions.SET_SLIDER_IMAGE_COLOR_AND_INDEX:
      return {
        ...state,
        itemImageSlider: {
          ...state.itemImageSlider,
          color: action.payload.color,
          index: action.payload.colorIndex
        }
      };
    default:
      return state;
  }
}
