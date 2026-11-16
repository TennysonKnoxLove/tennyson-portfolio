import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UniversityConnectNavService } from '../services/university-connect-nav.service';

@Component({
  selector: 'app-university-connect-about',
  templateUrl: './university-connect-about.component.html',
  styleUrls: ['./university-connect-about.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class UniversityConnectAboutComponent {
  constructor(private nav: UniversityConnectNavService) {}

  goBrowse(): void {
    this.nav.goBrowse();
  }
}
