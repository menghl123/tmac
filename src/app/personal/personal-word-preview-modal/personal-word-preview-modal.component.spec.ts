import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalWordPreviewModalComponent } from './personal-word-preview-modal.component';

describe('PersonalWordPreviewModalComponent', () => {
  let component: PersonalWordPreviewModalComponent;
  let fixture: ComponentFixture<PersonalWordPreviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalWordPreviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalWordPreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
