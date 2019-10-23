import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginCheckService} from '../logincheck.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-upload-article',
  templateUrl: './upload-article.component.html',
  styleUrls: ['./upload-article.component.css']
})
export class UploadArticleComponent implements OnInit {
  imageUrl: String = '/assets/images/upload.png';
  caption: String = '';
  title: String = 'title' ;
  content: String = 'content';
  fileToUpload : File ;
  constructor(private userServ: LoginCheckService, private router: Router) { }

  ngOnInit() {
        if (localStorage.getItem('username') == null) {
          this.router.navigate(['login']);
      }
      else{ 
        console.log(localStorage.getItem('username'));
        const object = JSON.parse(localStorage.getItem('username'));
        const dateString = object.timestamp;
        const now = new Date().getTime().toString();
        console.log( parseInt (now)- parseInt ( dateString ));
        if ( ( parseInt ( now )-parseInt ( dateString ) ) > 900000 ){
          localStorage.removeItem('username');
          this.router.navigate(['login']);
        }
      }
  }
  
  handleFile(file: FileList){
    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.fileToUpload);
  }
  public GetCurrentUserInformation(): Promise<any> {
    console.log('username is '+ localStorage.getItem('username'));
    return this.userServ.upload({title: this.title, content: this.content,
        imagePath: this.imageUrl, interest: this.caption,
        author: JSON.parse(localStorage.getItem('username')).value}).toPromise();
  }

async  OnSubmit(caption, title, content) {
    this.title = title.value.toUpperCase();
    this.content = content.value;
    this.caption = caption.value ;
    console.log(this.caption);
    console.log(this.imageUrl);
    console.log(this.title) ;
    console.log(this.content);

    var check = await this.GetCurrentUserInformation();
    console.log(check);
    if(check['status']==1)
    {
      this.router.navigate(['activity']);
    }
    else{
      alert('something went wrong try after Some time ....');
    }
  }
}
