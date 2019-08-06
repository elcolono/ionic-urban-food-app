import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';

import { FoodService } from '../../foods.service';
import { Food } from '../../food.model';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss']
})
export class FoodDetailPage implements OnInit, OnDestroy {
  food: Food;
  private foodSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private FoodService: FoodService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/foods/tabs/discover');
        return;
      }
      this.foodSub = this.FoodService
        .getFoods(paramMap.get('placeId'))
        .subscribe(food => {
          this.food = food;
        });
    });
  }

  ngOnDestroy() {
    if (this.foodSub) {
      this.foodSub.unsubscribe();
    }
  }
}
