import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { selectHomeProducts } from '../home.selectors';
import { HomeProducts } from '../store/home.reducer';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent {
  constructor(private store$: Store<AppState>) {}
  homeList: Observable<HomeProducts> = this.store$.select(selectHomeProducts);
}
