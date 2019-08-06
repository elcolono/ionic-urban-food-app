import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FoodsPage } from './foods.page';
import { FoodsRoutingModule } from './foods-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FoodsRoutingModule
  ],
  declarations: [FoodsPage]
})
export class FoodsPageModule {}
