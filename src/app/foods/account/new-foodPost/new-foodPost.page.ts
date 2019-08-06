import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { FoodService } from '../../foods.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-foodPost.page.html',
  styleUrls: ['./new-foodPost.page.scss']
})
export class NewFoodPostPage implements OnInit {
  form: FormGroup;

  constructor(
    private FoodService: FoodService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      })
    });
  }

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Creating place...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.FoodService
          .addFood(
            this.form.value.title,
            this.form.value.description,
            +this.form.value.price,
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/foods/tabs/account']);
          });
      });
  }
}
