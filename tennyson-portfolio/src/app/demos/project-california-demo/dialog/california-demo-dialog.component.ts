import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { DockerContainer, CaliforniaView } from '../types/california-demo.types';
import { CaliforniaFacadeService } from '../store/california.facade';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-california-demo-dialog',
  templateUrl: './california-demo-dialog.component.html',
  styleUrls: ['./california-demo-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ]
})
export class CaliforniaDemoDialogComponent implements OnInit, OnDestroy {
  CaliforniaView = CaliforniaView;
  
  // UI state
  terminalInput: string = '';
  activeTab: string = 'events'; // Default to events tab
  showNotifications: boolean = false;
  showContainerLoading: boolean = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<CaliforniaDemoDialogComponent>,
    public californiaFacade: CaliforniaFacadeService
  ) {}

  // Observable state from facade (as getters to avoid initialization issues)
  get viewModel$(): Observable<any> {
    return this.californiaFacade.viewModel$;
  }

  get dockerContainers$(): Observable<DockerContainer[]> {
    return this.californiaFacade.dockerContainers$;
  }

  get terminalOutput$(): Observable<string[]> {
    return this.californiaFacade.terminalOutput$;
  }

  get isExecutingCommand$(): Observable<boolean> {
    return this.californiaFacade.isExecutingCommand$;
  }

  get isApplicationReady$(): Observable<boolean> {
    return this.californiaFacade.isApplicationReady$;
  }

  get runningContainerCount$(): Observable<number> {
    return this.californiaFacade.runningContainerCount$;
  }

  // Template properties - extract from viewModel$
  get isFullscreen(): Observable<boolean> {
    return this.viewModel$.pipe(map(vm => vm?.isFullscreen || false));
  }

  get dockerRunning(): Observable<boolean> {
    return this.viewModel$.pipe(map(vm => vm?.dockerRunning || false));
  }

  get runningContainerCount(): Observable<number> {
    return this.viewModel$.pipe(map(vm => vm?.runningContainerCount || 0));
  }

  get currentView(): Observable<CaliforniaView> {
    return this.viewModel$.pipe(map(vm => vm?.currentView || CaliforniaView.TERMINAL));
  }

  get isApplicationReady(): Observable<boolean> {
    return this.viewModel$.pipe(map(vm => vm?.isApplicationReady || false));
  }

  get dockerContainers(): Observable<DockerContainer[]> {
    return this.viewModel$.pipe(map(vm => vm?.dockerContainers || []));
  }

  get terminalOutput(): Observable<string[]> {
    return this.viewModel$.pipe(map(vm => vm?.terminalOutput || []));
  }

  get isExecutingCommand(): Observable<boolean> {
    return this.viewModel$.pipe(map(vm => vm?.isExecutingCommand || false));
  }

  get applicationHtml(): Observable<SafeHtml | null> {
    return this.viewModel$.pipe(map(vm => vm?.applicationHtml || null));
  }

  ngOnInit(): void {
    // Subscribe to errors and handle them via facade
    this.californiaFacade.errorAlert$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((error: any) => {
      this.californiaFacade.handleError(error);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.californiaFacade.resetState();
  }

  // Dialog controls - UI only
  closeDialog(): void {
    this.dialogRef.close();
  }

  toggleFullscreen(): void {
    this.californiaFacade.toggleFullscreen();
  }

  // View management - delegate to facade
  switchView(view: CaliforniaView): void {
    this.californiaFacade.switchView(view);
  }

  // Terminal operations - delegate to facade
  executeDockerCommand(): void {
    this.californiaFacade.executeCommand(this.terminalInput);
    this.terminalInput = '';
  }

  // Docker operations - delegate to facade
  stopDockerContainers(): void {
    this.showContainerLoading = true;
    this.californiaFacade.stopDockerDemo();
  }

  // Return to terminal from loading state
  returnToTerminal(): void {
    this.showContainerLoading = false;
    this.californiaFacade.switchView(CaliforniaView.TERMINAL);
  }

  // Helper methods for template - delegate to facade
  getContainerStatusColor(status: string): string {
    return this.californiaFacade.getContainerStatusColor(status);
  }

  getContainerStatusIcon(status: string): string {
    return this.californiaFacade.getContainerStatusIcon(status);
  }

  // Application tab switching
  switchApplicationTab(tab: string): void {
    this.activeTab = tab;
  }

  // Notifications toggle
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  // Toggle settings switches
  toggleSetting(event: Event): void {
    const toggle = event.target as HTMLElement;
    toggle.classList.toggle('active');
  }
} 