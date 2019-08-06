import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFoodPostPage } from './new-foodPost.page';

describe('NewFoodPostPage', () => {
  let component: NewFoodPostPage;
  let fixture: ComponentFixture<NewFoodPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFoodPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFoodPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
