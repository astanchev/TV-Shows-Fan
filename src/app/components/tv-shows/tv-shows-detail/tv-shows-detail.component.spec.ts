import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsDetailComponent } from './tv-shows-detail.component';

describe('TvShowsDetailComponent', () => {
  let component: TvShowsDetailComponent;
  let fixture: ComponentFixture<TvShowsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvShowsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
