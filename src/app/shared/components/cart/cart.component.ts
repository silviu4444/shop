import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { TableCartItem } from '../../interfaces/interfaces';
import { SelectCartItems } from '../../selectors/cart.selecors';
import { SharedService } from '../../shared.service';
import { CartItemWithQuantity } from '../../store/cart/cart.reducer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(private store$: Store, private sharedService: SharedService) {}

  cartItems: CartItemWithQuantity[] = null;
  homeProducts = null;
  isAlive = true;
  tableData: TableCartItem[];

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.store$
      .select(SelectCartItems)
      .pipe(take(1))
      .subscribe((items) => {
        if (items.length > 0) {
          this.cartItems = items;
          this.getCartTableData();
        }
      });
  }

  getCartTableData() {
    this.tableData = this.sharedService.generateCartTableData(this.cartItems);
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}
