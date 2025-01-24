import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, doc, collection, docData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { PlayerMobilComponent } from "../player-mobil/player-mobil.component";
import { EditPlayerComponent } from '../edit-player/edit-player.component';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, GameInfoComponent, PlayerMobilComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  game: Game = new Game();
  gameId: string = '';
  gameOver: boolean = false;

  constructor(private route: ActivatedRoute, private firestore: Firestore = inject(Firestore), public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);

      this.gameId = params['id'];


      const gameDoc = doc(this.firestore, `games/${this.gameId}`);
      docData(gameDoc).subscribe((game: any) => {
        //console.log('Game update', game);

        this.game = new Game();
        this.game.currentPlayer = game.currentPlayer;
        this.game.players = game.players;
        this.game.player_images = game.player_images;
        this.game.playedCards = game.playedCards;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;

        console.log('Game', this.game.player_images);
      });
    });

  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || '';
      this.game.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  editPlayer(playerId: number) {
    console.log('Edit player', playerId);

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change === 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        } else {
          console.log('Received change', change);
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('1.webp');
        this.saveGame();
      }
    });
  }


  saveGame() {
    const gameCollection = collection(this.firestore, 'games');
    const gameDoc = doc(gameCollection, this.gameId);
    updateDoc(gameDoc, this.game.toJSON());
  }
}
