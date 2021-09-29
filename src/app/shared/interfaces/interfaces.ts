import { Laptop } from "src/app/modules/home/pages/home/models/laptop.model";
import { MobilePhone } from "src/app/modules/home/pages/home/models/phone.model";

interface RAM {
  ramOptions: string[];
  itemIdx: number;
}

interface Storage {
  storageOptions: string[];
  itemIdx: number;
}

export interface PhoneMemory {
  ram: RAM;
  storage: Storage;
}

export interface CartItem {
  memorySelected?: string;
  storageSelected?: string;
  colorSelected: string;
  item: MobilePhone | Laptop;
}

export interface TableSpecs {
  property: string;
  value: string[] | string | number;
}

export interface TableCartItem {
  image: string;
  title: string;
  price: number;
  numberOfItems: number;
  findInCartIndex: number;
}
