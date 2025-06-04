import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PortfolioApi } from '../api/portfolio.api';
import { Project, ProjectsResponse } from '../types/project.types';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  constructor(private portfolioApi: PortfolioApi) {}

  fetchProjects(): Observable<Project[]> {
    return of([
      {
        id: 'university-connect',
        title: 'University Connect',
        description: 'Developed ~60% of a university-focused booking and networking application using Angular, NestJS (Node.js), TypeScript, Nx monorepo, Prisma ORM, and Digital Ocean (And built 100% of Demo Build Using Tailwind CSS, React, DynamoDB, AWS Cognmito, Lambda, & Cloudfront). Implemented robust state management with NgRx (facade pattern), integrated Google/Microsoft calendar sync via OAuth, enabled Stripe payment processing, and set up deployment pipeline (Digital Ocean App Platform /w Managed Database).',
        techStack: ['Angular', 'NestJS', 'TypeScript', 'Nx', 'Prisma', "PrimeNG", 'Tailwind CSS', 'AWS Cognito', 'DynamoDB', 'Lambda', 'Stripe', 'Microsoft Graph API', 'Google Calendar API', "NgRx"],
        imageUrl: 'assets/portfolio-images/uniconnect/main.png',
        githubUrl: 'https://github.com/TennysonKnoxLove/tennyson-portfolio',
        demoUrl: '',
        impacts: ['Designed entire UI for application (React, PrimeNG, Tailwind CSS)', 'Streamlined payment processing (Stripe Standard Account Setup Through Our Application & Embedded Checkout)', "Played pivotal role in designing data model for application & implemented robust state management with NgRx (facade pattern)", "Integrated Google/Microsoft calendar sync via OAuth",  "Set up deployment pipeline (Digital Ocean App Platform /w Managed Database)", "Wrote both frontend and backend (API, Services, Modules, Repositories, etc.) code and utilized DTOs (Data Transfer Objects) for communication between frontend and backend and implemented robust type safety", "Managed deployment pipeline for application (Digital Ocean App Platform /w Managed Database, AWS Cloud /w DynamoDB for Early Demo build)"],
        featured: true
      },
      {
        id: 'corp.io',
        title: 'Corp.io',
        description: 'Solo developer on backend enhancements for browser-based text messaging platform. Enhanced filtering elements in the UI, integrated Slack/Discord webhooks for incoming text messages notifications, enabled real-time device communication for sending messages from platform (Utilizing Ejoin Box API calls), and deployed via Docker on DigitalOcean Droplets to stage for testing. Designed sophisticated data generation system that created one-to-one mock data for testing purposes in both local and staging; ensured data generation scripts were not transferred over to production (Separation of deployment processes /w alternate deployment scripts). Wrote and designed bash scripts for smooth deployment with clear instructions on how to manually run and test application in both local and staging environments.',
        techStack: ['Ant Design', 'Docker', 'DigitalOcean', 'Python', 'Django', 'Typescript'],
        imageUrl: 'assets/portfolio-images/corp/main.png',
        githubUrl: 'https://github.com/TennysonKnoxLove/tennyson-portfolio',
        demoUrl: '',
        impacts: ['Designed system for sending real-time text messages from platform to from Ejoin Boxes to specified phone number', 'Enhanced data sorting configuration options in UI', 'Implemented robust data generation system for testing purposes (Local & Stage)', 'Wrote and designed bash scripts for smooth deployment with clear instructions on how to manually run and test application in both local and staging environments', 'Created webhook noficiation system for Discord & Slack for incoming text messages with phone number whitelisting for both box, & organization level messages. (Configurable via UI)'],
        featured: true
      },
      {
        id: 'project-California',
        title: 'Project California',
        description: 'Built marketable tool MVP for event management platform from mockups using React (with Ant Design) and a Django with a Python backend. Connected the React front end to a functional back end for end-to-end demonstration and containerized the application with Docker for deployment.',
        techStack: ['React', 'Django', 'Docker', 'Python', 'Ant Design'],
        imageUrl: 'assets/portfolio-images/california/main.png',
        githubUrl: 'https://github.com/TennysonKnoxLove/tennyson-portfolio',
        demoUrl: '',
        impacts: ['Demonstrated full-stack capabilities (React, Typescript, Django, Python, Docker, Ant Design)', 'Facilitated end-to-end testing', 'Designed API, Models, Views, Serializers, and Views for Django in the backend for early build', 'Designed and implemented robust error handling system', 'Designed and implemented robust documentation system', 'Designed entire UI for application /w darkmode capabiltiies from UI mockup designs'],
        featured: true
      }
    ]);
  }
} 