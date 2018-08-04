import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalExcelPreviewComponent } from './personal-excel-preview.component';

describe('PersonalExcelPreviewComponent', () => {
  let component: PersonalExcelPreviewComponent;
  let fixture: ComponentFixture<PersonalExcelPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalExcelPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalExcelPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
