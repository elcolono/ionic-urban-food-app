import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FoodService } from '../../foods.service';
import { Food } from '../../food.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-foodPost.page.html',
  styleUrls: ['./edit-foodPost.page.scss']
})
export class EditFoodPostPage implements OnInit, OnDestroy {
  place: Food;
  form: FormGroup;
  private foodSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private FoodService: FoodService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/foods/tabs/account');
        return;
      }
      this.foodSub = this.FoodService
        .getFoods(paramMap.get('placeId'))
        .subscribe(place => {
          this.place = place;
          this.form = new FormGroup({
            title: new FormControl(this.place.title, {
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            description: new FormControl(this.place.description, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(180)]
            }),
            price: new FormControl(this.place.price, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(180)]
            })
          });
        });
    });
  }

  onUpdateFoodPost() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating Post...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.FoodService
          .updateFood(
            this.place.id,
            this.form.value.title,
            this.form.value.description,
            this.form.value.price
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/foods/tabs/account']);
          });
      });
  }

  ngOnDestroy() {
    if (this.foodSub) {
      this.foodSub.unsubscribe();
    }
  }
}
