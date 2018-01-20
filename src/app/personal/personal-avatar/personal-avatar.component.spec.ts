import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAvatarComponent } from './personal-avatar.component';

describe('PersonalAvatarComponent', () => {
  let component: PersonalAvatarComponent;
  let fixture: ComponentFixture<PersonalAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
