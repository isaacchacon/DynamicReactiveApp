import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent  {

  constructor() { 
    this.time = new Observable(observer =>{
      let id = setInterval(() => observer.next(new Date().toString()), 1000);
      return (()=> clearTimeout(id));
    });
  }

 

  time:Observable<string>;

}
