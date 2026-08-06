import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'blog',
    loadComponent: () => import('./components/blog/blog.component').then((m) => m.BlogComponent),
    children: [
      {
        path: ':slug',
        loadComponent: () =>
          import('./components/blog/components/article/article.component').then(
            (m) => m.ArticleComponent,
          ),
      },
    ],
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
