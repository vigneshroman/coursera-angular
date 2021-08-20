import { Component, OnInit ,Input} from '@angular/core';
import {Dish} from '../shared/dish'

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

//binds property from [dish]=selectedDish in menu.comp.html

@Input() 
  dish:Dish;

  constructor() { }

  ngOnInit() {
  }

}
