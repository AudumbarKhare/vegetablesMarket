import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToFavoriteCardComponent } from './add-to-favorite-card.component';

describe('AddToFavoriteCardComponent', () => {
  let component: AddToFavoriteCardComponent;
  let fixture: ComponentFixture<AddToFavoriteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToFavoriteCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToFavoriteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
