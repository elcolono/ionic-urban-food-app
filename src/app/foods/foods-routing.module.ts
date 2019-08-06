import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FoodsPage } from './foods.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: FoodsPage,
    children: [
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: './discover/discover.module#DiscoverPageModule'
          },
          {
            path: ':placeId',
            loadChildren:
              './discover/food-detail/food-detail.module#FoodDetailPageModule'
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: './account/account.module#AccountPageModule'
          },
          {
            path: 'new',
            loadChildren:
              './account/new-foodPost/new-foodPost.module#NewFoodPostPageModule'
          },
          {
            path: 'edit/:placeId',
            loadChildren:
              './account/edit-foodPost/edit-foodPost.module#EditFoodPostPageModule'
          },
        ]
      },
      {
        path: '',
        redirectTo: '/foods/tabs/discover',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/foods/tabs/discover',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodsRoutingModule {}
