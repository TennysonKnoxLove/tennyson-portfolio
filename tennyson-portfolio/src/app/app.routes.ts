import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ProjectDetailPageComponent } from './pages/project-detail-page/project-detail-page.component';
import { UniversityConnectHomeComponent } from './demos/university-connect-demo/home/university-connect-home.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent, title: 'Home' },
    { path: 'projects', component: ProjectsPageComponent, title: 'Projects' },
    { path: 'projects/:id', component: ProjectDetailPageComponent, title: 'Project Details' },
    { path: 'about', component: AboutPageComponent, title: 'About Me' },
    { path: 'contact', component: ContactPageComponent, title: 'Contact' },
    
    // University Connect demo routes
    { 
        path: 'projects/university-connect', 
        component: UniversityConnectHomeComponent, 
        title: 'University Connect Demo' 
    },
    { 
        path: 'projects/university-connect/upload', 
        loadComponent: () => import('./demos/university-connect-demo/resource-upload/resource-upload.component').then(m => m.ResourceUploadComponent),
        title: 'Upload Resource' 
    },
    { 
        path: 'projects/university-connect/browse', 
        loadComponent: () => import('./demos/university-connect-demo/resource-listing/resource-listing.component').then(m => m.ResourceListingComponent),
        title: 'Browse Resources' 
    },
    
    // Optional: Add a wildcard route for 404 if needed later
    // { path: '**', component: PageNotFoundComponent } 
];
