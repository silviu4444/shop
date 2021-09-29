import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((module) => module.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then((module) => module.AuthModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./shared/shared.module').then((module) => module.SharedModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
