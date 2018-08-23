import { Component, OnInit } from '@angular/core';
import { RemoteDataService } from '../services/remote-data.service';
import {Property} from '../models/JsonModel';
import {Router} from '@angular/router'
import {DomSanitizer} from '@angular/platform-browser';
import {environment} from '../../environments/environment';



@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  constructor(private remoteDataService:RemoteDataService,
              private router:Router,private domSanitizationService: DomSanitizer) { }

   currentProperties : Property[]  = null;

  ngOnInit() {
    this.remoteDataService.getAllProperties().subscribe(x=>{
      this.currentProperties = x;

    },
    error=>{console.log(error);this.router.navigate(['/oops']);});
  }

  getIframeUrl(property:Property){
    return this.domSanitizationService.bypassSecurityTrustResourceUrl(property.googleMapsLocation);
  }

  getImageUrl(property:Property){
    return this.domSanitizationService.bypassSecurityTrustResourceUrl(
      environment.host+environment.propertiesImagesPath+property.mainImagePath);
  }

}
