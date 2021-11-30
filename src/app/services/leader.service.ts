import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import {Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
    private processHTTPMessageService:ProcessHTTPMsgService) { }

  getLeaders():Observable<Leader[]>{
   //return of(LEADERS).pipe(delay(2000));
   return this.http.get<Leader[]>(baseURL+'leadership')
   .pipe(catchError(this.processHTTPMessageService.handleError));


}
  getLeader(id:String):Observable<Leader>{
    //return of(LEADERS.filter((leader) => leader.id===id)[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL+'leadership/'+id)
    .pipe(catchError(this.processHTTPMessageService.handleError));

  }

  getFeaturedLeader():Observable<Leader>{
   // return of(LEADERS.filter((leader)=>leader.featured)[0]).pipe(delay(2000));
   return this.http.get<Leader>(baseURL+'leadership?featured=true').pipe(map(leader=>leader[0]))
   .pipe(catchError(this.processHTTPMessageService.handleError));
  }

  /*getLeaders():Promise<Leader[]>{
    return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS),2000);
    }); 
}
  getLeader(id:String):Promise<Leader>{
    return  new Promise(resolve=>{
     setTimeout(()=>resolve(LEADERS.filter((leader) => leader.id===id)[0]),2000);
    });
  }

  getFeaturedLeader():Promise<Leader>{
    return  new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS.filter((leader)=>leader.featured)[0]),2000);
    });
  }
  */


}
