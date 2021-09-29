import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { TableSpecs } from 'src/app/shared/interfaces/interfaces';
import { createLaptopTableData, createLaptopTitle, createPhoneTableData, createPhoneTitle, updatePhoneTitleGBs } from 'src/app/shared/utility-functions/home-utility-functions';
import { Laptop } from './models/laptop.model';
import { MobilePhone } from './models/phone.model';

@Injectable({ providedIn: 'root' })
export class HomeService {

  itemTitle = new BehaviorSubject<string>(null);

  getTitle(item: Laptop | MobilePhone) {
    const isMobilePhone = item && item.type === 'mobilePhones';
    if (isMobilePhone) {
      this.getPhoneTitle(item as MobilePhone);
    } else {
      this.getLaptopTitle(item as Laptop);
    }
  }

  getPhoneTitle(phone: MobilePhone) {
    const title = createPhoneTitle(phone);
    this.itemTitle.next(title);
  }

  getLaptopTitle(laptop: Laptop) {
    const title = createLaptopTitle(laptop);
    this.itemTitle.next(title);
  }

  updateColorOnTitle(color: string, title: string) {
    const spliItem = title.split(',');
    const updatingItem = spliItem.slice(0, spliItem.length - 1);
    updatingItem.push(' ' + color);
    const updatedTitle = updatingItem.join(',');
    this.itemTitle.next(updatedTitle);
  }

  updateGBsOnTitle(gbToReplace: string) {
    let actualTitle: string;
    this.itemTitle.pipe(take(1)).subscribe((title) => (actualTitle = title));
    const updatedTitle = updatePhoneTitleGBs(actualTitle, gbToReplace);
    this.itemTitle.next(updatedTitle);
  }

  getPhoneTableData(phone: MobilePhone) {
    return createPhoneTableData(phone);
  }

  getLaptopTableData(laptop: Laptop) {
    return createLaptopTableData(laptop);
  }

  setPhoneTableCategoryStyle(rowData: TableSpecs) {
    const isACategory =
      rowData.property === 'Display' ||
      rowData.property === 'Cameras' ||
      rowData.property === 'Battery' ||
      rowData.property === 'General Details';
    if (isACategory) {
      return true;
    }
    return false;
  }

  setLaptopTableCategoryStyle(rowData: TableSpecs) {
    const isACategory =
      rowData.property === 'Display' ||
      rowData.property === 'Memory' ||
      rowData.property === 'Video' ||
      rowData.property === 'General Details';
    if (isACategory) {
      return true;
    }
    return false;
  }

  brakeColumnDataInLines(rowData: TableSpecs, cell: HTMLElement) {
    let cellContent = '';
    const isArray = Array.isArray(rowData.value);
    if (isArray) {
     const data = rowData.value as string[];
     data.forEach((value: string) => {
        cellContent += value + '<br>';
      });
      cell.innerHTML = cellContent;
    }
    return rowData.value;
  }
}
