import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from './shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
})
export class AdminModule { }
