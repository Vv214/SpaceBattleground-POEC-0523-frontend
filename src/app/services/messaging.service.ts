import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor() {}

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
}
