import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, TemplateRef } from '@angular/core';

export interface DialogData {
  title: string;
  component: TemplateRef<any>;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: DialogData) {
    console.log(data.component)
  }
}
