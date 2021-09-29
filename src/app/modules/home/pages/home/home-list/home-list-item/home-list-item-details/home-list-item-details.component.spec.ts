import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { selectUIImagesSlider } from 'src/app/shared/selectors/UI.selectors';
import {
  homeProductsHasItems,
  selectedItem,
  selectHomeError
} from '../../../home.selectors';
import { HomeService } from '../../../home.service';

import { HomeListItemDetailsComponent } from './home-list-item-details.component';

const mockRoute = {
  queryParams: of({ id: 100 })
};

const mockHomeService = {
  getTitle: () => 'LAPTOP TITLE',
  itemTitle: of('LAPTOP TITLE')
};

const fakeLaptop = {
  id: 101,
  imgURL:
    'https://s13emagst.akamaized.net/products/33874/33873196/images/res_2ce18bde5ec79adc307a8d4fc03e40a3.jpg?width=150&height=150&hash=A649F6B481D5B3EB10B7C31C7851B679',
  manufacturer: 'Apple',
  model: 'MacBook Air',
  oldPrice: 1199,
  price: 999,
  reviews: 113,
  specs: {
    colors: {
      'Space Grey': [
        'https://s13emagst.akamaized.net/products/33874/33873196/images/res_2ce18bde5ec79adc307a8d4fc03e40a3.jpg?width=450&height=450&hash=36E0AD827269108B1960B2D568C73060'
      ]
    },
    display: 'True Tone',
    inch: 13,
    memory: 'SSD 256GB',
    processor: 'Apple M1'
  },
  stars: 4.9,
  type: 'laptops',
  inDepthDetails: {
    id: 101,
    specs: {
      display: {
        display: ['IPS', 'RETINA'],
        inch: 13.3,
        resolution: '2560 x 1600'
      },
      general: {
        model: 'MacBook Air Retina',
        weight: 1.29
      },
      hardDisk: {
        capacity: '256 GB',
        type: 'SSD'
      },
      memory: {
        capacity: '8 GB'
      },
      software: 'Mac OS',
      video: {
        type: 'Integrated'
      }
    }
  }
};

const initialState = {
  homeStore: {
    homeProducts: {
      mobilePhones: [],
      laptops: [{}]
    },
    homeError: 'error test',
    selectedItem: fakeLaptop
  },
  UIStore: {
    itemImageSlider: {
      colorIndex: 0,
      color: 'Black'
    }
}
};

describe('HomeListItemDetailsComponent', () => {
  let component: HomeListItemDetailsComponent;
  let fixture: ComponentFixture<HomeListItemDetailsComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeListItemDetailsComponent],
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: homeProductsHasItems,
              value: initialState.homeStore.homeProducts.laptops.length > 0
            },
            {
              selector: selectedItem,
              value: initialState.homeStore.selectedItem
            },
            {
              selector: selectHomeError,
              value: initialState.homeStore.homeError
            },
            {
              selector: selectUIImagesSlider,
              value: initialState.UIStore.itemImageSlider
            }
          ]
        }),
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: HomeService, useValue: mockHomeService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListItemDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fetchItem should call store.dispatch if queryParams has an id', () => {
    const spyOnStoreDispatch = spyOn(store, 'dispatch');
    component.fetchItem();
    component['route'].queryParams.subscribe((queryParams) => {
      expect(queryParams.id).toEqual(100);
    });
    expect(spyOnStoreDispatch).toHaveBeenCalled();
  });

  it('should open snackbar if homeState has an error', () => {
    const spyOnSnackBar = spyOn(component['customSnackBar'], 'open');
    component.selectHomeError();
    store.select(selectHomeError).subscribe((error) => {
      expect(error).toBeDefined();
      expect(spyOnSnackBar).toHaveBeenCalled();
    });
  });

  it('should call configureItemAfterSelecting if a selectedItem exists on store', () => {
    const spyOnConfigureItemAfterSelecting = spyOn(
      component,
      'configureItemAfterSelecting'
    );
    component.selectItem();
    expect(spyOnConfigureItemAfterSelecting).toHaveBeenCalledWith(
      initialState.homeStore.selectedItem
    );
  });

  it('configureItemAfterSelecting should set item, itemColor and will call homeService.getTitle', () => {
    const spyOnGetTitle = spyOn(component['homeService'], 'getTitle');
    component.configureItemAfterSelecting(fakeLaptop);
    expect(component.item).toEqual(fakeLaptop);
    expect(component.itemColor).toEqual('Space Grey');
    expect(spyOnGetTitle).toHaveBeenCalledWith(component.item);
  });

  it('setComponentTitle should set title', () => {
    component.setComponentTitle();
    expect(component.title).toEqual('LAPTOP TITLE');
  });

  it('onUpdateSlider should update itemColor when store emits a value', () => {
    component.onUpdateSlider();
    expect(component.itemColor).toEqual(initialState.UIStore.itemImageSlider.color);
  })
});
