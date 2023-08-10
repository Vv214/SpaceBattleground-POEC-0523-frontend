import { Component } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  constructor(private messageService: MessagingService) {}
  public mockupTransmissionActive: boolean = true;
  public transmissionActive: boolean = false;
  public messageOpen: boolean = false;
  public messageList = [
    { id: 1, titre: 'Bienvenue', contenu: 'Bonjour et bienvenue sur Wildspace !' },
    {
      id: 2,
      titre: 'Hey',
      contenu:
        'Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet Pouet v',
    },
    { id: 3, titre: "Ceci n'est pas du spam", contenu: 'En fait si' },
    { id: 4, titre: 'Coucou ?', contenu: 'Coucou !' },
  ];

  switchToMockup() {
    this.mockupTransmissionActive = true;
    this.transmissionActive = false;
  }

  switchToTransmission() {
    this.mockupTransmissionActive = false;
    this.transmissionActive = true;
    this.messageList = this.messageService.messageList;
  }

  openMessage() {
    this.messageOpen = !this.messageOpen;
  }
}
