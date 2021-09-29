import { AppState } from "src/app/store/app.reducer";
import { selectedItem } from "./home.selectors"
const initialState: AppState = {
  homeStore: {
    homeProducts: {
      mobilePhones: [],
      laptops: []
    },
    homeError: 'error',
    selectedItem: null
  },
  UIStore: null
};

describe('HomeSelectors', () => {
  it('selectedItemDetails should return null', () => {
    expect(selectedItem(initialState)).toBe(null);
  })
})
