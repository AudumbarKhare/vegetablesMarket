import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutUsComponent},
  {path:'contact-us',component:ContactComponent},
  {path:'productList',component:ProductComponent},
  {path:'productDetails/:id',component:ProductDetailsComponent},
  {path: 'product',
  loadChildren: () => import('../product/product.module').then(m => m.ProductModule)},
  {path:'user',
  loadChildren: () => import('../user/user.module').then(m=>m.UserModule)},
  {path:'cpanel',
  loadChildren: () => import('../cpanel/admin.module').then(m=>m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
