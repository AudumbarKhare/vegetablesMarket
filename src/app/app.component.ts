import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vegetablesMarket';
  constructor(private _loadingBarService:LoadingBarService,private _loginService:LoginService){
    this._loginService.autoSignIn();
  }

}
