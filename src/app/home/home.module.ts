import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductComponent } from './product/product.component';
import { RightSideBarComponent } from './right-side-bar/right-side-bar.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
@NgModule({
  declarations: [HomeComponent, ProductComponent, RightSideBarComponent, ProductDetailsComponent, AboutUsComponent, ContactComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class HomeModule { }
