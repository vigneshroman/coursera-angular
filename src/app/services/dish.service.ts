import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable,of } from 'rxjs';
import {delay} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  //updated the services to make use of observer pattern.

  getDishes():Observable<Dish[]>{
    return of(DISHES).pipe(delay(2000));
    }
     
   getDish(id:String):Observable<Dish>{
    return of( DISHES.filter(dish => dish.id === id)[0] ).pipe(delay(2000));
    
  }

  getFeaturedDish():Observable<Dish>{
    return of( DISHES.filter(dish => dish.featured)[0] ).pipe(delay(2000));
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
