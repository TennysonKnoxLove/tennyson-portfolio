import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutShellComponent } from './shell/layout-shell/layout-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutShellComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'tennyson-portfolio';
}
