import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { IUserDisplay } from 'src/app/core/interfaces/user-display';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.css']
})
export class UsersFilterComponent implements OnInit, OnDestroy {
  @ViewChild('filter', { static: true }) filterInput: ElementRef;
  @Output() users: EventEmitter<IUserDisplay[]> = new EventEmitter<IUserDisplay[]>();
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() page: number;
  usersSub$: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading.emit(true);
    this.usersSub$ =
      fromEvent<KeyboardEvent>(this.filterInput.nativeElement, 'keyup')
        .pipe(
          map(e => (e.target as HTMLInputElement).value),
          debounceTime(300),
          startWith(''),
          distinctUntilChanged(),
          switchMap((inputValue: string) => {
            return this.userService.getAllUsers(this.page, inputValue);
          })
        ).subscribe((data) => {
          this.users.emit(data);
          this.loading.emit(false);
        });
  }

  ngOnDestroy(): void {
    this.usersSub$.unsubscribe();
  }
}
