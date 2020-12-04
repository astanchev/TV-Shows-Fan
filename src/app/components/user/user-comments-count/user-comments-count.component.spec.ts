import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommentsCountComponent } from './user-comments-count.component';

describe('UserCommentsCountComponent', () => {
  let component: UserCommentsCountComponent;
  let fixture: ComponentFixture<UserCommentsCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCommentsCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommentsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
