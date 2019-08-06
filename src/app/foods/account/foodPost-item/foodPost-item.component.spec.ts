import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPostItemComponent } from './foodPost-item.component';

describe('FoodPostItemComponent', () => {
  let component: FoodPostItemComponent;
  let fixture: ComponentFixture<FoodPostItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodPostItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodPostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
