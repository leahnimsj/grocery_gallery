import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeFormComponent } from './fridge-form.component';

describe('FridgeFormComponent', () => {
  let component: FridgeFormComponent;
  let fixture: ComponentFixture<FridgeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FridgeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FridgeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
