import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';

import { Food } from './food.model';
import { AuthService } from '../auth/auth.service';


interface FoodData {
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private _foods = new BehaviorSubject<Food[]>([]);

  get foods() {
    return this._foods.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchFoods() {
    return this.http
      .get (
        'https://ionic-urbanfood.firebaseio.com/food-posts.json'
      )
      .pipe(
        map(resData => {
          console.log(resData);
          const foods = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              foods.push(
                new Food(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  resData[key].userId
                )
              );
            }
          }
          return foods;
        }),
        tap(foods => {
          this._foods.next(foods);
        })
      );
  }

  getFoods(id: string) {
    return this.foods.pipe(
      take(1),
      map(foods => {
        return { ...foods.find(p => p.id === id) };
      })
    );
  }

  addFood(
    title: string,
    description: string,
    price: number,
  ) {
    let generatedId: string;
    const newFood = new Food(
      Math.random().toString(),
      title,
      description,
      'assets/img/food' + this.getRandomInt(4) + '.png',
      price,
      this.authService.userId
    );
    return this.http
      .post<{ name: string }>(
        'https://ionic-urbanfood.firebaseio.com/food-posts.json',
        {
          ...newFood,
          id: null
        }
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.foods;
        }),
        take(1),
        tap(foods => {
          newFood.id = generatedId;
          this._foods.next(foods.concat(newFood));
        })
      );
  }

  updateFood(foodId: string, title: string, description: string, price: number) {
    let updatedFoods: Food[];
    return this.foods.pipe(
      take(1),
      switchMap(foods => {
        const updatedFoodIndex = foods.findIndex(fo => fo.id === foodId);
        updatedFoods = [...foods];
        const oldFood = updatedFoods[updatedFoodIndex];
        updatedFoods[updatedFoodIndex] = new Food(
          oldFood.id,
          title,
          description,
          oldFood.imageUrl,
          price,
          oldFood.userId
        );
        return this.http.put(
          `https://ionic-urbanfood.firebaseio.com/food-posts/${foodId}.json`,
          { ...updatedFoods[updatedFoodIndex], id: null }
        );
      }),
      tap(() => {
        this._foods.next(updatedFoods);
      })
    );
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
