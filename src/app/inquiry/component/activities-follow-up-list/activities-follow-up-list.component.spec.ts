import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesFollowUpListComponent } from './activities-follow-up-list.component';

describe('ActivitiesFollowUpListComponent', () => {
  let component: ActivitiesFollowUpListComponent;
  let fixture: ComponentFixture<ActivitiesFollowUpListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitiesFollowUpListComponent]
    });
    fixture = TestBed.createComponent(ActivitiesFollowUpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
