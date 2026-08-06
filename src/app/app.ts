import { Component, signal } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Adasa');

  constructor(private viewportScroller: ViewportScroller) {
    this.viewportScroller.setOffset([0, 100]);
  }
}
