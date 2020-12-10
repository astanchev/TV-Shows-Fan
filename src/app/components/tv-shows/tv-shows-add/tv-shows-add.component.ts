import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITvShowAdd } from 'src/app/core/interfaces/tv-show-add';
import { TvShowService } from 'src/app/core/services/tv-show.service';
import { imageUrlValidator } from 'src/app/core/validators/image-url';

@Component({
  selector: 'app-tv-shows-add',
  templateUrl: './tv-shows-add.component.html',
  styleUrls: ['./tv-shows-add.component.css']
})
export class TvShowsAddComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tvshowService: TvShowService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required, Validators.minLength(3)]],
      period: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, imageUrlValidator]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  addTVShow(): void{
    const tvshow: ITvShowAdd = this.form.value;

    this.tvshowService.createTVShow(tvshow).subscribe(_ => this.router.navigate(['tv-shows']));
  }

}
