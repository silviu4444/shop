import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeItemComponent } from './pages/home/home-list/home-list-item/home-list-item.component';
import { HomeListComponent } from './pages/home/home-list/home-list.component';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeListItemDetailsComponent } from './pages/home/home-list/home-list-item/home-list-item-details/home-list-item-details.component';
import { HomeRoutingModule } from './pages/home/home-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { ItemPresentationComponent } from './pages/home/home-list/home-list-item/home-list-item-details/item-presentation/item-presentation.component';
import { ImageSrcAnimationDirective } from './pages/home/directives/image-src-animation.directive';
import { SetBorderOnClickDirective } from './pages/home/directives/set-border-on-click.directive';
import { SelectItemPropertiesComponent } from './pages/home/home-list/home-list-item/home-list-item-details/select-item-properties/select-item-properties.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    HomeRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  declarations: [
    HomeComponent,
    HomeItemComponent,
    HomeListComponent,
    HomeListItemDetailsComponent,
    ItemPresentationComponent,
    ImageSrcAnimationDirective,
    SetBorderOnClickDirective,
    SelectItemPropertiesComponent
  ],
  exports: [HomeComponent, HomeItemComponent, HomeListComponent]
})
export class HomeModule {}
