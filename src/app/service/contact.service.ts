import { Injectable } from "@angular/core";
import {Contact} from '../home/class/contact';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
@Injectable({
    providedIn:'root'
})

export class ContactService{
    errorData!: { errorTitle: string; errorDesc: string; };
    constructor(private _http:HttpClient){}

addContact(contact_deails:any){
    return this._http.post<any>(environment.api_url+'contact/addContact.php',contact_deails);
}

/////////////error handle/////////////
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

function throwError(errorData: { errorTitle: string; errorDesc: string; }) {
    throw new Error("Function not implemented.");
}
