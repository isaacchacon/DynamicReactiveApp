import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Property} from '../models/JsonModel';
import {environment} from '../../environments/environment';

@Injectable()
export class RemoteDataService{

    constructor(private httpClient:HttpClient){}

    getAllProperties():Observable<Property[]>{
        return this.httpClient.get<Property[]>(environment.host+environment.apiPathProperties);
    }

    /**
     * if there is a result it must be in [0] position.
     * @param id 
     */
    getProperty(id:number):Observable<Property>{
        return this.httpClient.get<Property>(environment.host+environment.apiPathProperties+'/'+id);

    }
    
}