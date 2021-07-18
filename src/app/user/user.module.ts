import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SharedModule } from '../shared/shared.module';

import { DisplayUserInfoComponent } from './display-user-info/display-user-info.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MessageComponent } from './message/message.component';
import { ItemListComponent } from './item-list/item-list.component';
import { BillHistoryComponent } from './bill-history/bill-history.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { PermanentAddressComponent } from './permanent-address/permanent-address.component';
import { UserRightSideMenuComponent } from './user-right-side-menu/user-right-side-menu.component';


@NgModule({
  declarations: [
    LoginComponent, 
    RegistrationComponent, 
    
    DisplayUserInfoComponent, 
    EditUserComponent, 
    ChangePasswordComponent, 
    MessageComponent, 
    ItemListComponent, 
    BillHistoryComponent, 
    DeliveryAddressComponent, 
    PermanentAddressComponent,
    UserRightSideMenuComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
