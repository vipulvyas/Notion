import { Component, OnInit } from '@angular/core';
import {LoginCheckService} from '../logincheck.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  fname; lname; username; password;cpassword;adpassword;
  object = { selected : false};
  obj;
  constructor(private registerServ: LoginCheckService, private router: Router) { }

  ngOnInit() {
    console.log("signup Called" );
  }
  onChange(check:any){
    this.object.selected=check;
    console.log(check);
    console.log(this.object.selected);

  }
  
 async onSubmit(data) {
      let obj;
      if(  this.password != this.cpassword || this.fname == null || this.lname == null || this.username == null)
      {
        alert('Enter Values Currectly');
        this.router.navigate(['signup']);
      }
      else{
     

        if(this.object.selected == true)
        {
          obj = {fname: this.fname, lname: this.lname, username: this.username, password: this.password,admin:this.adpassword};
          console.log(obj);
          this.obj=obj;
          const check = await this.GetCurrentUserInformation();
            if (check['status'] == 1){
              alert(check['mess'])
            this.router.navigate(['login']);
            }
            else{
              alert(check['mess'])
            }
        }
        else {
          obj = {fname: this.fname, lname: this.lname, username: this.username, password: this.password};
          console.log(obj);
          this.obj=obj;
            const check = await this.GetCurrentUserInformation();
            if (check['status'] == 1){
              alert('successfull registration')
            this.router.navigate(['login']);
            }
            else{
              alert('registration fails try : different username')
            }
          }
        }
  }
  public GetCurrentUserInformation(): Promise<any> {
    console.log(this.obj,'obj from submit')
    return this.registerServ.userRegister(this.obj).toPromise();
  }
}
