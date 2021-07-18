import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRightSideMenuComponent } from './user-right-side-menu.component';

describe('UserRightSideMenuComponent', () => {
  let component: UserRightSideMenuComponent;
  let fixture: ComponentFixture<UserRightSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRightSideMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRightSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
