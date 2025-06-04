import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-layout-shell',
  templateUrl: './layout-shell.component.html',
  styleUrls: ['./layout-shell.component.scss'],
  imports: [NavbarComponent],
  standalone: true
})
export class LayoutShellComponent {
  currentYear: number = new Date().getFullYear();
}
