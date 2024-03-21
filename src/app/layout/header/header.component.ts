import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { CopyDialogComponent } from '../../shared/copy-dialog/copy-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CopyDialogComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private isFulScreen: boolean = false;

  @ViewChild('copyDialog') copyDialog!: TemplateRef<any>;

  constructor(private dialog: Dialog) {}

  public toggleFullScreen() {
    this.isFulScreen = !this.isFulScreen;
    const el = document.documentElement;

    if (this.isFulScreen) {
      if (el.requestFullscreen) el.requestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }
  openDialog(title: string, component: TemplateRef<any>) {
    const dialogRef = this.dialog.open<string>(DialogComponent, {
      width: '400px',
      minHeight: '300px',
      data: { title, component },
    });

    dialogRef.closed.subscribe((result) => {
      console.log(result);
    });
  }
}
