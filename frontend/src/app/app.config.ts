// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';

// import { routes } from './app.routes';
// import { authInterceptor } from './interceptors/auth.interceptor';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(
//       withInterceptors([authInterceptor])
//     )
//   ]
// };

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // ✅ THIS IS CRITICAL
    importProvidersFrom(HttpClientModule),

    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
