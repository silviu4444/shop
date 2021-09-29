import { Laptop } from "src/app/modules/home/pages/home/models/laptop.model";
import { MobilePhone } from "src/app/modules/home/pages/home/models/phone.model";
import { CartItem, TableCartItem } from "../interfaces/interfaces";
import { CartItemWithQuantity, CartState } from "../store/cart/cart.reducer";

export const isAlreadyInCart = (item: CartItem, cartItems: CartState) => {
  const isInCart = cartItems.items.findIndex((element: CartItem) => {
    return (
      element.memorySelected === item.memorySelected &&
      element.storageSelected === item.storageSelected &&
      element.colorSelected === item.colorSelected
    );
  });
  return isInCart;
};

export const updateState = (
  state: CartState,
  itemIndex: number,
  payload: CartItem
) => {
  const updatedItems = state;
  const isInCart = itemIndex > -1;
  if (isInCart) {
    const item = { ...updatedItems.items[itemIndex] };
    item.numberOfItems++;
    updatedItems.items[itemIndex] = item;
  } else {
    updatedItems.items.push({ ...payload, numberOfItems: 1 });
  }
  return updatedItems.items;
};

export const createCartTableData = (cartItems: CartItemWithQuantity[]) => {
  const tableData: TableCartItem[] = [];
  cartItems.forEach((product, index) => {
    if (product.item.type === 'mobilePhones') {
      const phone = product.item as MobilePhone;
      const productData: TableCartItem = {
        image: phone.specs.colors[product.colorSelected][0],
        title: `${phone.manufacturer}, ${phone.model}, ${phone.inDepthDetails.specs.general.sim}, ${product.memorySelected}GB RAM, ${product.storageSelected}GB, ${product.colorSelected}`,
        price: phone.price,
        numberOfItems: product.numberOfItems,
        findInCartIndex: index
      };
      tableData.push(productData);
    } else {
      const laptop = product.item as Laptop;
      const productData: TableCartItem = {
        image: laptop.specs.colors[product.colorSelected][0],
        title: `${laptop.manufacturer}, ${laptop.model}, ${laptop.specs.inch}, ${laptop.inDepthDetails.specs.hardDisk.type} ${laptop.inDepthDetails.specs.hardDisk.capacity}`,
        price: laptop.price,
        numberOfItems: product.numberOfItems,
        findInCartIndex: index
      };
      tableData.push(productData);
    }
  });
  return tableData;
};
