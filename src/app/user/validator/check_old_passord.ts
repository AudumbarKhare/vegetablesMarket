import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Observable, timer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn:'root'
})

export class checkOldPassword{
    constructor(private _httpClient:HttpClient){}

    private userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    private reg_id = +this.userInfo.registration_id;
    
    private checkOldPassword(oldPassword:string,registration_id:number){
        return timer(1000).pipe(
            switchMap(()=> {
                return this._httpClient.get(environment.api_url+'userInfo/toCheckOldPassword.php?registration_id='+registration_id+'&oldPassword='+oldPassword)
            })
        );
    }

    sendOldPassword():AsyncValidatorFn{
        return (oldPassword:AbstractControl): Observable< {[key:string]:any} | null> => {
            return this.checkOldPassword(oldPassword.value,this.reg_id).pipe(
                map((res:any)=>{
                    return res.password == oldPassword.value ? null : { OldPasswordMatch: true };
                })
            )
        }
    }
}