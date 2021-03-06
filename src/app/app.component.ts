import { Component } from '@angular/core';
import { fadeAnimation } from './core/animations/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'TV Shows fan';
}
