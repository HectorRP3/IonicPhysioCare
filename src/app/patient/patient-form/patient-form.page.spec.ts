import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientFormPage } from './patient-form.page';

describe('PatientFormPage', () => {
  let component: PatientFormPage;
  let fixture: ComponentFixture<PatientFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
