import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../user/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

   userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  

  constructor(private _http:HttpClient) { }

  //get user details form user id / registration id

  getUserDetailsById(user_id:number){
    return this._http.get<UserInfo>(environment.api_url+'userInfo/getUserInfoById.php?user_id='+user_id);
  }

  //change Image code

  changeImage(imageInfo:any){
    return this._http.post<any>(environment.api_url+'userInfo/changeImage.php', imageInfo);
  }

  //edit user details

  updateUserDetails(userData:any){
    return this._http.post<any>(environment.api_url+'userInfo/updateUserDetails.php',userData);
  }

  //update delivery address
  updateDeliveryAddress(addressData:any){
    return this._http.post<any>(environment.api_url+'userInfo/updateDeliveryAddress.php', addressData);
  }

  //update permanent address
  updatePermanentAddress(addressData:any){
    return this._http.post<any>(environment.api_url+'userInfo/updatePermanentAddress.php',addressData);
  }

  //change user password
  changeUserPassword(passwordDetails:any){
    console.log(passwordDetails);
    return this._http.post<any>(environment.api_url+'userInfo/change_password.php',passwordDetails);
  }
}
