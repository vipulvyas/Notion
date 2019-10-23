import { Component, OnInit } from '@angular/core';
import {LoginCheckService} from '../logincheck.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  elem ;
  Comments: any[];
  commentsAvailable: Boolean = false ;
  Comment: String ;
  commentAdd: String;
  constructor(private userServ: LoginCheckService, private router: Router,private _route: ActivatedRoute) { }

 async ngOnInit() {
  /* Session checking */
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


/* END OF SESSION CHECKING */
    const elem = JSON.parse(this._route.snapshot.paramMap.get('article'));
    console.log('first');
    console.log(elem);
        this.elem = elem;
    console.log('from comment nginit()');
    console.log(this.elem);
           const check = await this.GetCurrentUserInformation();
           if(check['status']==1){
            
             this.Comments = check['article'];
             console.log(this.Comments);
             
             if ( this.Comments.length != 0 )
            {
              this.commentsAvailable = false;
            }
            else{
              this.commentsAvailable = true ;
            }
           } 
           else{
             alert("Server not responding");
             this.router.navigate(['content']);
           }
       }
       public GetCurrentUserInformation(): Promise<any> {
        return this.userServ.loadComment({id:this.elem.id}).toPromise();
      }

     async AddComment(comment: any){
       console.log(comment);
        this.Comment = comment.value;
        console.log(this.Comment);
        const check = await this.AddCommentTodb();
        if(check['status'] == 1)
        {
          console.log('Comment added successfully');
          alert('Comment added successfully');
          this.router.navigate(['activity']);
        }
        else{
          alert('Problem with server Try after sometime, sorry for Disconvenience');
        }
      }
      public AddCommentTodb(): Promise<any> {
        console.log('Add comment to db');
        console.log('Author in componetnt is '+ this.elem.author);
        console.log(this.Comment);
        console.log(this.elem.id);
        return this.userServ.AddComment({author: this.elem.author, comment: this.Comment, id: this.elem.id}).toPromise();
      }

}
