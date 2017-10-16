import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryEmailFormComponent } from './grocery-email-form.component';

describe('GroceryEmailFormComponent', () => {
  let component: GroceryEmailFormComponent;
  let fixture: ComponentFixture<GroceryEmailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryEmailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
