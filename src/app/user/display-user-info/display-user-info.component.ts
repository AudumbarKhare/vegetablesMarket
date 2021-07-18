import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/service/user-info.service';
import { UserInfo } from '../user';

@Component({
  selector: 'app-display-user-info',
  templateUrl: './display-user-info.component.html',
  styleUrls: ['./display-user-info.component.scss']
})
export class DisplayUserInfoComponent implements OnInit {

  userInfos!:UserInfo;

  constructor(private _userInfoService:UserInfoService) { }

  ngOnInit(): void {
   let user_id = JSON.stringify(+this._userInfoService.userInfo.registration_id);
    this.getUserInfo(+user_id);
  }
  getUserInfo(user_id:number){
    this._userInfoService.getUserDetailsById(user_id).subscribe((res:UserInfo)=>{
      this.userInfos=res;
    })
  }


}
