import { addDetailsToItem, createPhoneTitle } from './home-utility-functions';

const fakePhone = {
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
    mobileNetwork: '4G'
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

const items = [
  {
    id: 1
  },
  {
    id: 2
  }
];


describe('Home Utility Functions', () => {
  it('expect createPhoneTitle to not include SIM on title', () => {
    expect(createPhoneTitle(fakePhone)).not.toContain('SIM');
  });

  it('expect createPhoneTitle to include SIM on title', () => {
    const phoneWithSimProperty = {
      ...fakePhone,
      specs: { ...fakePhone.specs, sim: 'Dual SIM' }
    };
    expect(createPhoneTitle(phoneWithSimProperty)).toContain('SIM');
  });

  it('addDetailToItem should return an computed item', () => {
    expect(addDetailsToItem(items, fakePhone)).toBeDefined();
  });

  it('addDetailToItem should return null if selectedItem is not defined', () => {
    expect(addDetailsToItem(items, null)).toEqual(null);
  })
});
