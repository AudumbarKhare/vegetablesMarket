import { FormGroup } from '@angular/forms';

export function MustMatch(password:string, confirm_password:string){
   
    return (fromGroup:FormGroup)=>{
        const pass = fromGroup.controls[password];
        const con_pass = fromGroup.controls[confirm_password];

        if(con_pass.errors && !con_pass.errors.mustMatch){
            return;
        }
        if(pass.value != con_pass.value){
            con_pass.setErrors({mustMatch:true});
        }else{
            con_pass.setErrors(null);
        }
    }
}