import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileRecordPage } from './profile-record.page';

describe('ProfileRecordPage', () => {
  let component: ProfileRecordPage;
  let fixture: ComponentFixture<ProfileRecordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
