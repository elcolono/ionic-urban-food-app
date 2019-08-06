import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { FoodService } from '../foods.service';
import { Food } from '../food.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})

export class DiscoverPage implements OnInit, OnDestroy {
  loadedFoodPosts: Food[];
  relevantFoodPosts: Food[];
  private placesSub: Subscription;

  constructor(
    private FoodService: FoodService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.placesSub = this.FoodService.foods.subscribe(places => {
      this.loadedFoodPosts = places;
      this.relevantFoodPosts = this.loadedFoodPosts;
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
