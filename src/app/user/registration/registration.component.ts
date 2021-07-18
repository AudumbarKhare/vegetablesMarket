import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { uniqueEmail } from 'src/app/custom_validation/unique _email';
import { RegistrationService } from 'src/app/service/registration.service';
import { MustMatch } from '../../custom_validation/match_password';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  
  frm_registration!: FormGroup;
  submitted:boolean=false;
 
  constructor(private fb:FormBuilder,
              private _registration:RegistrationService,
              private _toast:ToastrService,
              private _uniqueEmail:uniqueEmail
              ) { }

  ngOnInit(): void {
    this.registrationValidation();
  }
  registrationValidation(){
    this.frm_registration = this.fb.group({
      username:["",[Validators.required]],
      email:["",Validators.compose([Validators.required,Validators.email]), this._uniqueEmail.uniqueEmail()],
      password:["",[Validators.required,Validators.minLength(6)]],
      repassword:["",[Validators.required]],
      acceptterm:[false,[Validators.requiredTrue]]
    },{ Validators: MustMatch('password','repassword') });
  }

  get f() { return this.frm_registration.controls; }

////add user registration///////////////
  userRegistration(){
    this.submitted=true;
    if(this.frm_registration.invalid || this.frm_registration.errors){
      return;
    }
    
    this._registration.customer_registration(this.frm_registration.value).subscribe(res=>{
      if(res.status==1){
        this._toast.success('Registration Successfully!!!');
        this.frm_registration.reset();
      }else{
        this._toast.error(res.message);
      }
    })
  }

  //////////canDeative Guard///////
  canLeave():Observable<boolean>|boolean{
    return window.confirm('Are you Sure want to navigate from this page.');
  }

  ///////reset all form field////////////
  reset(){
    this.frm_registration.reset();
  }
}
