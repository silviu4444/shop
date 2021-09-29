import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppState } from 'src/app/store/app.reducer';
import { SelectTotalNumberOfItemsInCart } from '../../selectors/cart.selecors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private store$: Store<AppState>
  ) {}

  @Input() matDrawerRef: MatDrawer;
  isAuthenticated = false;
  isAlive = true;
  numberOfItemsInCart: number = null;

  ngOnInit() {
    this.getUser();
    this.getNumberOfItems();
  }

  getUser() {
    this.authService.user$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  getNumberOfItems() {
    this.store$
      .select(SelectTotalNumberOfItemsInCart)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((totalItems) => (this.numberOfItemsInCart = totalItems));
  }

  onToggleSidebar() {
    this.matDrawerRef.toggle();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}
