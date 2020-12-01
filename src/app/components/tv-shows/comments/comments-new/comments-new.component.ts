import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comments-new',
  templateUrl: './comments-new.component.html',
  styleUrls: ['./comments-new.component.css']
})
export class CommentsNewComponent {

  constructor(
    public dialogRef: MatDialogRef<CommentsNewComponent>
    ) { }


  onCancel() {
    this.dialogRef.close();
  }
}
