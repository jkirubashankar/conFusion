import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

    feedbackForm: FormGroup;
    dish: Dish;
    dishIds: string[];
    prev: string;
    next: string;
    comment: Comment;
    @ViewChild('fform') feedbackformDirective;

    formErrors = {
      'author': '',
      'comment': ''
    }

    validationMessages = {
      'author' :{
        'required': 'Author Name is required',
        'minlength' : 'Author name must be at least 2 characters long',
      },
      'comment' :{
        'required': 'comment is required'
      }
    }

  constructor(private dishService: DishService, private location: Location, private route: ActivatedRoute, private fb: FormBuilder) { 
    this.createFeedbackForm();
  }

  createFeedbackForm(){
    this.feedbackForm = this.fb.group({
      author: [ '', [Validators.required, Validators.minLength(2)]],
      comment: [ '', [Validators.required]],
      rating: '1'
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();//(re)set form validation messages
  }
  
  onValueChanged(data? : any){
    if(!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        //clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + '';
            }
          }
        }
      }
    }
  }

  ngOnInit() {
    debugger;
    this.dishService.getDishIds()
      .subscribe((dishIds)=> this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
    // let id = this.route.snapshot.params['id'];
    // this.dishService.getDish(id).subscribe((dish) => this.dish = dish);
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  } 

  goBack(): void{
    this.location.back();
  }

  onSubmit(){   

    this.comment = this.feedbackForm.value;

    const d = new Date();
    let commentDate = d.toISOString();
    this.comment.date = commentDate;

    this.dish.comments.push(this.feedbackForm.value);
    
    this.feedbackForm.reset({
      author: '',
      comment: '',
      rating: '1'
    });

    this.feedbackformDirective.resetForm();
  }
}
