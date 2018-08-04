import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalWordPreviewComponent } from './personal-word-preview.component';

describe('PersonalWordPreviewComponent', () => {
  let component: PersonalWordPreviewComponent;
  let fixture: ComponentFixture<PersonalWordPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalWordPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalWordPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
