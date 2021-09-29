import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.reducer';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  // @Effect({dispatch: false})
  // addItemToCart$ = this.actions$.pipe(
  //   ofType(CartActions.ADD_ITEM_TO_CART),
  //   switchMap(() => {
  //     return this.http.get<HomeProducts>(environment.fetchHomeData);
  //   }),
  //   map((homeData) => {
  //     return new HomeActions.SetHomeDataSuccess(homeData);
  //   }),
  //   catchError((errorResponse) => {
  //     return handleErrors(errorResponse);
  //   })
  // );
}
