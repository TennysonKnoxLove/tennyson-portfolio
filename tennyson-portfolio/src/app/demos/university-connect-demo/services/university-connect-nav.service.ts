import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Resource } from '../../../types/resource.types';

export type UniversityConnectView = 'home' | 'about' | 'browse' | 'upload';

@Injectable({
  providedIn: 'root'
})
export class UniversityConnectNavService {
  private readonly viewSubject = new BehaviorSubject<UniversityConnectView>('home');
  readonly view$ = this.viewSubject.asObservable();

  private readonly selectedResourceSubject = new BehaviorSubject<Resource | null>(null);
  readonly selectedResource$ = this.selectedResourceSubject.asObservable();

  goHome(): void {
    this.closeDetails();
    this.viewSubject.next('home');
  }

  goAbout(): void {
    this.closeDetails();
    this.viewSubject.next('about');
  }

  goBrowse(): void {
    this.closeDetails();
    this.viewSubject.next('browse');
  }

  goUpload(): void {
    this.closeDetails();
    this.viewSubject.next('upload');
  }

  openDetails(resource: Resource): void {
    this.selectedResourceSubject.next(resource);
  }

  closeDetails(): void {
    this.selectedResourceSubject.next(null);
  }
}
