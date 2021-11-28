import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes :Dish[];
  errMess:String;

  // selectedDish:Dish;
  
  constructor(private dishService:DishService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes=>this.dishes=dishes,
      errmess=>this.errMess=<any>errmess);
  }
  //changed then to subscribe when using observable - applies to whereever service is used
//    onSelect(dish:Dish){
//  this.selectedDish=dish;
//    }
}
