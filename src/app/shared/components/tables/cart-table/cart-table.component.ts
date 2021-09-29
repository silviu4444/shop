import { Component, Input } from '@angular/core';
import { TableCartItem } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent {
  constructor() {}
  @Input() dataSource: TableCartItem[] = [];
  displayedColumns: string[] = [
    'numberOfItems',
    'image',
    'title',
    'price',
    'remove'
  ];
  tableHeight: number;

  onRemoveButton() {
    // need to implement logic to remove an item from cart
  }
}
