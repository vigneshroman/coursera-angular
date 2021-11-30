import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,
    private processHTTPMessageService:ProcessHTTPMsgService) { }

  getPromotions():Observable<Promotion[]>{
    // return of(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL+'promotions')
    .pipe(catchError(this.processHTTPMessageService.handleError));
  }

  getPromotion(id:String):Observable<Promotion>{
    // of(PROMOTIONS.filter((promotion) => (promotion.id===id))[0]).pipe(delay(2000));
    return  this.http.get<Promotion>(baseURL+'promotions/'+id)
    .pipe(catchError(this.processHTTPMessageService.handleError));
}

  getFeaturedPromotion():Observable<Promotion>{
    // of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL+'promotions?featured=true').pipe(map(promotion=>promotion[0]))
    .pipe(catchError(this.processHTTPMessageService.handleError));
  }

  /*getPromotions():Promise<Promotion[]>{
    return new Promise(resolve=>{
      setTimeout(()=>resolve(PROMOTIONS),2000);
    });
  }

  getPromotion(id:String):Promise<Promotion>{
    return new Promise(resolve=>{
      setTimeout(()=>resolve(PROMOTIONS.filter((promotion) => (promotion.id===id))[0]),2000);
  });
}

  getFeaturedPromotion():Promise<Promotion>{
    return new Promise(resolve=>{
      setTimeout(()=>resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),2000);
    });
  }*/

}
