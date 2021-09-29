import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CartComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class SharedRoutingModule {}
