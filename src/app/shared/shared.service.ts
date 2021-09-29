import { Injectable } from "@angular/core";
import { CartItemWithQuantity } from "./store/cart/cart.reducer";
import { createCartTableData } from "./utility-functions/cart-utility-functions";

@Injectable({providedIn: 'root'})
export class SharedService {
  generateCartTableData(cartItems: CartItemWithQuantity[]) {
    return createCartTableData(cartItems);
  }
}
