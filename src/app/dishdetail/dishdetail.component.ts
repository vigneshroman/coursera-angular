import { Component, OnInit ,Input} from '@angular/core';
import { Params ,ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

import { DishService } from '../services/dish.service';
import {Dish} from '../shared/dish'

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

//binds property from [dish]=selectedDish in menu.comp.html

// @Input() 

  dish:Dish;

  constructor( private route:ActivatedRoute,
    private dishService:DishService, 
    private location:Location) { }

  ngOnInit() {
    let id=this.route.snapshot.params['id'];
    this.dish=this.dishService.getDish(id);
  }

  goBack():void{
    this.location.back();
  }

}
