import { Component, OnInit } from '@angular/core';
import {LoginCheckService} from '../logincheck.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  articles: any[];
  title:any[];
  message:any;
  size_mess: any;
  size:any[];
  array :any[];
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
            }
          var check = await this.GetCurrentUserInformation();
          if(check['status']==1)
          {
              console.log(check['article']);
              this.articles = check['article'];
              console.log('author form componrent is ');
              console.log(this.articles);
          }
          else{
              alert('something went wrong try after some time ...');
              this.router.navigate(['content']);
          }
          
         const checkMess = await this.fetchMess();

           
           console.log('loginin')
            console.log(checkMess['mess']);
            
            this.size = checkMess['mess'];
            
  }
  public fetchMess(): Promise<any> {
    return this.userServ.fetchMessage().toPromise();
  }

  public GetCurrentUserInformation(): Promise<any> {
    return this.userServ.loadArticles().toPromise();
  }

  commentEvaluate(data: any, authorFrom: any){
    console.log('from Button press');
      console.log(data);
      console.log("Pass id is ");
      console.log(data._id);
      const objectData = {id: data._id, author: authorFrom};
      console.log('from objectData');
      console.log(objectData);
      this.router.navigate(['comment', { article: JSON.stringify(objectData)}]);
  }


}
