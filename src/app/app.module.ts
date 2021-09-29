import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './modules/home/home.module';
import { AngularMaterialModule } from './material.module';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './modules/home/pages/home/store/home.effects';
import { appReducer } from './store/app.reducer';
import { AuthModule } from './core/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    AuthModule,
    HttpClientModule,
    AngularMaterialModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([HomeEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
