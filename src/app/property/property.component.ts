import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {RemoteDataService} from '../services/remote-data.service';
import {Property} from '../models/JsonModel';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  prop:Property;
  currentId:number;
  
  constructor(private activatedRoute: ActivatedRoute, private router:Router, private remoteDataService:RemoteDataService) { }

  ngOnInit() {
     this.activatedRoute.paramMap.pipe(
      switchMap((params:ParamMap)=>{
        let paramId: number;
        try{
          paramId = parseInt(params.get('id'));
        } catch(rr){}// do nothing.
        if(paramId){
           return this.remoteDataService.getProperty(paramId)
        }else{
          this.router.navigate(['props']);
          return Observable.of([new Property()]);
        }
      }),
      map(x=>{
        if(x&&x.length)
        return x[0];
        return null;
     })
    ).subscribe(u =>{
      this.prop = u;
      this.currentId = u.idProperty;
    });
  }

}
