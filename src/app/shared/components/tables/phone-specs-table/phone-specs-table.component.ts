import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { selectedItem } from 'src/app/modules/home/pages/home/home.selectors';
import { HomeService } from 'src/app/modules/home/pages/home/home.service';
import { MobilePhone } from 'src/app/modules/home/pages/home/models/phone.model';
import { TableSpecs } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-phone-specs-table',
  templateUrl: './phone-specs-table.component.html',
  styleUrls: ['./phone-specs-table.component.scss']
})
export class PhoneSpecsTableComponent implements OnInit, OnDestroy {
  constructor(private store$: Store, private homeService: HomeService) {}

  tableData: TableSpecs[];
  displayedColumns: string[] = ['property', 'value'];
  isAlive = true;

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    this.store$
      .select(selectedItem)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        (item) =>
          (this.tableData = this.homeService.getPhoneTableData(
            item as MobilePhone
          ))
      );
  }

  setCustomBackgroundColor(rowData: TableSpecs) {
    return this.homeService.setPhoneTableCategoryStyle(rowData);
  }

  setRowValue(rowData: TableSpecs, cell: HTMLElement) {
    return this.homeService.brakeColumnDataInLines(rowData, cell);
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}
