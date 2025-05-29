import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { resourceReducer } from './store/resource/resource.reducer';
import { ResourceEffects } from './store/resource/resource.effects';
import { portfolioReducer } from './store/portfolio/portfolio.reducer';
import { PortfolioEffects } from './store/portfolio/portfolio.effects';
import { universityConnectReducer } from './demos/university-connect-demo/store/university-connect.reducer';
import { UniversityConnectEffects } from './demos/university-connect-demo/store/university-connect.effects';
import { UniversityConnectModule } from './demos/university-connect-demo/university-connect.module';
import { corpDemoModule } from './demos/corp-demo/corp-demo.module';
import { corpReducer } from './demos/corp-demo/store/corp.reducer';
import { corpEffects } from './demos/corp-demo/store/corp.effects';
import { CaliforniaDemoModule } from './demos/project-california-demo/california-demo.module';
import { CaliforniaReducer } from './demos/project-california-demo/store/california.reducer';
import { CaliforniaEffects } from './demos/project-california-demo/store/california.effects';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    provideStore({
      resource: resourceReducer,
      portfolio: portfolioReducer,
      universityConnect: universityConnectReducer,
      corp: corpReducer,
      california: CaliforniaReducer
    }),
    provideEffects(ResourceEffects, PortfolioEffects, UniversityConnectEffects, corpEffects, CaliforniaEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideAnimations(),
    importProvidersFrom(UniversityConnectModule, corpDemoModule, CaliforniaDemoModule, MatSnackBarModule)
  ]
};
