import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsSearchComponent } from './tv-shows-search.component';

describe('TvShowsSearchComponent', () => {
  let component: TvShowsSearchComponent;
  let fixture: ComponentFixture<TvShowsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvShowsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
