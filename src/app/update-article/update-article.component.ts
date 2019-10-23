import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginCheckService} from '../logincheck.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {
  articles: any[];
  visi:Boolean=false;
  title:any;
  message:any;
  size:any;
  constructor(private userServ: LoginCheckService, private router: Router) { }

 async ngOnInit() {
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
         var obj ={user:JSON.parse(localStorage.getItem('username')).value}
          const check =await this.fetchArticle(obj);
          if(check['status']==1)
    {
        console.log('this is the data')
        console.log(check['mess']);
        this.articles = check['mess'];
        if(this.articles.length==0){
          this.visi=true;
        }
    }
    else{
        alert('something went wrong try after some time ...');
        this.router.navigate(['content']);
    }
      }    

    }
    public fetchArticle(obj): Promise<any> {
      console.log(obj,'from fetch aticle')
      return this.userServ.fetchArt(obj).toPromise();
    }
  
    public GetCurrentUserInformation(): Promise<any> {
      return this.userServ.loadArticles().toPromise();
    }
  
    commentEvaluate(data: any, authorFrom: any){
      console.log('from Button press');
        console.log(data);
        console.log("Pass id is ");
        console.log(data._id);
        const objectData = {id: data._id, author: authorFrom,content:data.content,title:data.title,path:data.imagePath,interest:data.interest};
        console.log('from objectData');
        console.log(objectData);
        this.router.navigate(['upload2', { article: JSON.stringify(objectData)}]);
    }
  
  
  

}
