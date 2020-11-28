import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsItemComponent } from './tv-shows-item.component';

describe('TvShowsItemComponent', () => {
  let component: TvShowsItemComponent;
  let fixture: ComponentFixture<TvShowsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvShowsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
