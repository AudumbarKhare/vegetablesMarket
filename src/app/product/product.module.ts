import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { AddToCardComponent } from './add-to-card/add-to-card.component';
import { SharedModule } from '../shared/shared.module';
import { AddToFavoriteCardComponent } from './add-to-favorite-card/add-to-favorite-card.component';

@NgModule({
  declarations: [AddToCardComponent, AddToFavoriteCardComponent],
  imports: [
   SharedModule,
   ProductRoutingModule
  ]
})
export class ProductModule { }
