import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, takeWhile } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { CartItem } from '../../interfaces/interfaces';
import { selectUIButtonShouldChange } from '../../selectors/UI.selectors';
import { CartService } from '../../services/cart.service';
import * as storeActions from '../../store/cart/cart.actions';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.scss']
})
export class AddToCartButtonComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private store$: Store<AppState>
  ) {}

  itemSelectedData: CartItem;
  addToCartButtonShouldChange: boolean;
  isAlive = true;

  ngOnInit(): void {
    this.getItemPropertiesChanges();
    this.changeButtonStyle();
  }

  getItemPropertiesChanges() {
    this.cartService.itemData.subscribe(
      (itemChanges) => (this.itemSelectedData = itemChanges)
    );
  }

  changeButtonStyle() {
    this.store$
      .select(selectUIButtonShouldChange)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        (shouldChange: boolean) =>
          (this.addToCartButtonShouldChange = shouldChange)
      );
  }

  onClick() {
    this.cartService.getItem();
    this.cartService.itemData
      .pipe(take(1))
      .subscribe((itemData) => (this.itemSelectedData = itemData));
    this.store$.dispatch(
      new storeActions.AddItemToCart({ item: { ...this.itemSelectedData } })
    );
  }
}
