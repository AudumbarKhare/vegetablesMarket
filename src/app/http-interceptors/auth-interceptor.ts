import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _loginService:LoginService){}
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        if(this._loginService.isLoggedIn()){
            const authToken = this._loginService.getAuthorizationToken();
            req = req.clone({
                setHeaders:{Authorization:authToken}
            });
        }
        return next.handle(req);
    }
}
