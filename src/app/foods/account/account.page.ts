import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { FoodService } from '../foods.service';
import { Food } from '../food.model';

@Component({
  selector: 'app-offers',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage implements OnInit, OnDestroy {
  foodPosts: Food[];
  isLoading = false;
  private foodsSub: Subscription;

  constructor(private FoodService: FoodService, private router: Router) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.foodsSub = this.FoodService.foods.subscribe(foodPosts => {
      this.foodPosts = foodPosts;
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.isLoading = true;
    this.FoodService.fetchFoods().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'foods', 'tabs', 'account', 'edit', offerId]);
    console.log('Editing item', offerId);
  }

  ngOnDestroy() {
    if (this.foodsSub) {
      this.foodsSub.unsubscribe();
    }
  }
}
