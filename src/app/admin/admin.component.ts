import { Component, OnInit } from '@angular/core';
import {LoginCheckService} from '../logincheck.service';
import {Router, ActivatedRoute} from '@angular/router';
import { promise } from 'protractor';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: any;
  cate: any;
  findUsers: any[];
  display:Boolean = false;
  constructor(private userServ: LoginCheckService, private router: Router,private _route: ActivatedRoute) { }

  ngOnInit() { 
    if (localStorage.getItem('username') == null || localStorage.getItem('designetion') != 'admin') {
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
  public GerUser():Promise<any>{
    return this.userServ.adminSearch({username: this.user}).toPromise();
  }
 async findUser(user: any){
    this.user = user;
    console.log(user);
    const check = await this.GerUser();
    if (check['status'] == 1)
    {
      this.findUsers = check['user'];
      if(this.findUsers.length != 0)
      {
        this.display = true ;
      }
      else{
        this.display = false ;
      }
      console.log(this.findUsers);
    }
    else{
      alert('Currently Server is not responding');
    }

  }
  
  async sendMessage(caption: any, content: any) {
    console.log({title: caption.value, des: content.value, user: JSON.parse(localStorage.getItem('username')).value});
    var obj = {title: caption.value, des: content.value, user: JSON.parse(localStorage.getItem('username')).value};
    const check = await this.sendMess(obj);
    if (check['status'] == 1){
      alert(check['mess'])
          this.router.navigate(['admin']);
    }
    else{
      alert(check['mess'])
    }

  }

  
  public sendMess(obj): Promise<any> {
    console.log(obj ,'sendmess');
    return this.userServ.sendMessage(obj).toPromise();
  }
  async addCategory(cate: any)
  {

    this.cate = cate;
    var obj = {Category:cate.value.toUpperCase(),user:JSON.parse(localStorage.getItem('username')).value}
    const check = await this.addNewCategory(obj);
    if (check['status'] == 1){
      alert(check['mess'])
    this.router.navigate(['admin']);
    }
    else{
      alert(check['mess'])
    }

  } 
  public addNewCategory(obj: any): Promise<any>{
    console.log(obj ,'newcategory');
    return this.userServ.addNewCate(obj).toPromise();
  }
  async deleteCategory(cate: any)
  {

    this.cate = cate;
    var obj = {Category:cate.value.toUpperCase(),user:JSON.parse(localStorage.getItem('username')).value}
    const check = await this.delCategory(obj);
    if (check['status'] == 1){
      alert(check['mess'])
    this.router.navigate(['admin']);
    }
    else{
      alert('Deleting Category Fail')
    }

  } 
  public delCategory(obj: any): Promise<any>{
    console.log(obj ,'Deletecategory');
    return this.userServ.deleteCate(obj).toPromise();
  }
}
