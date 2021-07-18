import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInfoService } from 'src/app/service/user-info.service';
import { UserInfo } from '../user';
@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {

  frmDeliveryAddress!:FormGroup;

  constructor(
    private _fb:FormBuilder, 
    private _userInfoService:UserInfoService,
    private _router: Router,
    private _toast: ToastrService
    ) { }

  ngOnInit(): void {
    this.validationDeliveryAddress();
    let registration_id = +this._userInfoService.userInfo.registration_id;
    this. getfrmDeliveryAddress(registration_id);
  }

  ////////////validation Delivery Address form//////////
  validationDeliveryAddress(){
    this.frmDeliveryAddress = this._fb.group({
      registration_id:['',[Validators.required]],
      building : ['',[Validators.required]],
      state : ['',[Validators.required]],
      pincode : ['',[Validators.required]],
      city : ['',[Validators.required]],
      country : ['',[Validators.required]],
      address1 : ['',[Validators.required]]
    })
  }
  ///get user info details
  getfrmDeliveryAddress(registration_id:number){
    this._userInfoService.getUserDetailsById(registration_id).subscribe(res=>{
      this.setrmDeliveryAddress(res);
    })
  }
  ///display user info
  setrmDeliveryAddress(deliveryInfo:UserInfo){
    this.frmDeliveryAddress.patchValue({
      registration_id : deliveryInfo.registration_id,
      building : deliveryInfo.delivery_building,
      state : deliveryInfo.delivery_region,
      pincode : deliveryInfo.delivery_postal_code,
      city : deliveryInfo.delivery_city,
      country : deliveryInfo.delivery_country,
      address1 : deliveryInfo.delivery_address,
    })
  }

  ////reset form
  resetFrom(){
    this.frmDeliveryAddress.reset();
  }

  /////////add update address////
  updateDeliveryAddress(){
    console.log(this.frmDeliveryAddress.value);
    this._userInfoService.updateDeliveryAddress(this.frmDeliveryAddress.value).subscribe(res=>{
      if(res.status==1){
        this._toast.success('Delivery Address Update Successfully.');
        this._router.navigate(['user/user-info']);
      }else{
        this._toast.error(res.message);
      }
    })
  }

}
