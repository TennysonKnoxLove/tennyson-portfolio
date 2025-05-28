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
import { DockerContainer, MontanaView } from '../types/montana-demo.types';
import { MontanaFacadeService } from '../store/montana.facade';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-montana-demo-dialog',
  templateUrl: './montana-demo-dialog.component.html',
  styleUrls: ['./montana-demo-dialog.component.scss'],
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
export class MontanaDemoDialogComponent implements OnInit, OnDestroy {
  MontanaView = MontanaView;
  
  // UI state
  terminalInput: string = '';
  
  private destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<MontanaDemoDialogComponent>,
    public montanaFacade: MontanaFacadeService
  ) {}

  // Observable state from facade (as getters to avoid initialization issues)
  get viewModel$(): Observable<any> {
    return this.montanaFacade.viewModel$;
  }

  get dockerContainers$(): Observable<DockerContainer[]> {
    return this.montanaFacade.dockerContainers$;
  }

  get terminalOutput$(): Observable<string[]> {
    return this.montanaFacade.terminalOutput$;
  }

  get isExecutingCommand$(): Observable<boolean> {
    return this.montanaFacade.isExecutingCommand$;
  }

  get isApplicationReady$(): Observable<boolean> {
    return this.montanaFacade.isApplicationReady$;
  }

  get runningContainerCount$(): Observable<number> {
    return this.montanaFacade.runningContainerCount$;
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

  get currentView(): Observable<MontanaView> {
    return this.viewModel$.pipe(map(vm => vm?.currentView || MontanaView.TERMINAL));
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

  get applicationUrl(): Observable<SafeResourceUrl | null> {
    return this.viewModel$.pipe(map(vm => vm?.applicationUrl || null));
  }

  ngOnInit(): void {
    // Initialize Docker status check
    this.montanaFacade.checkDockerStatus();
    
    // Subscribe to errors and handle them via facade
    this.montanaFacade.errorAlert$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(error => {
      this.montanaFacade.handleError(error);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.montanaFacade.resetState();
  }

  // Dialog controls - UI only
  closeDialog(): void {
    this.dialogRef.close();
  }

  toggleFullscreen(): void {
    this.montanaFacade.toggleFullscreen();
  }

  // View management - delegate to facade
  switchView(view: MontanaView): void {
    this.montanaFacade.switchView(view);
  }

  // Terminal operations - delegate to facade
  executeDockerCommand(): void {
    this.montanaFacade.executeCommand(this.terminalInput);
    this.terminalInput = '';
  }

  // Docker operations - delegate to facade
  stopDockerContainers(): void {
    this.montanaFacade.stopDockerDemo();
  }

  // Helper methods for template - delegate to facade
  getContainerStatusColor(status: string): string {
    return this.montanaFacade.getContainerStatusColor(status);
  }

  getContainerStatusIcon(status: string): string {
    return this.montanaFacade.getContainerStatusIcon(status);
  }
} 