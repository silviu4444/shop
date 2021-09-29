import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as HomeActions from './home.actions';
import { HomeProducts } from './home.reducer';

import { environment } from 'src/environments/environment';
import { LaptopDetails } from '../models/laptop.model';
import { PhoneDetails } from '../models/phone.model';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { selectHomeProductsCombined } from '../home.selectors';
import { addDetailsToItem } from 'src/app/shared/utility-functions/home-utility-functions';

const handleErrors = (errorRes: HttpErrorResponse) => {
  let errorMessage = 'Something went wrong with the server';
  return of(new HomeActions.FetchFail({ errorMessage }));
};

@Injectable()
export class HomeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  fetchHomeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.FETCH_HOME_DATA_START),
      switchMap(() => {
        return this.http.get<HomeProducts>(environment.fetchHomeData);
      }),
      map((homeData) => {
        return new HomeActions.SetHomeDataSuccess(homeData);
      }),
      catchError((errorResponse) => {
        return handleErrors(errorResponse);
      })
    )
  );

  getItemDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.FETCH_ITEM_DETAILS_START),
      withLatestFrom(this.store.select(selectHomeProductsCombined)),
      switchMap(([fetchItemAction, items]) => {
        const actions: HomeActions.FetchItemDetailsStart = fetchItemAction;
        const itemID = actions.payload.id;
        return this.http.get(`${environment.fetchByID}/${itemID}.json`).pipe(
          map((itemDetails: LaptopDetails | PhoneDetails) => {
            const updatedItem = addDetailsToItem(items, itemDetails);
            return new HomeActions.SetItemDetailsSuccess({
              itemDetails: updatedItem
            });
          }),
          catchError((errorResponse) => {
            return handleErrors(errorResponse);
          })
        );
      })
    )
  );
}
