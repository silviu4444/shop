import { Laptop } from '../models/laptop.model';
import { MobilePhone } from '../models/phone.model';
import * as HomeActions from './home.actions';

export interface HomeState {
  homeProducts: HomeProducts;
  homeError: string;
  selectedItem: Laptop | MobilePhone;
}

export interface HomeProducts {
  mobilePhones: MobilePhone[];
  laptops: Laptop[];
}

const initialState: HomeState = {
  homeProducts: {
    mobilePhones: [],
    laptops: []
  },
  homeError: null,
  selectedItem: null
};

export function homeReducer(
  state: HomeState = initialState,
  action: HomeActions.HomeActions
) {
  switch (action.type) {
    case HomeActions.SET_HOME_DATA_SUCCESS:
      return {
        ...state,
        homeProducts: {
          mobilePhones: action.payload.mobilePhones,
          laptops: action.payload.laptops
        }
      };
    case HomeActions.SET_ITEM_DETAILS_SUCCESS:
      let itemDetails = action.payload.itemDetails;
      return {
        ...state,
        selectedItem: itemDetails
      };
    case HomeActions.FETCH_FAIL:
      return {
        ...state,
        homeError: action.payload.errorMessage
      }
    case HomeActions.DELETE_ITEM_DETAILS:
      return {
        ...state,
        selectedItem: null
      };
    default:
      return state;
  }
}
