import { Component, ElementRef, HostListener, OnInit, ViewChildren, viewChildren } from '@angular/core';
import { CardStateService } from '../../services/card-state.service';
import { ICard } from '../../models/card.model';
import { MatButtonModule } from '@angular/material/button';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatButtonModule, CdkDrag],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  public cards: ICard[] = [];
  public zIndex: number = 0;

  constructor(
    private cardStateService: CardStateService,
    private eRef: ElementRef,
    private router: Router,
  ) {
    this.subscribeToCardState();
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.cards = this.cards.map((card) => ({ ...card, isSelected: false }));
    }
  }

  private subscribeToCardState() {
    this.cardStateService.card$.subscribe((card) => this.addCard(card));
  }

  public setSelected(event: MouseEvent, card: ICard) {
    event.stopPropagation();
    this.cards = this.cards.map((item) => {
      if (item.path === card.path) {
        item.isSelected = true;
        item.zIndex = this.zIndex++;
      } else item.isSelected = false;
      return item;
    });
  }

  public addCard(card: ICard) {
    this.cards.push(card);
    console.log(this.router.url);
  }

  public removeCard(card: ICard) {
    this.cards = this.cards.filter((item) => item.path !== card.path);
    this.cardStateService.deleteCard(card.path);
  }

  public setIsOpen(card: ICard) {
    this.cards = this.cards.map((item) => {
      if (item.path !== card.path) return item;
      item.isOpen = !item.isOpen;
      return item;
    });
  }
}
