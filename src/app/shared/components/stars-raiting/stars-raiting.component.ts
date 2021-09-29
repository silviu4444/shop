import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars-raiting',
  templateUrl: './stars-raiting.component.html',
  styleUrls: ['./stars-raiting.component.scss']
})
export class StarsRaitingComponent {
  @Input() raiting: number;
}
