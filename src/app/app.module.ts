import { NgModule } from '@angular/core';

import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { ToastrModule } from  'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './http-interceptors/index';
import { AdminModule } from './cpanel/admin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    
    HomeModule,
    SharedModule,
    AppRoutingModule,
    SlickCarouselModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:500,
      positionClass:'toast-top-center',
      preventDuplicates:true
    }),
    AdminModule
    
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
