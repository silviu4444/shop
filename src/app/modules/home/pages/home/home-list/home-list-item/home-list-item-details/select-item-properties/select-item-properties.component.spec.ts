import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HomeService } from '../../../../home.service';

import { SelectItemPropertiesComponent } from './select-item-properties.component';

const mockHomeService = {
  updateColorOnTitle: (color, title) => 'test'
};

const initialState = {
  homeStore: {
    homeProducts: {
      mobilePhones: [],
      laptops: [{}]
    },
    homeError: 'error test',
    selectedItem: null
  }
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

describe('SelectItemPropertiesComponent', () => {
  let component: SelectItemPropertiesComponent;
  let fixture: ComponentFixture<SelectItemPropertiesComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectItemPropertiesComponent],
      providers: [
        provideMockStore({
          initialState
        }),
        {
          provide: HomeService,
          useValue: mockHomeService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectItemPropertiesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    component.item = fakeLaptop;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onChangeColor if an color was clicked', () => {
    const spyUpdateColorOnTitle = spyOn(component, 'onChangeColor');
    fixture.detectChanges();
    const imageButton =
      fixture.debugElement.nativeElement.querySelector('.item-color');
    imageButton.click();
    expect(spyUpdateColorOnTitle).toHaveBeenCalledWith('Space Grey', 0);
  });

  it('onChangeColor should call homeService.updateColorOnTitle', () => {
    const spyOnUpdateColorOnTitle = spyOn(
      component['homeService'],
      'updateColorOnTitle'
    );
    component.onChangeColor('Blue', 0);
    expect(spyOnUpdateColorOnTitle).toHaveBeenCalledWith('Blue', component.title);
  });

  it('onChangeColor should call store.dispatch', () => {
    const  spyOnDispatch = spyOn(component['store$'], 'dispatch');
    component.onChangeColor('Blue', 0);
    expect(spyOnDispatch).toHaveBeenCalled();
  })
});
