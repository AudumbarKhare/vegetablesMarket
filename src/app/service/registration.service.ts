import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }
///////sent request to add customer registration//////////////////
  customer_registration(frm_registration:any):Observable<any>{
    return this.http.post<any>(environment.api_url+'registration/customer_registration.php',frm_registration);
  }
}
