import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, takeWhile } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { CartItem } from '../../interfaces/interfaces';
import { SelectUIButtonShouldChange } from '../../selectors/UI.selectors';
import { CartService } from '../../services/cart.service';
import * as storeActions from '../../store/cart/cart.actions';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit, OnDestroy {
  constructor(
    private store$: Store<AppState>,
    private cartService: CartService
  ) {}

  itemSelectedData: CartItem;
  addToCartButtonShouldChange: boolean;
  isAlive = true;

  ngOnInit() {
    this.cartService.itemData.subscribe(
      (itemChanges) => (this.itemSelectedData = itemChanges)
    );
    this.store$
      .select(SelectUIButtonShouldChange)
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

  ngOnDestroy() {
    this.isAlive = false;
  }
}
