import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodPostPage } from './edit-foodPost.page';

describe('EditFoodPostPage', () => {
  let component: EditFoodPostPage;
  let fixture: ComponentFixture<EditFoodPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFoodPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFoodPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
