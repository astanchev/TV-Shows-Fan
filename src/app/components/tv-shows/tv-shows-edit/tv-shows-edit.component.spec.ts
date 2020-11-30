import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsEditComponent } from './tv-shows-edit.component';

describe('TvShowsEditComponent', () => {
  let component: TvShowsEditComponent;
  let fixture: ComponentFixture<TvShowsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvShowsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
