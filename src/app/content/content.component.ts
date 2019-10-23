import { Component, OnInit } from '@angular/core';
import {LoginCheckService} from '../logincheck.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
    temp: string;
  constructor(private userServ: LoginCheckService, private router: Router,private _route: ActivatedRoute) {
    console.log('constructer');
    if(localStorage.getItem('refresh')!=null)
    {
      localStorage.removeItem('refresh');
      window.location.reload();
    }
   }
 ngOnInit() {
   console.log('ngoninit');
  }
}
