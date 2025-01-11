import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
//import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';


export const routes: Routes = [
    { path: '', component: StartScreenComponent },
    { path: 'game', component: GameComponent },
   // { path: '', component: DialogAddPlayerComponent }
];
