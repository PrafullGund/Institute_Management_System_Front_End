import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeAddComponent } from './fee-add.component';

describe('FeeAddComponent', () => {
  let component: FeeAddComponent;
  let fixture: ComponentFixture<FeeAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeAddComponent]
    });
    fixture = TestBed.createComponent(FeeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
