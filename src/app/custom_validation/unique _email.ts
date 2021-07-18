import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Observable, timer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})

export class uniqueEmail{
    constructor(private _httpClient:HttpClient){}

    private sendEmail(email:string){
        return timer(1000)
        .pipe(
            switchMap( () => {
                return this._httpClient.get<any>(environment.api_url+'userInfo/unique_email.php?email='+email);
            })
        )
    }

    uniqueEmail():AsyncValidatorFn{
        return (newEmail:AbstractControl):Observable<{ [key:string]:any } | null> => {
            return this.sendEmail(newEmail.value).pipe(
                map((res:any)=>{
                    return res.email==newEmail.value ? {uniqueEmail:true} : null;
                })
            )
        }
    }
}