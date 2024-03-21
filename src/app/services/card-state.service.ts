import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICard } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})

export class CardStateService {
  public card$ = new Subject<ICard>();
  
  public cardDelete$ = new Subject<string>();

  public addCard(card: ICard) {
    this.card$.next(card);
  }

  public deleteCard(card: string) {
    this.cardDelete$.next(card);
  }
}