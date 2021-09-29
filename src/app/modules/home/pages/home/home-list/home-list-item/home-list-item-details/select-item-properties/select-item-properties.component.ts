import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PhoneMemory } from 'src/app/shared/interfaces/interfaces';
import { AppState } from 'src/app/store/app.reducer';
import { HomeService } from '../../../../home.service';
import { Laptop } from '../../../../models/laptop.model';
import { MobilePhone } from '../../../../models/phone.model';
import * as UIActions from '../../../../../../../../shared/store/UI/ui.actions';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-select-item-properties',
  templateUrl: './select-item-properties.component.html',
  styleUrls: ['./select-item-properties.component.scss']
})
export class SelectItemPropertiesComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private store$: Store<AppState>,
    private cartService: CartService
  ) {}

  @Input() item: Laptop | MobilePhone;
  @Input() title: string;
  colorsAvailableIndex = 0;
  phoneMemory: PhoneMemory;

  ngOnInit() {
    this.configurePhone();
  }

  configurePhone() {
    if (this.item.type === 'mobilePhones') {
      this.setPhoneMemory();
      this.setCartItemGBs();
      this.setCartItemStorage();
    }
  }

  setPhoneMemory() {
    const phone = this.item as MobilePhone;
    this.phoneMemory = {
      ram: {
        ramOptions: phone.specs.memoryRam,
        itemIdx: 0
      },
      storage: {
        storageOptions: phone.specs.memory,
        itemIdx: 0
      }
    };
  }

  setCartItemGBs() {
    const defaultMemory = this.phoneMemory.ram.ramOptions[0];
    this.cartService.setPhoneMemory(defaultMemory);
  }

  setCartItemStorage() {
    const defaultStorage = this.phoneMemory.storage.storageOptions[0];
    this.cartService.setPhoneStorage(defaultStorage);
  }

  onChangeRAM(index: number) {
    this.phoneMemory.ram.itemIdx = index;
    const GBSelected = this.phoneMemory.ram.ramOptions[index];
    this.homeService.updateGBsOnTitle(GBSelected);
    this.cartService.setPhoneMemory(GBSelected);
  }

  onChangeStorage(index: number) {
    this.phoneMemory.storage.itemIdx = index;
    const selectedMemoryRAM = this.phoneMemory.storage.storageOptions[index];
    this.cartService.setPhoneStorage(selectedMemoryRAM);
  }

  onChangeColor(color: string, colorIndex: number) {
    this.colorsAvailableIndex = colorIndex;
    this.homeService.updateColorOnTitle(color, this.title);
    this.store$.dispatch(
      new UIActions.SetSliderImageColorAndIndex({ color, colorIndex })
    );
  }
}
