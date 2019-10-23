import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {
  constructor(private http: HttpClient) {  }
    userlogin(data) {
      console.log('logging in');
      return this.http.post('http://localhost:3000' + '/users/login', data);
    }

    userRegister(data) {
      console.log('registering');
      return this.http.post('http://localhost:3000' + '/users/create', data);
    }
    upload(data){
      console.log('uploading articles');
      return this.http.post('http://localhost:3000' + '/upload', data);
    }
    upload2(data){
      console.log('uploading articles');
      return this.http.post('http://localhost:3000' + '/upload2', data);
    }
    loadArticles(){
      console.log('Loading articles');
      return this.http.post( 'http://localhost:3000/loadArticle', { } );

    }
    loadComment(data)
    {
      console.log('Loading Comments');
      return this.http.post( 'http://localhost:3000/loadComments', data);
    }

    AddComment(data){
      return this.http.post('http://localhost:3000/addComment', data);
    }

    adminSearch(data){
      return this.http.post('http://localhost:3000/adminSearch', data);
    }
    sendMessage(data){
      return this.http.post('http://localhost:3000/doMess', data);
    }
    addNewCate(data){
      return this.http.post('http://localhost:3000/addCategory',data);
    }
    deleteCate(data){
      return this.http.post('http://localhost:3000/deleteCategory',data);
    }
    deleteInt(data){
      return this.http.post('http://localhost:3000/deleteInterest',data);
    }
    fetchInt(data){
      return this.http.post('http://localhost:3000/fetchInterest',data);
    }
    editInterest(data){
      return this.http.post('http://localhost:3000/editInterest',data);
    }
    deleteAl(data){
      return this.http.post('http://localhost:3000/deleteAl',data);

    }
    fetchUInt(data){
      return this.http.post('http://localhost:3000/fatchUserInt',data);
    }
    fetchUserData(data){
      return this.http.post('http://localhost:3000/fatchUser',data);
    }
    fetchMessage()
    {
      console.log('in service')
      return this.http.post('http://localhost:3000/messDo',{});
    }
    fetchArt(data){
      return this.http.post('http://localhost:3000/fetchArt',data);
    }
  }

