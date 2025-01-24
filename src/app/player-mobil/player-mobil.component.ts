import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-mobil.component.html',
  styleUrl: './player-mobil.component.scss'
})
export class PlayerMobilComponent {
  @Input() name: string = '';
  @Input() image: string = '1.webp';
  @Input() playerActive: boolean = false;
}
