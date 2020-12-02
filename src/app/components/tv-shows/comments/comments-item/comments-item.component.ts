import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/core/interfaces/comment';

@Component({
  selector: 'app-comments-item',
  templateUrl: './comments-item.component.html',
  styleUrls: ['./comments-item.component.css']
})
export class CommentsItemComponent implements OnInit {
  @Input() comment: IComment;

  constructor() { }

  ngOnInit(): void {
  }

}
