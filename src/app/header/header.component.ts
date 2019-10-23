import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() { }
  loginp:Boolean = true;
  registerp:Boolean = true;
  logoutp:Boolean = false;
  ngOnInit() {
    let lastScroll;
    lastScroll = 0;
  window.onscroll = function() {
      let currentScroll ;
      currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0 && lastScroll <= currentScroll) {
        lastScroll = currentScroll;
      $('.topnav').get(0).style.display = 'none';
         } else {
        lastScroll = currentScroll;
        $('.topnav').get(0).style.display = 'block';
      }
  };
    if(localStorage.getItem('username')!=null){
      this.loginp = false;
      this.registerp = false;
      this.logoutp = true ;
    }
    else{
      this.loginp = true;
      this.registerp = true;
      this.logoutp = false ;
    }

  }

}
