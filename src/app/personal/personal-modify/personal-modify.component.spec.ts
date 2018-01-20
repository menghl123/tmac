import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalModifyComponent } from './personal-modify.component';

describe('PersonalModifyComponent', () => {
  let component: PersonalModifyComponent;
  let fixture: ComponentFixture<PersonalModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
