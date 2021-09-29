import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { selectedItem } from 'src/app/modules/home/pages/home/home.selectors';
import { HomeService } from 'src/app/modules/home/pages/home/home.service';
import { Laptop } from 'src/app/modules/home/pages/home/models/laptop.model';
import { TableSpecs } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-laptop-specs-table',
  templateUrl: './laptop-specs-table.component.html',
  styleUrls: ['./laptop-specs-table.component.scss']
})
export class LaptopSpecsTableComponent implements OnInit, OnDestroy {
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
          (this.tableData = this.homeService.getLaptopTableData(
            item as Laptop
          ))
      );
  }

  setCustomBackgroundColor(rowData: TableSpecs) {
    return this.homeService.setLaptopTableCategoryStyle(rowData);
  }

  setRowValue(rowData: TableSpecs, cell: HTMLElement) {
    return this.homeService.brakeColumnDataInLines(rowData, cell);
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

}
