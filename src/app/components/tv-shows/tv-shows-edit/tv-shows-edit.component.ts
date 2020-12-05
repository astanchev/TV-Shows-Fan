import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITvShow } from 'src/app/core/interfaces/tv-show';
import { ITvShowAdd } from 'src/app/core/interfaces/tv-show-add';
import { TvShowService } from 'src/app/core/services/tv-show.service';
import { imageUrlValidator } from 'src/app/core/validators/image-url';

@Component({
  selector: 'app-tv-shows-edit',
  templateUrl: './tv-shows-edit.component.html',
  styleUrls: ['./tv-shows-edit.component.css']
})
export class TvShowsEditComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  tvshowID = '';
  tvshow: ITvShow;
  loading = true;
  routeSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private tvshowService: TvShowService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.tvshowID = params.id;
    });

    this.tvshowService.getTVShowByID(this.tvshowID).subscribe((data) => {
      this.tvshow = data;

      this.editForm = this.fb.group({
        name: [this.tvshow.name, [Validators.required, Validators.minLength(3)]],
        category: [this.tvshow.category, [Validators.required, Validators.minLength(3)]],
        period: [this.tvshow.period, [Validators.required]],
        imageUrl: [this.tvshow.imageUrl, [Validators.required, imageUrlValidator]],
        description: [this.tvshow.description, [Validators.required, Validators.minLength(10)]]
      });

      this.loading = false;
    });
  }

  editTVShow(): void {
    const tvshow: ITvShowAdd = this.editForm.value;

    this.tvshowService.updateTVShow(tvshow, this.tvshowID)
      .subscribe(_ => this.router.navigate(['tv-shows', 'detail', this.tvshowID]));
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
