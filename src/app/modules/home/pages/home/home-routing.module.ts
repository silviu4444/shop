import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeListItemDetailsComponent } from './home-list/home-list-item/home-list-item-details/home-list-item-details.component';

const routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomeListComponent},
      { path: 'item', component: HomeListItemDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
