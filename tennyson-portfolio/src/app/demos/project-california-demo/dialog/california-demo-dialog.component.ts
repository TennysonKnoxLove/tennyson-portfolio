import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { DockerContainer, CaliforniaView } from '../types/california-demo.types';
import { CaliforniaFacadeService } from '../store/california.facade';

@Component({
  selector: 'app-california-demo-dialog',
  templateUrl: './california-demo-dialog.component.html',
  styleUrls: ['./california-demo-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
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
  isAppNavOpen: boolean = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<CaliforniaDemoDialogComponent>,
    public californiaFacade: CaliforniaFacadeService
  ) {}

  get viewModel$(): Observable<any> {
    return this.californiaFacade.viewModel$;
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

  // Toggle .app-navbar mobile menu
  toggleAppNav(): void {
    this.isAppNavOpen = !this.isAppNavOpen;
  }
} 