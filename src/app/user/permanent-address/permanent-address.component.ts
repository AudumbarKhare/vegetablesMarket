import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInfoService } from 'src/app/service/user-info.service';
import { UserInfo } from '../user';

@Component({
  selector: 'app-permanent-address',
  templateUrl: './permanent-address.component.html',
  styleUrls: ['./permanent-address.component.scss']
})
export class PermanentAddressComponent implements OnInit {
frmPermanentAddress!:FormGroup;
  constructor(
    private _fb:FormBuilder,
    private _userInfoService:UserInfoService,
    private _router:Router,
    private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.validationPermanentAddress();
    let registration_id = +this._userInfoService.userInfo.registration_id;

    this.getPermanentAddress(registration_id);
  }

  ////////////validation Permanent Address form//////////
  validationPermanentAddress(){
    this.frmPermanentAddress = this._fb.group({
      registration_id:['',[Validators.required]],
      building : ['',[Validators.required]],
      state : ['',[Validators.required]],
      pincode : ['',[Validators.required]],
      city : ['',[Validators.required]],
      country : ['',[Validators.required]],
      address1 : ['',[Validators.required]]
    })
  }

  //////////get permanent address details////
  getPermanentAddress(registration_id:number){
    this._userInfoService.getUserDetailsById(registration_id).subscribe(res=>{
      this.setPermanentAddress(res);
    })
  }

  //////////set permanent address details////
  setPermanentAddress(permanentAddress:UserInfo){
    this.frmPermanentAddress.patchValue({
      registration_id:permanentAddress.registration_id,
      building:permanentAddress.building,
      state:permanentAddress.state,
      pincode:permanentAddress.pincode,
      city:permanentAddress.city,
      country:permanentAddress.city,
      address1:permanentAddress.land_mark
    })
  }

  ////reset form
  resetFrom(){
    this.frmPermanentAddress.reset();
  }

  /////////update premant address////
  updatePremanentAddress(){
    this._userInfoService.updatePermanentAddress(this.frmPermanentAddress.value).subscribe(res=>{
      if(res.status==1){
        this._toastr.success('Premanent Address Update Successfully...');
        this._router.navigate(['user/user-info']);
      }else{
        this._toastr.error(res.message);
      }
    })
  }
}
