import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient,HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  errorData!: {  };

  /////////new logic/////////

  loginUser = new BehaviorSubject<Login | null>(null);

  /////////////////////////////////
private http!:HttpClient;
  constructor(private handler:HttpBackend, private _router:Router) { 
    this.http = new HttpClient(handler);
   }
//////////////user login request////////////////
  user_login(userLoginInfo:any){
    return this.http.post(environment.api_url+'login/processed.php',userLoginInfo).pipe(
      catchError(this.handleError),
      tap((res:any)=>{
        if (res && res.token) {
          this.authenticateUser(res.registration_id,res.username,res.firstname,res.lastname,res.image_url,res.email,res.token,res.status);
        }
      })
    );
  }
////////////////check user login status////////////////////////
  isLoggedIn() {
    if (localStorage.getItem('userInfo')) {
      return true;
    }
    return false;
  }
////////////////////////access token here/////////////////
  getAuthorizationToken() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    return userInfo._token;
  }
  //////////////////set subjet values for show customer info////////////////
  private authenticateUser(registration_id:number,
    username:string,
    firstname:string,
    lastname:string,
    image_url:string,
    email:string,
    _token:string,
    status:number){
    const expirationDate = new Date(new Date().getTime()+144000000);
    const login = new Login(registration_id,username,firstname,lastname,image_url,email,_token,status,expirationDate);
    this.loginUser.next(login);
    localStorage.setItem('userInfo',JSON.stringify(login));
  }

  //////////////////////////////////////////
  autoSignIn(){
    const userData = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if(!userData){
      return;
    }
    const login = new Login(userData.registration_id,userData.username,userData.firstname,userData.lastname,userData.image_url,userData.email,userData._token,userData.status,new Date(userData.expirationDate));
    this.loginUser.next(login);
  }

  /////////////////////////////user logout//////////////////
  userLogOut(){
     localStorage.removeItem('userInfo');
     localStorage.removeItem('products');
     localStorage.removeItem('favoriteProduct');
     this._router.navigate(['/home']);

  }

  //////////////error handle/////////////
  private handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error Occurred:', error.error.message);
    }else{
      // The backend returned an unsuccessful response code.
      //The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status},`+`body was: ${error.error}`);
    }
    this.errorData = {
      errorTitle:'Opps! Request for document failed',
      errorDesc: 'Something bad happenes. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
