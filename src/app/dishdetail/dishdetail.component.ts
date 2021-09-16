import { Component, OnInit ,Input,ViewChild} from '@angular/core';
import { Params ,ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

import { DishService } from '../services/dish.service';
import {Dish} from '../shared/dish'

import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Comment } from '../shared/comment';


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
  commentForm:FormGroup
  comment:Comment
  @ViewChild('fform')  commentFormDirective;

  formErrors={
    'author':'',
    'comment':''
  }

  validationMessages={
    'author':{
      'required':'Author name is required',
      'minlength':'Author name must contain atleast 2 characters',
      'maxlength':'First name cant be more than 25 characters'
    },
    'comment':{
      'required':'Comment is required'
    }
  }

  constructor( private route:ActivatedRoute,
    private dishService:DishService, 
    private location:Location,
    private fb:FormBuilder) { this.createForm()}

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

  
  
  
  createForm(){
    this.commentForm=this.fb.group({
      author:['',[Validators.minLength(2),Validators.maxLength(25),Validators.required]],
      rating:5,
      comment:['',Validators.required]
    });

    this.commentForm.valueChanges
    .subscribe(data=>this.onValueChanged(data))

    this.onValueChanged();
  }

  onValueChanged(data?:any){
    {
      if(!this.commentForm){return;}
      const form = this.commentForm;
      for (const field in this.formErrors){
        if(this.formErrors.hasOwnProperty(field)){
          //clear previous error message if any
          this.formErrors[field]='';
          const control=form.get(field);
          if(control && control.dirty && !control.valid){
            const messages=this.validationMessages[field];
            for(const key in control.errors){
              if(control.errors.hasOwnProperty(key)){
                this.formErrors[field]+= messages[key]+' ';
              }
            }
          }
        }
      }
    }
  }

  onSubmit(){
    this.comment=this.commentForm.value;
    //console.log(this.comment)

    this.comment.date=new Date().toISOString();

    let id=this.route.snapshot.params['id'];
    this.dishService.getDish(id)
    .subscribe(currentDish=> currentDish.comments.push(this.comment))

    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });

    this.commentFormDirective.resetForm();

  }
  goBack():void{
    this.location.back();
  }
}
