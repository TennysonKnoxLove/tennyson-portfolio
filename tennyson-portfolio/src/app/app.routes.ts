import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent, title: 'Home' },
    { path: 'projects', component: ProjectsPageComponent, title: 'Projects' },
    { path: 'about', component: AboutPageComponent, title: 'About Me' },
    { path: 'contact', component: ContactPageComponent, title: 'Contact' },
    
    // Optional: Add a wildcard route for 404 if needed later
    // { path: '**', component: PageNotFoundComponent } 
];
