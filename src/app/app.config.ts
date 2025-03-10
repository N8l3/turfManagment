import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './mat-module/mat-module.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(FormsModule), // ✅ For Template-Driven Forms (ngModel)
    importProvidersFrom(ReactiveFormsModule), // ✅ For Reactive Forms (formGroup)
    importProvidersFrom(MaterialModule), // ✅ For Angular Material Components
  ],
};
