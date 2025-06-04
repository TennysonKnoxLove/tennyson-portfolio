import { Injectable } from '@angular/core';
import { Project } from '../types/project.types';
import { UniversityConnectDialogService } from '../demos/university-connect-demo/uc-services/university-connect-dialog.service';
import { corpDemoDialogService } from '../demos/corp-demo/service/corp-demo-dialog.service';
import { CaliforniaDemoDialogService } from '../demos/project-california-demo/service/california-demo-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDemoService {
  constructor(
    private universityConnectDialog: UniversityConnectDialogService,
    private corpDemoDialog: corpDemoDialogService,
    private CaliforniaDemoDialog: CaliforniaDemoDialogService
  ) {}

  /**
   * Open the appropriate demo for a given project
   */
  openProjectDemo(project: Project | null | undefined): void {
    if (!project) {
      return;
    }

    switch (project.id) {
      case 'university-connect':
        this.universityConnectDialog.openUniversityConnectDemo();
        break;
      case 'corp.io':
        this.corpDemoDialog.opencorpDemo();
        break;
      case 'project-California':
        this.CaliforniaDemoDialog.openCaliforniaDemo();
        break;
      default:
        if (project.demoUrl) {
          window.open(project.demoUrl, '_blank');
        }
        break;
    }
  }
} 