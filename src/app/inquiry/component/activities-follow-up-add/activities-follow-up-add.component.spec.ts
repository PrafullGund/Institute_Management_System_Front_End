import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesFollowUpAddComponent } from './activities-follow-up-add.component';

describe('ActivitiesFollowUpAddComponent', () => {
  let component: ActivitiesFollowUpAddComponent;
  let fixture: ComponentFixture<ActivitiesFollowUpAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitiesFollowUpAddComponent]
    });
    fixture = TestBed.createComponent(ActivitiesFollowUpAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
