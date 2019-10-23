import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {LoginCheckService} from '../logincheck.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private userServ: LoginCheckService, private router: Router) { }
   Available_interest:any[];
   check:Boolean[] = [false];
   saveUsername:Boolean=false;
   check_data:Boolean[];
  visible:Boolean=false;
async   ngOnInit() {
    $('.image-checkbox').each(function () {
      if ($(this).find('input[type="checkbox"]').first().attr('checked')) {
        $(this).addClass('image-checkbox-checked');
      } else {
        $(this).removeClass('image-checkbox-checked');
      }
    });
    $('.image-checkbox').on('click', function (e) {
      $(this).toggleClass('image-checkbox-checked');
      let checkbox;
      checkbox = $(this).find('input[type="checkbox"]');
      checkbox.prop('checked', !checkbox.prop('checked'));
      e.preventDefault();
    });
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
        
        const check = await this.fetchInt({user:'admin'});
        console.log(check['mess']);
       this.Available_interest=check['mess'];
       
       if(this.Available_interest.length >0)
       {
         this.visible=true;
         for(var i=0;i<this.Available_interest.length;i++)
         {
          
         }
       }
       else{
         this.visible=false;
       }
    }
  
    insertinvited(interest,status){
      console.log(interest);
      console.log(status);
      this.check[status]=!this.check[status];
      console.log(this.Available_interest)
      console.log(this.check)

    }
    async editInterest(){
     var re=await this.delete({user:JSON.parse(localStorage.getItem('username')).value});
      for(var i=0;i<this.Available_interest.length;i++)
      {
        if(this.check[i] == true)
        {
          console.log(this.Available_interest[i]);
          var inter = this.Available_interest[i];
          var obj = {user:JSON.parse(localStorage.getItem('username')).value,interest:inter};

          const check = await this.editInt(obj);
           if (check['status'] == 1){
          localStorage.setItem('interest', check['mess']);
          this.router.navigate(['category']);
          }
          else{
            alert(check['mess'])
          }
        }
      }

    }
    public delete(obj): Promise<any>{
      return this.userServ.deleteAl(obj).toPromise();
    }
  
      public editInt(obj: any): Promise<any>{
        console.log(obj ,'newcategory');
        return this.userServ.editInterest(obj).toPromise();
      }
    
  
  public  fetchInt(obj: any): Promise<any>{
    console.log(obj ,'fetchInterest');
     return this.userServ.fetchInt(obj).toPromise();
  }

}
