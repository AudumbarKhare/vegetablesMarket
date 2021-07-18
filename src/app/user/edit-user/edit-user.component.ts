import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInfoService } from 'src/app/service/user-info.service';
import {UserInfo} from '../user';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  frmChangeImage!:FormGroup;
  filePath?: string;

  //edit user info declaration
  frmEditUser!:FormGroup;
  userId!:string;
  userDetails!:any;

  constructor(
    private _fb:FormBuilder,
    private _userInfoService:UserInfoService,
    private _toast: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getFormValidation();
    this.getEditUserForm();
    // 
    
    this.userId =JSON.stringify(+this._userInfoService.userInfo.registration_id);
    this.getUserDetailsById(+this.userId);

  const user = JSON.parse(localStorage.getItem('userInfo') || '');
  
    
  }

///image chanage validation code
  getFormValidation(){
    this.frmChangeImage = this._fb.group({
      imageName:['',[Validators.required]],
      fileName:[''],
      registration_id:['',[Validators.required]]
    })
  }

  //validation for edit user form
  getEditUserForm(){
    this.frmEditUser = this._fb.group({
      registration_id:['',Validators.required],
      username:['',[Validators.required,Validators.minLength(3)]],
      firstname:['',[Validators.required]],
      lastname:['',[Validators.required]],
      phone:['',[Validators.required,Validators.minLength(10),Validators.maxLength(13)]],
      email:['',[Validators.required,Validators.email]]
    })
  }

  //image preview code
  imagePreview(e:any) {
    if (e.target.files.length > 0) {
      var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
     reader.onload=(event:any)=>{
       this.filePath=event.target.result;
      this.frmChangeImage.patchValue({
        imageName:event.target.result
       })  
    }
        const file = e.target.files[0] as File;
        this.frmChangeImage.get('fileName')?.setValue(file);
    }

  }

  getUserDetailsById(userId:number){
    
    this._userInfoService.getUserDetailsById(userId).subscribe((res:UserInfo)=>{
      this.setimageChangeDetails(res);
      this.setfrmEditUser(res);
    })
  }

  //set value to user info details

  setfrmEditUser(user:UserInfo){
    this.frmEditUser.patchValue({
      registration_id : user.registration_id,
      username:user.username,
      firstname:user.firstname,
      lastname:user.lastname,
      phone:user.phone,
      email:user.email
    })
  }

  //set registration id form
  setimageChangeDetails(user:UserInfo){
    this.frmChangeImage.patchValue({
      registration_id : user.registration_id
    })

    if(user.image_url!=''){
      this.filePath = user.image_url;
    }else{
      this.filePath ="../../../assets/images/user1.png";
    }
  }

  //imgage save code (change user image)
  saveImage() {
    const saveImage = new FormData;
    saveImage.append('fileName',this.frmChangeImage.get('fileName')?.value);
    saveImage.append('registration_id',this.frmChangeImage.get('registration_id')?.value);
    saveImage.append('imageName',this.frmChangeImage.get('imageName')?.value);
      //this._userInfoService.changeImage(this.frmChangeImage.value).subscribe((res:any)=>{
    this._userInfoService.changeImage(saveImage).subscribe(res=>{
      if(res.status==1){
        this._toast.success('Change Image Successfully');
        this._router.navigate(['user/user-info']);
      }else{
        this._toast.error(res.message);
      }
    })
    return false;
  }

  //update user info
  editUserInfo(){
    this._userInfoService.updateUserDetails(this.frmEditUser.value).subscribe(res=>{
      if(res.status==1){
        this._toast.success('User Details Updated Successfully..');
        this._router.navigate(['user/user-info']);
      }else{
        this._toast.error(res.message);
      }
    })
  }

  //reset  form value
  resetFrom(){
    this.frmChangeImage.reset();
  }
}


