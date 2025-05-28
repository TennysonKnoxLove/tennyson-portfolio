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
import { DenwaDemoModule } from './demos/denwa-demo/denwa-demo.module';
import { denwaReducer } from './demos/denwa-demo/store/denwa.reducer';
import { DenwaEffects } from './demos/denwa-demo/store/denwa.effects';
import { MontanaDemoModule } from './demos/project-montana-demo/montana-demo.module';
import { montanaReducer } from './demos/project-montana-demo/store/montana.reducer';
import { MontanaEffects } from './demos/project-montana-demo/store/montana.effects';
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
      denwa: denwaReducer,
      montana: montanaReducer
    }),
    provideEffects(ResourceEffects, PortfolioEffects, UniversityConnectEffects, DenwaEffects, MontanaEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideAnimations(),
    importProvidersFrom(UniversityConnectModule, DenwaDemoModule, MontanaDemoModule, MatSnackBarModule)
  ]
};
