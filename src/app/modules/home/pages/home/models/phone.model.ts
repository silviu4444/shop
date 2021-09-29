interface SpecsDetails {
  general: General;
  display: Display;
  fotoVideo: FotoVideo;
  battery: Battery;
}

interface General {
  phoneType: string;
  sim: string;
  simType: string;
  os: string;
  osVersion: string;
  connectivity: string[];
  package: string[];
  year: number;
}

interface Display {
  screenSize: number;
  display: string;
  resolution: string;
}

interface FotoVideo {
  numberOfCameras: number;
  mainCamera: string[];
}

interface Battery {
  type: string;
  capacity: number;
}

export interface PhoneSpecs {
  sim?: string;
  mobileNetwork: string;
  memory: string[];
  memoryRam: string[];
  colors: Colors;
}

export interface TablePhoneSpecs {
    general: General;
    battery: Battery;
    display: Display;
    fotoVideo: FotoVideo;
    manufacturer: string;
    memory: string[];
    memoryRam: string[];
    mobileNetwork: string;
    model: string;
}

interface Colors {
  [key: string]: string[];
}

export interface PhoneDetails {
  id: number;
  specs: SpecsDetails;
}

export interface MobilePhone {
  id: number;
  imgURL: string;
  manufacturer: string;
  model: string;
  price: number;
  oldPrice: number;
  reviews: number;
  specs: PhoneSpecs;
  stars: number;
  type: string;
  inDepthDetails?: PhoneDetails;
}
