import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  frm_login!:FormGroup;
  sumbmited:boolean=false;


  constructor(private fb:FormBuilder,
              private _loginService:LoginService,
              private _toast:ToastrService,
              private route : ActivatedRoute,
              private router : Router
              ) { }

  ngOnInit(): void {
    this.form_validation();
  }
///////////form validation/////////////
  form_validation(){
    this.frm_login = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

///////////form submit/////////////
user_login(){
  this.sumbmited = true;
  if(this.frm_login.invalid){
    return;
  }
  this._loginService.user_login(this.frm_login.value).subscribe(res=>{
    if(res.status==1){
     if(this._loginService.isLoggedIn()){
        this.router.navigate(['/home']);
     }
    }else{
      this._toast.error(res.message,'')
    }
  })
}

/////////canDeactivate Gurad////////////

canLeave():Observable<boolean>|boolean{
  return window.confirm("Are you Sure want to navigate without login.");
}

}
