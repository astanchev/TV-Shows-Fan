import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comments-new',
  templateUrl: './comments-new.component.html',
  styleUrls: ['./comments-new.component.css']
})
export class CommentsNewComponent {

  constructor(
    public dialogRef: MatDialogRef<CommentsNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }


  onCancel(): void {
    this.dialogRef.close();
  }
}
