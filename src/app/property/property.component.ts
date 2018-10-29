import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {RemoteDataService} from '../services/remote-data.service';
import {Property} from '../models/JsonModel';
import {DomSanitizer} from '@angular/platform-browser';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  prop:Property;
  currentId:number;
  slideIndex = 0;
  
  //if likely to change then usie gitHub friendly syntax params.
  constructor(private activatedRoute: ActivatedRoute,
     private router:Router,
      private remoteDataService:RemoteDataService,
    private domSanitizationService: DomSanitizer) { }

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
          return Observable.of(new Property());
        }
      })
    ).subscribe(u =>{
      this.prop = u;
      this.currentId = u.idProperty;
      this.showSlides(this.slideIndex);
    });
  }

  showSlides(n:number) {
    if (n >= this.prop.images.length)
      this.slideIndex = 0
    else
    if (n < 0)
      this.slideIndex = this.prop.images.length-1
    else
      this.slideIndex=n;
  }

  getImageUrl(urlSuffix:string){
    return this.domSanitizationService.bypassSecurityTrustResourceUrl(
      environment.host+environment.propertiesImagesPath+urlSuffix);
  }

}
