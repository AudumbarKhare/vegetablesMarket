import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/custom_validation/match_password';
import { UserInfoService } from 'src/app/service/user-info.service';
import { UserInfo } from '../user';
import { checkOldPassword } from '../validator/check_old_passord';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  frmChangePassword!:FormGroup;
  constructor(
    private _fb:FormBuilder, 
    private _checkOldPassword:checkOldPassword,
    private _router:Router,
    private _toastr:ToastrService,
    private _userInfoService:UserInfoService
    ) { }

  ngOnInit(): void {
    this.validationChangePassword();

    const userId =JSON.stringify(+this._userInfoService.userInfo.registration_id);
    this.getUserDetailsById(+userId);
  }

  //form change password validation
  validationChangePassword(){
    this.frmChangePassword = this._fb.group({
      oldPassword:['',Validators.compose([Validators.required]), this._checkOldPassword.sendOldPassword()],
      newPassword:['',[Validators.required]],
      conformPassword:['',Validators.required],
      registration_id:['',Validators.required]
    },{
      validator: MustMatch('newPassword', 'conformPassword')
    });
  }

  ////////////get user details////////////
  getUserDetailsById(userId:number){
    this._userInfoService.getUserDetailsById(userId).subscribe((res:UserInfo)=>{
      this.frmChangePassword.patchValue({
        registration_id:res.registration_id
      })
    })
  }

  get f() { return this.frmChangePassword.controls; }
  //changePassword
  changePassword(){
    
   this._userInfoService.changeUserPassword(this.frmChangePassword.value).subscribe(res=>{
        if(res.status==1){
         this._toastr.success('Change Password Successfully.');
          this._router.navigate(['user/user-info']);
        }else{
          this._toastr.error(res.message);
        }
     })
  }

}
