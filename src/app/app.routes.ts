import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cv',
    loadComponent: () => import('./features/cv/cv.component').then((m) => m.CvComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
