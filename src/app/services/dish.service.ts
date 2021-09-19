import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes';
import { Observable,of } from 'rxjs';
import {delay} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient) { }

  //updated the services to make use of observer pattern.

  getDishes():Observable<Dish[]>{
    // return of(DISHES).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL+'dishes');
    }
     
   getDish(id:String):Observable<Dish>{
    // return of( DISHES.filter(dish => dish.id === id)[0] ).pipe(delay(1000));
    return this.http.get<Dish>(baseURL+'dishes/'+id);
    
  }

  getFeaturedDish():Observable<Dish>{
    // return of( DISHES.filter(dish => dish.featured)[0] ).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL+'dishes?featured=true').pipe(map(dishes=>dishes[0]));
}
  getDishIds():Observable<string[] | any>{
  // return of(DISHES.map(dish=>dish.id));
  return this.getDishes().pipe(map(dishes=>dishes.map(dish=>dish.id)));
}

  // getDishes():Promise<Dish[]>{
  //   return new Promise(resolve=>{
  //     setTimeout(()=>resolve(DISHES),2000)
  //   }
  //     );
  // }

  // getDish(id:String):Promise<Dish>{
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve( DISHES.filter(dish => dish.id === id)[0] ), 2000);
  //   });
  // }

//   getFeaturedDish():Promise<Dish>{
//     return new Promise(resolve=>{
//       setTimeout(()=> resolve( DISHES.filter(dish => dish.featured)[0] ),2000);

//   });
// }

// getDishes():Promise<Dish[]>{
//   return of(DISHES).pipe(delay(2000)).toPromise();
//   }



}
