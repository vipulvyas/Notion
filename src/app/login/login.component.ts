import { Component, OnInit } from '@angular/core';
import {LoginCheckService} from '../logincheck.service';
import {Router} from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username;
  public password;
  public status1 = 0;
  object = { selected : false};
  constructor(private userServ: LoginCheckService, private router: Router) { }

  ngOnInit() {
    document.querySelector('#pass').addEventListener('input', function() {
      $('#icon').css('display' , 'block');
    });
    $(document).ready(function() {
      $('#icon').click(function() {
        if ($('#pass').get(0).type === 'password') {
          $('#pass').get(0).type = 'text';
          document.querySelector('#icon').classList.remove('fa-eye');
          document.querySelector('#icon').classList.add('fa-eye-slash');
        } else {
          $('#pass').get(0).setAttribute('type', 'password');
          document.querySelector('#icon').classList.add('fa-eye');
          document.querySelector('#icon').classList.remove('fa-eye-slash');
        }
      });
    });
  }
  onChange(check:any){
    this.object.selected=check;
    console.log(check);
    console.log(this.object.selected);

  }
  public GetCurrentUserInformation(): Promise<any> {
    return this.userServ.userlogin({username: this.username, password: this.password,admin:this.object.selected}).toPromise();
  }

 async onSubmit(data) {
      console.log(this.username);
      console.log(this.password); 
      const check = await this.GetCurrentUserInformation();
      if ( check['status'] == 1) {
        this.status1 = 1;
      }
      console.log(check);
      if (this.status1 == 1) {
        const object = {value: this.username, timestamp: new Date().getTime()}
        localStorage.clear();
        localStorage.setItem('username', JSON.stringify(object));
        localStorage.setItem('designetion',check['des']);
        localStorage.setItem('refresh', '1');
        console.log(localStorage.getItem('username'));
        if(check['des']=='admin'){
          this.router.navigate(['admin']);
        }
        else{
          this.router.navigate(['content']);
        }
      }
      else{
        alert('invalide credential');
      }
    }

}
