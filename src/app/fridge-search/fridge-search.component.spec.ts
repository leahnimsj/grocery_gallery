import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeSearchComponent } from './fridge-search.component';

describe('FridgeSearchComponent', () => {
  let component: FridgeSearchComponent;
  let fixture: ComponentFixture<FridgeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FridgeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FridgeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
