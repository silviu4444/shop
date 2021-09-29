import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Laptop } from '../../models/laptop.model';
import { MobilePhone } from '../../models/phone.model';
import { HomeItemComponent } from './home-list-item.component';

const phoneExample: MobilePhone = {
  id: 2,
  imgURL: 'test',
  manufacturer: 'test',
  model: 'test',
  price: 649,
  oldPrice: 900,
  reviews: 825,
  specs: {
    colors: {
      Red: ['test', 'test2']
    },
    sim: 'Dual SIM',
    memory: ['64', '256'],
    memoryRam: ['3'],
    mobileNetwork: '4G'
  },
  stars: 4.8,
  type: 'mobilePhones'
};

const laptopExample: Laptop = {
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
      Black: ['test', 'test2']
    },
    display: 'True Tone',
    inch: 13,
    memory: 'SSD 256GB',
    processor: 'Apple M1'
  },
  stars: 4.9,
  type: 'laptops',
};

const routes = [{ path: 'item', component: HomeItemComponent }];

describe('HomeItemComponent', () => {
  let component: HomeItemComponent;
  let fixture: ComponentFixture<HomeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeItemComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeItemComponent);
    component = fixture.componentInstance;
    component.item = phoneExample as MobilePhone;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call getTitle', () => {
  //   const spyOnGetTitle = spyOn(component, 'getTitle');
  //   fixture.detectChanges();
  //   expect(spyOnGetTitle).toHaveBeenCalled()
  // })

  // it('should call createPhoneTitle if component.item is a MobilePhone (getTitle fn)', () => {
  //   component.item = phoneExample as MobilePhone;
  //   const spyOnCreatePhTitle = spyOn(
  //     component['homeService'],
  //     'createPhoneTitle'
  //   );
  //   component.getTitle();
  //   expect(spyOnCreatePhTitle).toHaveBeenCalled();
  // });

  // it('should call createLaptopTitle if isMobilePhone(getTitle fn) is false', () => {
  //   component.item = laptopExample as Laptop;
  //   fixture.detectChanges();
  //   const spyOnCreateLaptopTitle = spyOn(
  //     component['homeService'],
  //     'createLaptopTitle'
  //   );
  //   component.getTitle();
  //   expect(spyOnCreateLaptopTitle).toHaveBeenCalled();
  // });

  // it('should have sim in item title', () => {
  //   component.item = phoneExample;
  //   component.item.specs.sim = 'Dual SIM';
  //   expect(component.getTitle()).toContain('Dual SIM');
  // });

  // it('should replace sim in title with an empty string if a sim property is undefined(getTitle fn)', () => {
  //   component.item = phoneExample;
  //   delete component.item.specs.sim;
  //   expect(component.getTitle()).not.toContain('Dual SIM');
  // });

  it('should navigate when an items was clicked', () => {
    const spyOnRouterNavigate = spyOn(component['router'], 'navigate');
    const item = fixture.debugElement.nativeElement.querySelector('a');
    item.dispatchEvent(new Event('click'))
    expect(spyOnRouterNavigate).toHaveBeenCalledWith(['item/'], {
      relativeTo: component['route'],
      queryParams: { id: component.item.id }
    });
  });
});
