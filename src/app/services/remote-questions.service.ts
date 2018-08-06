import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {QuestionGroup} from '../dynamic-apply-now/question-group';
import {environment} from '../../environments/environment';

@Injectable()
export class RemoteQuestionsService{

    constructor(private httpClient:HttpClient){}

    questionsUrl = environment.staticJsonPath;

    getRemoteQuestions():Observable<QuestionGroup>{
        return this.httpClient.get<QuestionGroup>(this.questionsUrl);
    }
    
}