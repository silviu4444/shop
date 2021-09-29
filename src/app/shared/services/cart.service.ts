import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Laptop } from 'src/app/modules/home/pages/home/models/laptop.model';
import { MobilePhone } from 'src/app/modules/home/pages/home/models/phone.model';
import { AppState } from 'src/app/store/app.reducer';
import { CartItem } from '../interfaces/interfaces';
import * as fromUIActions from '../store/UI/ui.actions';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private store$: Store<AppState>) {}

  private initialData: CartItem = {
    colorSelected: null,
    item: null
  };

  itemData = new BehaviorSubject<CartItem>(null);

  collectedItemData: CartItem = { ...this.initialData };

  setItem(item: MobilePhone | Laptop) {
    this.collectedItemData = { ...this.collectedItemData, item: item };
  }

  setPhoneMemory(memorySelected: string) {
    this.collectedItemData = { ...this.collectedItemData, memorySelected };
    this.addToCartButtonShouldChange();
  }

  setPhoneStorage(storageSelected: string) {
    this.collectedItemData = { ...this.collectedItemData, storageSelected };
    this.addToCartButtonShouldChange();
  }

  setItemColor(colorSelected: string) {
    this.collectedItemData = { ...this.collectedItemData, colorSelected };
    this.addToCartButtonShouldChange();
  }

  getItem(itemData = this.collectedItemData) {
    this.itemData.next(itemData);
    this.addToCartButtonShouldChange(false);
  }

  addToCartButtonShouldChange(shouldChange: boolean = true) {
    this.store$.dispatch(
      new fromUIActions.AddToCartButtonShouldChange({ shouldChange })
    );
  }

  removeItemCartData() {
    this.collectedItemData = { ...this.initialData };
  }
}
