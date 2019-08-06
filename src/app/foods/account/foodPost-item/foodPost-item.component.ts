import { Component, OnInit, Input } from '@angular/core';

import { Food } from '../../food.model';

@Component({
  selector: 'app-offer-item',
  templateUrl: './foodPost-item.component.html',
  styleUrls: ['./foodPost-item.component.scss']
})
export class FoodPostItemComponent implements OnInit {
  @Input() foodPost: Food;

  constructor() { }

  ngOnInit() {
  }
}
