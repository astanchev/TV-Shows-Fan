import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITvShow } from 'src/app/core/interfaces/tv-show';
import { TvShowService } from 'src/app/core/services/tv-show.service';
import { UserService } from 'src/app/core/services/user.service';
import { CommentsNewComponent } from '../comments-new/comments-new.component';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  @Input() isAdmin: boolean;
  @Input() isFan: boolean;
  @Input() tvshow: ITvShow;
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  commentText: string = '';

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private tvshowService: TvShowService
    ) { }

  ngOnInit(): void {

  }

  openDialog(){
    const dialogRef = this.dialog.open( CommentsNewComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe(result => {
      const comment = {
        fromUser: this.userService.username,
        text: result
      };
      const tvshowID= this.tvshow.objectId;

      this.tvshowService.addCommentToTVShow(tvshowID, comment).subscribe(() => this.ngOnInit());
    });

  }

}
