import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {QuestionGroup} from '../dynamic-apply-now/question-group';

@Injectable()
export class RemoteQuestionsService{

    constructor(private httpClient:HttpClient){}

    questionsUrl = "http://localhost:3000/rootQuestion";

    getRemoteQuestions():Observable<QuestionGroup>{
        return this.httpClient.get<QuestionGroup>(this.questionsUrl);
    }
    
}