import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFridgeComponent } from './manage-fridge.component';

describe('ManageFridgeComponent', () => {
  let component: ManageFridgeComponent;
  let fixture: ComponentFixture<ManageFridgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFridgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
