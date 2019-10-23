import { Component, OnInit } from '@angular/core';
import {LoginCheckService} from '../logincheck.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = JSON.parse(localStorage.getItem('username')).value;
  interest:any[];
  following:any;
  followers:any;
  artsize:any;

  constructor(private userServ: LoginCheckService, private router: Router) {
    console.log(localStorage.getItem('username'));

    if (localStorage.getItem('username') == null) {
      this.router.navigate(['login']);
    }
    else{ 
      console.log(localStorage.getItem('username'));
      
      const object = JSON.parse(localStorage.getItem('username'));
      const dateString = object.timestamp;
      const now = new Date().getTime().toString();
      console.log(parseInt ( now )-parseInt ( dateString ));
        if ( ( parseInt ( now )-parseInt ( dateString ) ) > 900000 ){
          localStorage.removeItem('username');
          this.router.navigate(['login']);
        }
    }

   }
  
   
  async ngOnInit() {

         $('#click1').click(function(){
        document.querySelector('#demo1').classList.remove('my-hide');
          document.querySelector('#demo1').classList.add('my-show');
      });

      $('#click2').click(function(){
        document.querySelector('#demo2').classList.remove('my-hide');
          document.querySelector('#demo2').classList.add('my-show');
        });

      $('#click3').click(function(){
        document.querySelector('#demo3').classList.remove('my-hide');
          document.querySelector('#demo3').classList.add('my-show');
        });
       
        const object = {user:JSON.parse(localStorage.getItem('username')).value};

        const check = await this.fetchUserInt(object);
        console.log(check['mess']);
        this.interest=check['mess'].interest;
        this.following=check['mess'].following;
        this.followers=check['mess'].follower;

        const userdata = await this.fetchUserdata(object);
        console.log(userdata['mess']);
        this.artsize=userdata['mess'];
       

      }
      public  fetchUserInt(obj: any): Promise<any>{
        console.log(obj ,'fetchInterest');
         return this.userServ.fetchUInt(obj).toPromise();
      }
     public  fetchUserdata(obj: any): Promise<any>{
        console.log(obj ,'fetchInterest');
         return this.userServ.fetchUserData(obj).toPromise();
      }
    

    }
