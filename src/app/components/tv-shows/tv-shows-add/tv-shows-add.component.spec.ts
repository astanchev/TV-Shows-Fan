import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsAddComponent } from './tv-shows-add.component';

describe('TvShowsAddComponent', () => {
  let component: TvShowsAddComponent;
  let fixture: ComponentFixture<TvShowsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvShowsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
