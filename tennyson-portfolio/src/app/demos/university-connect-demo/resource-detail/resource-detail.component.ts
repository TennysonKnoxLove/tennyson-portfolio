import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Resource, WEEK_DAYS } from '../../../types/resource.types';
import { UniversityConnectNavService } from '../services/university-connect-nav.service';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChipsModule]
})
export class ResourceDetailComponent {
  bookingOpen = false;

  constructor(public nav: UniversityConnectNavService) {}

  locationLine(resource: Resource): string {
    const location = resource.location;
    const city = [location?.city, location?.state].filter(Boolean).join(', ');
    return [location?.address, city, location?.zip].filter(Boolean).join(' · ');
  }

  openHours(resource: Resource): { label: string; hours: string }[] {
    return WEEK_DAYS.flatMap((day) => {
      const hours = resource.availability?.[day.key];
      if (!hours?.start) {
        return [];
      }
      const end = hours.end?.trim();
      return [{ label: day.label, hours: end ? `${hours.start} – ${end}` : hours.start }];
    });
  }

  closeBooking(): void {
    this.bookingOpen = false;
  }

  closeAll(): void {
    this.bookingOpen = false;
    this.nav.closeDetails();
  }
}
