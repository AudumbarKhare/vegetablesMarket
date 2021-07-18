import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    frmContact!:FormGroup;

  constructor(private _fb:FormBuilder, private _contactservice:ContactService, private _toast:ToastrService) { }

  ngOnInit(): void {
    this.contactFormValidation();
  }


  /////////////form validation//////////////
  contactFormValidation(){
    this.frmContact = this._fb.group({
      name:['',Validators.compose([Validators.required])],
      email:['',Validators.compose([Validators.required,Validators.email])],
      message:['',[Validators.compose([Validators.required])]]
    })
  }

  ////////////add contact details///////////
  addContact(){
    this._contactservice.addContact(this.frmContact.value).subscribe(res=>{
      console.log(res);
       if(res.status==1){
        this._toast.success(res.message);
        this.frmContact.reset();
       }else{
        this._toast.warning(res.message);
       }
    })
  }

}
