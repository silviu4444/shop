import { Action } from '@ngrx/store';
import { Laptop } from '../models/laptop.model';
import { MobilePhone } from '../models/phone.model';

export const FETCH_HOME_DATA_START = '[Home] FETCH_HOME_DATA_START';
export const SET_HOME_DATA_SUCCESS = '[Home] SET_HOME_DATA_SUCCESS';
export const FETCH_ITEM_DETAILS_START = '[Home] FETCH_ITEM_DETAILS_START';
export const SET_ITEM_DETAILS_SUCCESS = '[Home] SET_ITEM_DETAILS_SUCCESS';
export const FETCH_FAIL = '[Home] FETCH_FAIL';
export const CLEAR_ERROR = '[Home] CLEAR_ERROR';
export const DELETE_ITEM_DETAILS = '[Home] DELETE_ITEM_DETAILS';

export class FetchHomeDataStart implements Action {
  readonly type = FETCH_HOME_DATA_START;
}

export class SetHomeDataSuccess implements Action {
  readonly type = SET_HOME_DATA_SUCCESS;
  constructor(
    public payload: { mobilePhones: MobilePhone[]; laptops: Laptop[] }
  ) {}
}

export class FetchItemDetailsStart implements Action {
  readonly type = FETCH_ITEM_DETAILS_START;
  constructor(public payload: { id: string }) {}
}

export class SetItemDetailsSuccess implements Action {
  readonly type = SET_ITEM_DETAILS_SUCCESS;
  constructor(public payload: { itemDetails: Laptop | MobilePhone }) {}
}

export class DeleteItemDetails implements Action {
  readonly type = DELETE_ITEM_DETAILS;
}

export class FetchFail implements Action {
  readonly type = FETCH_FAIL;
  constructor(public payload: { errorMessage: string }) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type HomeActions =
  | FetchHomeDataStart
  | SetHomeDataSuccess
  | FetchFail
  | FetchItemDetailsStart
  | SetItemDetailsSuccess
  | DeleteItemDetails;
