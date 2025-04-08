import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAddComponent } from './courses-add.component';

describe('CoursesAddComponent', () => {
  let component: CoursesAddComponent;
  let fixture: ComponentFixture<CoursesAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesAddComponent]
    });
    fixture = TestBed.createComponent(CoursesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
