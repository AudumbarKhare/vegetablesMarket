import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CanLeaveGuard } from '../auth/can-leave.guard';
import { BillHistoryComponent } from './bill-history/bill-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { DisplayUserInfoComponent } from './display-user-info/display-user-info.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ItemListComponent } from './item-list/item-list.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { PermanentAddressComponent } from './permanent-address/permanent-address.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent, canDeactivate:[CanLeaveGuard]},
  {path:'user-registration',component:RegistrationComponent, canDeactivate:[CanLeaveGuard]},
  //{path:'user-info',component:UserInfoComponent,canActivate:[AuthGuard]},
  {
    path:'user-info',canActivate:[AuthGuard],
    children:[
      {path:'',component:DisplayUserInfoComponent},
      {path:'edit-user-info',component:EditUserComponent},
      {path:'delivery-address',component:DeliveryAddressComponent},
      {path:'permanent-address',component:PermanentAddressComponent},
      {path:'change-password',component:ChangePasswordComponent},
      {path:'message',component:MessageComponent},
      {path:'item-list',component:ItemListComponent},
      {path:'bill-history',component:BillHistoryComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
