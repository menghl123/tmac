import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalExcelPreviewModalComponent } from './personal-excel-preview-modal.component';

describe('PersonalExcelPreviewModalComponent', () => {
  let component: PersonalExcelPreviewModalComponent;
  let fixture: ComponentFixture<PersonalExcelPreviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalExcelPreviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalExcelPreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
