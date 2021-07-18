import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddToCardComponent } from './add-to-card/add-to-card.component';
import { AddToFavoriteCardComponent } from './add-to-favorite-card/add-to-favorite-card.component';

const routes: Routes = [
  {path:'',redirectTo:'add-to-card',pathMatch:'full'},
  {path:'add-to-card',component:AddToCardComponent},
  {path:'add-to-favorite-card',component:AddToFavoriteCardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
