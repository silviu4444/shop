import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HomeService } from './home.service';
import { Laptop } from './models/laptop.model';
import { MobilePhone } from './models/phone.model';

const fakePhone: MobilePhone = {
  id: 2,
  imgURL:
    'https://s13emagst.akamaized.net/products/25344/25343941/images/res_99d57ec9e3d9bb8d3242f384288ce0a3.jpg?width=720&height=720&hash=A4BC3CE224F32C303B0B287A5784D474',
  manufacturer: 'Apple',
  model: 'iPhone 11',
  oldPrice: 699,
  price: 649,
  reviews: 825,
  specs: {
    colors: {
      Black: [
        'https://s13emagst.akamaized.net/products/25344/25343941/images/res_99d57ec9e3d9bb8d3242f384288ce0a3.jpg?width=450&height=450&hash=786B6F02C39C1B12EDCE7B0392025549'
      ]
    },
    memory: ['64', '256'],
    memoryRam: ['3'],
    mobileNetwork: '4G',
    sim: 'Dual SIM'
  },
  stars: 4.8,
  type: 'mobilePhones',
  inDepthDetails: {
    id: 2,
    specs: {
      battery: {
        capacity: 3110,
        type: 'Li-Ion'
      },
      display: {
        display: 'IPS',
        resolution: '812 x 1792',
        screenSize: 6.1
      },
      fotoVideo: {
        mainCamera: ['12 MP Wide', '12 MP Ultrawide'],
        numberOfCameras: 2
      },
      general: {
        connectivity: ['Wi-Fi', 'Bluetooth', 'GPS', 'NFC'],
        os: 'iOS',
        osVersion: 'iOS 13',
        package: ['Phone', 'Cable - Lightning'],
        phoneType: 'Smartphone',
        sim: 'Dual SIM',
        simType: 'Nano SIM',
        year: 2019
      }
    }
  }
};

const fakeLaptop: Laptop = {
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

describe('HomeService', () => {
  let homeService: HomeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA]
    });
    homeService = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(homeService).toBeTruthy();
  });

  it('should call getPhoneTitle if the item is a phone', () => {
    const spyOnGetPhoneTitle = spyOn(homeService, 'getPhoneTitle');
    homeService.getTitle(fakePhone);
    expect(spyOnGetPhoneTitle).toHaveBeenCalledWith(fakePhone);
  });

  it('should call getLaptopTitle if the item is a laptop', () => {
    const spyOnGetLaptopTitle = spyOn(homeService, 'getLaptopTitle');
    homeService.getTitle(fakeLaptop);
    expect(spyOnGetLaptopTitle).toHaveBeenCalledWith(fakeLaptop);
  });

  it('expect item title to be defined when getPhoneTitle is called', () => {
    homeService.getPhoneTitle(fakePhone);
    expect(homeService.itemTitle.subscribe((title) => {
      expect(title).toEqual('Apple iPhone 11, Dual SIM, 3GB RAM, 4G, Black');
    }))
  })

  it('expect item title to be defined when getLaptopTitle is called', () => {
    homeService.getLaptopTitle(fakeLaptop);
    expect(homeService.itemTitle.subscribe((title) => {
      expect(title).toEqual('Apple MacBook Air, Apple M1, 13", SSD 256GB');
    }))
  })
});
