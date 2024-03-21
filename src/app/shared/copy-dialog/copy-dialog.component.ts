import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-copy-dialog',
  standalone: true,
  imports: [MatButton],
  templateUrl: './copy-dialog.component.html',
  styleUrl: './copy-dialog.component.css',
})
export class CopyDialogComponent {
  public link = `${window.location.origin}${this.router.url}`;

  constructor(private router: Router) {
    console.log(router.url)
  }
  
  async copyLink() {
    try {
      await navigator.clipboard.writeText(this.link);
    } catch (error) {
      console.error(error);
    }
  }
}
