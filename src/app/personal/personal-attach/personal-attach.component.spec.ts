import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAttachComponent } from './personal-attach.component';

describe('PersonalAttachComponent', () => {
  let component: PersonalAttachComponent;
  let fixture: ComponentFixture<PersonalAttachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalAttachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAttachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
