import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  game: Game;

  constructor(private firestore: Firestore, private router: Router) {
    this.game = new Game();
  }

  ngOnInit(): void { }

  newGame() {
    // start game
    let game = new Game();
    const gamesCollection = collection(this.firestore, 'games');
    addDoc(gamesCollection, this.game.toJSON()).then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }

}
