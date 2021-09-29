import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { selectUIImagesSlider } from 'src/app/shared/selectors/UI.selectors';
import { CartService } from 'src/app/shared/services/cart.service';
import { CustomSnackbarService } from 'src/app/shared/services/CustomSnackbar.service';
import { AppState } from 'src/app/store/app.reducer';
import {
  homeProductsHasItems,
  selectedItem,
  selectHomeError
} from '../../../home.selectors';
import { HomeService } from '../../../home.service';
import { Laptop } from '../../../models/laptop.model';
import { MobilePhone } from '../../../models/phone.model';
import * as HomeActions from '../../../store/home.actions';

@Component({
  selector: 'app-home-list-item-details',
  templateUrl: './home-list-item-details.component.html',
  styleUrls: ['./home-list-item-details.component.scss']
})
export class HomeListItemDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private store$: Store<AppState>,
    private customSnackBar: CustomSnackbarService,
    private homeService: HomeService,
    private cartService: CartService
  ) {}

  title: string;
  isAlive = true;
  item: Laptop | MobilePhone;
  itemColor: string;

  ngOnInit(): void {
    this.fetchItem();
    this.selectHomeError();
    this.selectItem();
    this.setComponentTitle();
    this.onUpdateSlider();
  }

  fetchItem() {
    let id: string;
    this.route.queryParams.subscribe((queryParams) => {
      id = queryParams.id;
    });
    this.store$
      .select(homeProductsHasItems)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        (hasItems: boolean) =>
          hasItems &&
          this.store$.dispatch(new HomeActions.FetchItemDetailsStart({ id }))
      );
  }

  selectItem() {
    this.store$
      .select(selectedItem)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((item) => item && this.configureItemAfterSelecting(item));
  }

  selectHomeError() {
    this.store$
      .select(selectHomeError)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        (error: string) => error && this.customSnackBar.open(error, 'Close')
      );
  }

  configureItemAfterSelecting(item: Laptop | MobilePhone) {
    this.item = item;
    const colorsKeys = Object.keys(item.specs.colors);
    this.itemColor = colorsKeys[0];
    this.homeService.getTitle(this.item);
    this.cartService.setItemColor(colorsKeys[0]);
    this.cartService.setItem(item);
  }

  setComponentTitle() {
    this.homeService.itemTitle
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((title: string) => (this.title = title));
  }

  onUpdateSlider = () => {
    this.store$
      .select(selectUIImagesSlider)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((sliderState) => {
        this.cartService.setItemColor(sliderState.color);
        this.itemColor = sliderState.color;
      });
  };

  ngOnDestroy() {
    this.isAlive = false;
    this.store$.dispatch(new HomeActions.DeleteItemDetails());
    this.cartService.removeItemCartData();
  }
}
