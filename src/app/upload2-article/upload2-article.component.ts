import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginCheckService} from '../logincheck.service';
import {Router,ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-upload2-article',
  templateUrl: './upload2-article.component.html',
  styleUrls: ['./upload2-article.component.css']
})
export class Upload2ArticleComponent implements OnInit {
  imageUrl: String = '/assets/images/upload.png';
  caption: String = '';
  caption1: String = '';
  title: String = 'title' ;
  title1:String;
  content1: String = 'content';
  fileToUpload : File ;
  id;
  constructor(private userServ: LoginCheckService, private router: Router,private _route: ActivatedRoute) { }

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
  const elem = JSON.parse(this._route.snapshot.paramMap.get('article'));
  console.log('first');
  console.log(elem);
    this.caption1=elem.interest;
    this.title1=elem.title;
    this.imageUrl=elem.path;
    this.content1=elem.content;
    this.id=elem.id;
    console.log( this.caption);
    console.log( this.title);
    console.log( this.imageUrl);
    console.log( this.content1);
    
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
    return this.userServ.upload2({title: this.title, content: this.content1,
        imagePath: this.imageUrl, interest: this.caption1,id:this.id,
        author: JSON.parse(localStorage.getItem('username')).value}).toPromise();
  }

async  OnSubmit(caption, title, content) {
    this.title = title.value.toUpperCase();
    this.content1 = content.value;
    this.caption1 = caption.value ;

    var check = await this.GetCurrentUserInformation();
    console.log(check['done']);
      this.router.navigate(['activity']);
  }

}
