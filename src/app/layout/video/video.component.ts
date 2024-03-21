import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ICard } from '../../models/card.model';
import { CardStateService } from '../../services/card-state.service';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [MatButtonModule, CdkDrag, MainComponent],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css',
})
export class VideoComponent {
  // const {id: roomID} = useParams();
  //   const [clients, provideMediaRef] = useWebRTC(roomID)
  //   const [position, setPosition] = useState(-150);
  //   const [step, setStep] = useState(20);

  //   useEffect(() => {
  //       DeckOfCards.setCards('taro');
  //   }, [])

  public cards: ICard[] = [];
  public zIndex: number = 0;

  constructor(
    private cardStateService: CardStateService,
    private eRef: ElementRef,
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
