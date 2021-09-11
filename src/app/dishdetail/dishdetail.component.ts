import { Component, OnInit ,Input} from '@angular/core';
import { Params ,ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

import { DishService } from '../services/dish.service';
import {Dish} from '../shared/dish'

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

//binds property from [dish]=selectedDish in menu.comp.html

// @Input() 

  dish:Dish;
  dishIds: string[];
  prev: string;
  next: string;

  constructor( private route:ActivatedRoute,
    private dishService:DishService, 
    private location:Location) { }

  // ngOnInit() {
  //   let id=this.route.snapshot.params['id'];
  //   this.dishService.getDish(id)
  //   .subscribe(dish=> this.dish=dish)
  // }
  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack():void{
    this.location.back();
  }

}
