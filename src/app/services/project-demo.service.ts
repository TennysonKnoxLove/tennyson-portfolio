import { Injectable } from '@angular/core';
import { Project } from '../types/project.types';
import { UniversityConnectDialogService } from '../demos/university-connect-demo/uc-services/university-connect-dialog.service';
import { DenwaDemoDialogService } from '../demos/denwa-demo/service/denwa-demo-dialog.service';
import { MontanaDemoDialogService } from '../demos/project-montana-demo/service/montana-demo-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDemoService {
  constructor(
    private universityConnectDialog: UniversityConnectDialogService,
    private denwaDemoDialog: DenwaDemoDialogService,
    private montanaDemoDialog: MontanaDemoDialogService
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
      case 'denwa':
        this.denwaDemoDialog.openDenwaDemo();
        break;
      case 'project-montana':
        this.montanaDemoDialog.openMontanaDemo();
        break;
      default:
        if (project.demoUrl) {
          window.open(project.demoUrl, '_blank');
        }
        break;
    }
  }
} 