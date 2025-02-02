import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';


export const routes: Routes = [
    { path: '', component: StartScreenComponent },
    { path: 'game', component: GameComponent },
    { path: 'game/:id', component: GameComponent },
];


// http://localhost:4200/game/21q4gUIIOM0qyHso9fh7